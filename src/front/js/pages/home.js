import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
// import threeWorms from "../../img/gifs/three-dancing-worms.gif";
// import dramaWorm from "../../img/gifs/drama.gif";
// import dancingWorms from "../../img/gifs/dancing-worms.gif";
// import cats from "../../img/gifs/cute-cats.gif";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div
            className="home"
            style={{ backgroundImage: "url(gusine.png), url(gusinette.png)" }}>
            <h1 className="home__title">Welcome!</h1>
            <div className="home__links center">
                <Link
                    to="/nicknames"
                    className="center home-link home-link--primary"
                    onMouseEnter={e => {
                        // e.target.style.backgroundImage = `url(${dramaWorm})`;
                        e.target.style.backgroundSize = "cover";
                        e.target.style.backgroundPosition = "bottom";
                    }}
                    onMouseLeave={e => {
                        e.target.style.backgroundImage = "none";
                    }}>
                    Nicknames
                </Link>
                <Link
                    to="/profile"
                    className="center home-link home-link--dark"
                    onMouseEnter={e => {
                        // e.target.style.backgroundImage = `url(${cats})`;
                        e.target.style.backgroundSize = "cover";
                        e.target.style.backgroundPosition = "center";
                    }}
                    onMouseLeave={e => {
                        e.target.style.backgroundImage = "none";
                    }}>
                    Profile
                </Link>
                <Link
                    to="/todo-list"
                    className="center home-link home-link--secondary"
                    onMouseEnter={e => {
                        // e.target.style.backgroundImage = `url(${dancingWorms})`;
                        e.target.style.backgroundSize = "cover";
                        e.target.style.backgroundPosition = "center";
                    }}
                    onMouseLeave={e => {
                        e.target.style.backgroundImage = "none";
                    }}>
                    Todo List
                </Link>
                <Link
                    to="/calendar"
                    className="center home-link home-link--danger"
                    onMouseEnter={e => {
                        // e.target.style.backgroundImage = `url(${threeWorms})`;
                        e.target.style.backgroundSize = "cover";
                        e.target.style.backgroundPosition = "bottom";
                    }}
                    onMouseLeave={e => {
                        e.target.style.backgroundImage = "none";
                    }}>
                    Calendar
                </Link>
            </div>
        </div>
    );
};
