const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            counterEnd: localStorage.getItem("end") || "",
        },
        actions: {
            endCounter: () => {
                localStorage.setItem("end", true);
                setStore({ counterEnd: true });
            },
        },
    };
};

export default getState;
