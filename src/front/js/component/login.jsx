import React, { useContext, useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import '../../styles/components/popups/login.scss';
import { Context } from '../store/appContext';
import { Signup } from './signup.jsx';

export const Login = () => {
    const { store, actions } = useContext(Context);

    const [check, setCheck] = useState('checked');
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

    const handleCheck = () => {
        if (check === '') setCheck('checked');
        else if (check === 'checked') setCheck('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        actions.user.generateToken(data.name, data.password, check);
    };

    return (
        <div className='login flex-col'>
            <h1 className='login__title'>Sign in</h1>
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
                <div className='login__remember-me'>
                    <input
                        type='checkbox'
                        onChange={handleCheck}
                        checked={check}
                        value=''
                        id='rememberCheck'
                    />
                    <label htmlFor='rememberCheck'>Remember me</label>
                </div>
                <button className='btn btn--primary login__form__submit'>Sign in</button>
            </form>
            <div className='login__redirect'>
                Don't have an account yet?&nbsp;
                <button
                    className='text-primary-400'
                    onClick={() => {
                        actions.cleanMessage();
                        actions.popup.setPopup(<Signup />, false, 'medium');
                    }}
                >
                    Register now
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
