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
        },
    };
};

export default getState;
