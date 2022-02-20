const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            counterEnd: localStorage.getItem("end") || "",
            token: localStorage.getItem("token") || "",
        },
        actions: {
            // LOGIN
            generateToken: async (name, password) => {
                const actions = getActions();
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/token",
                        {
                            method: "POST",
                            body: JSON.stringify({
                                name: name,
                                password: password,
                            }),
                            headers: {
                                "Content-type": "application/json",
                            },
                        }
                    );
                    const data = await response.json();
                    if (!response.ok) {
                        setStore({
                            message: {
                                message: data.message,
                                status: "danger",
                            },
                        });
                        throw Error(response);
                    } else {
                        setStore({ token: data.token });
                        localStorage.setItem("token", data.token);
                        actions.getProfileData(data.token);
                        return data;
                    }
                } catch (error) {
                    console.error(error);
                }
            },

            // Obtener la información del usuario en Dashboard (por ejemplo)
            getProfileData: async token => {
                const actions = getActions();
                const store = getStore();
                const options = {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                };
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "/api/user",
                        options
                    );
                    const data = await response.json();
                    if (!response.ok) {
                        setStore({
                            message: {
                                message: data.message,
                                status: "danger",
                            },
                        });
                        throw Error(response);
                    }
                    setStore({
                        user: {
                            id: data.id,
                            name: data.name,
                        },
                    });
                    return data;
                } catch (error) {
                    console.error(error);
                }
            },

            exitCounter: () => {
                localStorage.setItem("end", true);
                setStore({ counterEnd: true });
            },

            getImagesByTag: tag => {
                fetch(`${process.env.BACKEND_URL}/api/images/${tag}`)
                    .then(response => response.json())
                    .then(data => {
                        let actions = getActions();
                        setStore({ images: data });
                        actions.getRandomImage();
                    })
                    .catch(error => console.error(error));
            },

            getRandomImage: () => {
                let store = getStore();
                setStore({
                    randomImage:
                        store.images[
                            Math.floor(Math.random() * store.images.length)
                        ],
                });
            },
        },
    };
};

export default getState;
