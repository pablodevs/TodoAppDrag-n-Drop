const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            popup: {},
            counterEnd: localStorage.getItem("end") || "",
            token: localStorage.getItem("token") || "",
        },
        actions: {
            cleanMessage: () => setStore({ message: { message: "", status: "" } }),

            // End counter
            exitCounter: () => {
                localStorage.setItem("end", true);
                setStore({ counterEnd: true });
            },

            // Open Popup
            setPopup: (reactComponent, closable) => {
                setStore({
                    popup: {
                        component: reactComponent,
                        icClosable: closable
                    }
                })
                return;
            },
            // Close Popup
            closePopup: () => setStore({ popup: {} }),

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
                        setStore({
                            token: data.token,
                            message: null
                        });
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
                    actions.closePopup();
                    return data;
                } catch (error) {
                    console.error(error);
                }
            },

            // Set profile image
            setProfileImage: async () => {
                const store = getStore();
                const options = {
                    method: "PUT",
                    body: JSON.stringify({ imageUrl: store.randomImage }),
                    headers: {
                        Authorization: "Bearer " + store.token,
                        "Content-Type": "application/json"
                    }
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
                        message: {
                            message: data.message,
                            status: data.status,
                        }
                    });
                    return data;
                } catch (error) {
                    console.error(error);
                }

            },

            // Get images from Cloudinary by tag using admin api
            getImagesByTag: () => {
                let store = getStore();
                fetch(`${process.env.BACKEND_URL}/api/images/${store.user.name}`)
                    .then(response => response.json())
                    .then(data => {
                        let actions = getActions();
                        setStore({ images: data });
                        actions.getRandomImage();
                    })
                    .catch(error => console.error(error));
            },

            // Get a random image from the array of images
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
