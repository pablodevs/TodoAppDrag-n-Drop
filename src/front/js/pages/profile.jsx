import React, { useContext, useEffect, useState } from 'react';
import '../../styles/pages/profile.scss';
import { Context } from '../store/appContext';

export const Profile = () => {
    const { store, actions } = useContext(Context);

    const [image, setImage] = useState('');

    useEffect(() => {
        if (store.user && store.user.profile_image_url) {
            setImage(store.user.profile_image_url);
            actions.getImagesByTag(store.user.name);
        }
    }, [store.user]);

    useEffect(() => {
        if (store.randomImage) {
            setImage(store.randomImage);
        }
    }, [store.randomImage]);

    useEffect(() => {
        return () => actions.cleanRandomImage();
    }, []);

    return (
        <div className='profile center flex-col'>
            <h1 className='profile__title'>Profile</h1>
            <p className='profile__message'>Click on the image to change it!</p>
            {image ? (
                <button className='profile__randomizeImage' onClick={actions.getRandomImage}>
                    <img
                        src={image}
                        width='300'
                        alt='random profile image'
                        className='profile__image'
                    />
                </button>
            ) : (
                'Loading...'
            )}
            {image ? (
                <button
                    className='btn btn--secondary profile__set-image'
                    onClick={() => {
                        if (store.randomImage !== store.user.profile_image_url) {
                            actions.user.setProfileImage();
                            setTimeout(() => actions.cleanMessage(), 5000);
                        }
                    }}
                >
                    Set image
                </button>
            ) : (
                ''
            )}
            {store.message && store.message.message ? (
                <span className='profile__message text-secondary-400'>{store.message.message}</span>
            ) : (
                ''
            )}
        </div>
    );
};
