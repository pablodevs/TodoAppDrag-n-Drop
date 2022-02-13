import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import threeWorms from "../../img/gifs/three-dancing-worms.gif";
import dramaWorm from "../../img/gifs/drama.gif";
import dancingWorms from "../../img/gifs/dancing-worms.gif";
import cats from "../../img/gifs/cute-cats.gif";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div
            className="home"
            style={{ backgroundImage: "url(gusine.png), url(gusinette.png)" }}>
            <h1 className="home__title">¡Bienvenid@!</h1>
            <div className="home__cards center">
                <Link
                    to="/motes"
                    className="center home-card home-card--primary"
                    onMouseEnter={e => {
                        e.target.style.backgroundImage = `url(${threeWorms})`;
                        e.target.style.backgroundSize = "cover";
                        e.target.style.backgroundPosition = "bottom";
                    }}
                    onMouseLeave={e => {
                        e.target.style.backgroundImage = "none";
                    }}>
                    Motes
                </Link>
                <Link
                    to="/perfil"
                    className="center home-card home-card--dark"
                    onMouseEnter={e => {
                        e.target.style.backgroundImage = `url(${dramaWorm})`;
                        e.target.style.backgroundSize = "cover";
                        e.target.style.backgroundPosition = "bottom";
                    }}
                    onMouseLeave={e => {
                        e.target.style.backgroundImage = "none";
                    }}>
                    Perfil
                </Link>
                <Link
                    to="/todo-list"
                    className="center home-card home-card--secondary"
                    onMouseEnter={e => {
                        e.target.style.backgroundImage = `url(${dancingWorms})`;
                        e.target.style.backgroundSize = "cover";
                        e.target.style.backgroundPosition = "center";
                    }}
                    onMouseLeave={e => {
                        e.target.style.backgroundImage = "none";
                    }}>
                    Todo list
                </Link>
                <Link
                    to="/calendario"
                    className="center home-card home-card--danger"
                    onMouseEnter={e => {
                        e.target.style.backgroundImage = `url(${cats})`;
                        e.target.style.backgroundSize = "cover";
                        e.target.style.backgroundPosition = "center";
                    }}
                    onMouseLeave={e => {
                        e.target.style.backgroundImage = "none";
                    }}>
                    Calendario
                </Link>
            </div>
        </div>
    );
};
