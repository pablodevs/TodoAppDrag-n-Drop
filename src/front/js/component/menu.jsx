import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaUserSlash } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import '../../styles/components/menu.scss';

export const Menu = () => {
    const [menu, setMenu] = useState(false);
    return (
        <div className='menu'>
            <button
                className={'menu__toggle' + (menu ? ' active' : '')}
                onClick={() => {
                    setMenu(!menu);
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
                    setMenu(!menu);
                }}
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
                    setMenu(!menu);
                }}
            >
                <IconContext.Provider
                    value={{ className: 'btn-icon menu__icon menu__icon--logout' }}
                >
                    <div className='flex'>
                        <IoLogOutOutline />
                    </div>
                </IconContext.Provider>
            </button>
        </div>
    );
};
