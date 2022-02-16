import React, { useContext } from "react";
import CloudinaryUploadWidget from "../component/cloudinary";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="profile center flex-col">
            <h1 className="profile__title">Profile</h1>
            <p>Click on the image to change it!</p>
            <div className="flex">
                <CloudinaryUploadWidget preset="gusinet" />
                {/* <CloudinaryUploadWidget preset="gusinette" /> */}
            </div>
            <img
                src="https://res.cloudinary.com/peibol888/image/upload/v1645038943/gusinet/aq6ih7mstgwgbopmpyuc.jpg"
                width="300"
                alt="random profile image"
                className="profile_img"
            />
        </div>
    );
};
