import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return <div className="home">Hola, soy tu hommy</div>;
};
