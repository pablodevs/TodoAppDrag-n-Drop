import React, { useContext, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaUserSlash } from 'react-icons/fa';
import { IoExit } from 'react-icons/io5';
import '../../styles/components/menu.scss';
import { Context } from '../store/appContext';
import { ConfirmPopup } from './confirm-popup.jsx';
import { Login } from './login.jsx';

export const Menu = () => {
    const { store, actions } = useContext(Context);
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        if (menu) {
            document.addEventListener('mousedown', handleMouseDown);
        }
    }, [menu]);

    const handleMouseDown = e => {
        if (e.target === document.querySelector('.menu-bg-cover'))
            document.addEventListener('mouseup', handleMouseUp);
    };
    const handleMouseUp = e => {
        if (e.target === document.querySelector('.menu-bg-cover')) {
            setMenu(false);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousedown', handleMouseDown);
        } else document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className='menu'>
            {menu ? <div className='menu-bg-cover'></div> : ''}
            <button
                className={'menu__toggle' + (menu ? ' active' : '')}
                onClick={() => {
                    setMenu(!menu);
                    if (menu) {
                        document.removeEventListener('mousedown', handleMouseDown);
                    }
                }}
            >
                <IconContext.Provider value={{ className: 'btn-icon menu__icon' }}>
                    <div className='flex'>
                        <BsThreeDotsVertical />
                    </div>
                </IconContext.Provider>
            </button>

            <button
                className={'menu__delete' + (menu ? ' active' : '')}
                onClick={() => {
                    setMenu(false);
                    document.removeEventListener('mousedown', handleMouseDown);
                    actions.popup.setPopup(
                        <ConfirmPopup
                            func={() => {
                                actions.user.deleteUser().then(resp => {
                                    actions.user.logout();
                                    actions.popup.setPopup(<Login />, false, 'medium');
                                });
                            }}
                            data={{
                                title: `Delete account`,
                                message:
                                    'This will delete all your Lists and Tasks. Once you delete your account, there is no going back. Are you sure?',
                                confirm: 'Yes, delete it',
                                cancel: 'No, keep it',
                                style: 'danger',
                            }}
                        />,
                        true,
                        'small'
                    );
                }}
                data-tooltip='Delete account'
            >
                <IconContext.Provider
                    value={{ className: 'btn-icon menu__icon menu__icon--delete' }}
                >
                    <div className='flex'>
                        <FaUserSlash />
                    </div>
                </IconContext.Provider>
            </button>

            <button
                className={'menu__logout' + (menu ? ' active' : '')}
                onClick={() => {
                    setMenu(false);
                    document.removeEventListener('mousedown', handleMouseDown);
                    actions.user.logout();
                    actions.popup.setPopup(<Login />, false, 'medium');
                }}
                data-tooltip='Sign out'
            >
                <IconContext.Provider
                    value={{ className: 'btn-icon menu__icon menu__icon--logout' }}
                >
                    <div className='flex'>
                        <IoExit />
                    </div>
                </IconContext.Provider>
            </button>
        </div>
    );
};
