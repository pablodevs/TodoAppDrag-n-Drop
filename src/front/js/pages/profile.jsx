import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getImagesByTag("gusinet");
    }, []);

    return (
        <div className="profile center flex-col">
            <h1 className="profile__title">Profile</h1>
            <p>Click on the image to change it!</p>
            <button
                className="btn btn--primary"
                onClick={() => actions.getRandomImage()}>
                Random Image
            </button>
            {store.randomImage ? (
                <img
                    src={store.randomImage}
                    width="300"
                    alt="random profile image"
                    className="profile_img"
                />
            ) : (
                "LOADING..."
            )}
        </div>
    );
};
