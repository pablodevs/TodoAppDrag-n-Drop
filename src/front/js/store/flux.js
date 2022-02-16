const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            counterEnd: localStorage.getItem("end") || "",
        },
        actions: {
            exitCounter: () => {
                localStorage.setItem("end", true);
                setStore({ counterEnd: true });
            },

            // Save image Info
            saveImageInfo: (url, public_id) => {
                fetch(process.env.BACKEND_URL + "api/user", {
                    method: "PUT",
                    body: JSON.stringify({ url: url, public_id: public_id }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error(error));
            },

            // Cancel image Cloudinary upload
            cancelCloudinaryUpload: async public_id => {
                const actions = getActions();
                try {
                    const response = await fetch(
                        process.env.BACKEND_URL + "api/cancel",
                        {
                            method: "PUT",
                            body: JSON.stringify({ public_id: public_id }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const resp = await response.json();
                    if (!response.ok) {
                        setStore({
                            message: {
                                message: resp.message,
                                status: "",
                            },
                        });
                        throw Error(response);
                    }
                    return resp;
                } catch (err) {
                    console.error(err);
                }
            },
        },
    };
};

export default getState;
