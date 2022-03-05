import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaUser, FaUserFriends } from 'react-icons/fa';
import '../../../styles/components/bottom-tabs.scss';

export const BottomTabs = props => {
    const [active, setActive] = useState(0);

    return (
        <>
            <nav className='bottom-tabs'>
                <div className='center'>
                    <button
                        className={'bottom-tabs__tab-container' + (active ? '' : ' active')}
                        onClick={() => {
                            props.showSharedLists(false);
                            setActive(0);
                        }}
                    >
                        <FaUser />
                    </button>
                </div>
                <div className='center'>
                    <button
                        className={'bottom-tabs__tab-container resized' + (active ? ' active' : '')}
                        onClick={() => {
                            props.showSharedLists(true);
                            setActive(1);
                        }}
                    >
                        <FaUserFriends />
                    </button>
                </div>
                <div
                    className='bottom-tabs__border'
                    style={active ? { left: 'calc(75% - 5em)' } : {}}
                ></div>
            </nav>
            <div className='svg-container'>
                <svg viewBox='0 0 202.9 45.5'>
                    <clipPath
                        id='tab-effect'
                        clipPathUnits='objectBoundingBox'
                        transform='scale(0.0049285362247413 0.021978021978022)'
                    >
                        <path
                            d='M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
          c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
          c9.2,3.6,17.6,4.2,23.3,4H6.7z'
                        />
                    </clipPath>
                </svg>
            </div>
        </>
    );
};

BottomTabs.propTypes = {
    showSharedLists: PropTypes.func.isRequired,
};
