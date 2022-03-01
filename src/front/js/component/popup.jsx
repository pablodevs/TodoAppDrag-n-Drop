import React, { useContext } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { Context } from '../store/appContext';

export const Popup = () => {
    const { store, actions } = useContext(Context);

    return (
        <div
            className={
                'bg-cover' +
                (Object.entries(store.popup).length ? ' bg-cover-show' : '')
            }
        >
            <div
                className={
                    'popup' +
                    (Object.entries(store.popup).length ? ' popup-show' : '')
                }
            >
                {store.popup.component}
                {store.popup.icClosable ? (
                    <button
                        className='popup-close'
                        onClick={() => actions.popup.closePopup()}
                    >
                        <IoCloseOutline />
                    </button>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};
