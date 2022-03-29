import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import '../../styles/components/popups/confirm-popup.scss';
import { Context } from '../store/appContext';

export const ConfirmPopup = props => {
    const { store, actions } = useContext(Context);
    return (
        <div className='confirm-popup flex-col'>
            <h1
                className='confirm-popup__title'
                style={{ color: `var(--clr-${props.data.style}-400)` }}
            >
                {props.data.title}
            </h1>
            <p className='confirm-popup__message'>{props.data.message}</p>
            <div className='confirm-popup__buttons'>
                <button className='btn-cancel' onClick={actions.popup.closePopup}>
                    {props.data.cancel || 'Cancel'}
                </button>
                <button
                    className='btn-confirm'
                    style={{ color: `var(--clr-${props.data.style}-400)` }}
                    onClick={props.func}
                >
                    {props.data.confirm}
                </button>
            </div>
        </div>
    );
};

ConfirmPopup.propTypes = {
    func: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};
