const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            counterEnd: false,
        },
        actions: {
            endCounter: () => setStore({ counterEnd: true }),
        },
    };
};

export default getState;
