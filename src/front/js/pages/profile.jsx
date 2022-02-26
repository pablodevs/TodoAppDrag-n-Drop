import React, { useContext, useEffect } from "react";
import "../../styles/pages/profile.scss";
import { Login } from "../component/login.jsx";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        let userToken = store.token || localStorage.getItem("token");
        if (userToken) actions.getProfileData(userToken)
        else actions.setPopup(<Login />, false);
    }, []);

    useEffect(() => {
        if (store.user && store.user.name && !store.randomImage) actions.getImagesByTag()
    }, [store.user])

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
                "Loading..."
            )}
            {store.randomImage ? <button className="btn btn--secondary profile__set-image" onClick={() => {
                actions.setProfileImage();
                setTimeout(() => actions.cleanMessage(), 5000);
            }}>
                Set image
            </button> : ""}
            {store.message && store.message.message ? <span className="profile__message text-secondary-400">{store.message.message}</span> : ""}
        </div>
    );
};
