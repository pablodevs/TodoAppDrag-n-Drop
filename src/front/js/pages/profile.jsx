import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/pages/profile.scss";

export const Profile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.randomImage) actions.getImagesByTag("gusinet");
    }, []);

    return (
        <div className="profile center flex-col">
            <h1 className="profile__title">Profile</h1>
            <p className="profile__message">Click on the image to change it!</p>
            {store.randomImage ? (
                <button
                    className="profile__randomizeImage"
                    onClick={() => actions.getRandomImage()}>
                    <img
                        src={store.randomImage}
                        width="300"
                        alt="random profile image"
                        className="profile__image"
                    />
                </button>
            ) : (
                "LOADING..."
            )}
        </div>
    );
};
