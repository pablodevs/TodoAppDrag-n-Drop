import React, { useContext, useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import '../../styles/components/popups/login.scss';
import { Context } from '../store/appContext';
import { Login } from './login.jsx';

export const Signup = () => {
    const { store, actions } = useContext(Context);

    const [data, setData] = useState({
        name: '',
        password: '',
    });

    const handleOnChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
        actions.user.createUser(data.name, data.password).then(data => {
            if (data) {
                actions.popup.setPopup(<Login />, false, 'medium');
            }
        });
    };

    return (
        <div className='login flex-col'>
            <h1 className='login__title'>Sign up</h1>
            <form onSubmit={handleSubmit} className='login__form'>
                <div className='input-wrapper'>
                    <input
                        type='text'
                        id='#name'
                        name='name'
                        value={data.name}
                        autoComplete='off'
                        autoCapitalize='none'
                        required
                        onChange={handleOnChange}
                    />
                    <label htmlFor='name'>Name</label>
                </div>
                <div className='input-wrapper'>
                    <input
                        type='password'
                        id='#password'
                        name='password'
                        value={data.password}
                        autoComplete='off'
                        required
                        onChange={handleOnChange}
                    />
                    <label htmlFor='password'>Password</label>
                </div>
                <button className='btn btn--primary login__form__submit'>Register</button>
            </form>
            <div className='login__redirect'>
                Already have login and password?&nbsp;
                <button
                    className='text-primary-400'
                    onClick={() => {
                        actions.cleanMessage();
                        actions.popup.setPopup(<Login />, false, 'medium');
                    }}
                >
                    Sign in
                </button>
            </div>
            {store.message && store.message.message ? (
                <span className='login__message text-danger-400' role='alert'>
                    <RiErrorWarningLine />
                    {store.message.message}
                </span>
            ) : (
                ''
            )}
        </div>
    );
};
