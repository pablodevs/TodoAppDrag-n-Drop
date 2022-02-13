import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div
            className="home"
            style={{ backgroundImage: "url(gusine.png), url(gusinette.png)" }}>
            <h1 className="home__title">¡Bienvenid@!</h1>
            <div className="home__widgets center">
                <button className="center home-card home-card--primary">
                    Motes
                </button>
                <button className="center home-card home-card--secondary">
                    Perfil
                </button>
                <button className="center home-card home-card--dark">
                    Todo list
                </button>
                <button className="center home-card home-card--danger">
                    Calendario
                </button>
            </div>
        </div>
    );
};
