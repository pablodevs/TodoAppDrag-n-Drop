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
