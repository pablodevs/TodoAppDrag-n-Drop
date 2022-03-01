import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../../styles/components/login.scss';
import { Context } from '../store/appContext';

export const Login = () => {
    const location = useLocation();
    const history = useHistory();
    const { store, actions } = useContext(Context);

    const [data, setData] = useState({
        name: '',
        password: '',
    });

    useEffect(() => {
        // Check if somebody is trying to access the web without login in
        if (location.pathname.split('/').pop()) history.push('/');
    }, [location]);

    const handleOnChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
        actions.user.generateToken(data.name, data.password);
    };

    return (
        <div className='login flex-col'>
            <h1 className='login__title'>Login</h1>
            <form onSubmit={handleSubmit} className='login__form'>
                <div className='input-wrapper'>
                    <input
                        type='text'
                        id='#name'
                        name='name'
                        value={data.name}
                        autoComplete='off'
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
                        onChange={handleOnChange}
                    />
                    <label htmlFor='password'>Password</label>
                </div>
                <button className='btn btn--primary'>Login</button>
            </form>
            {store.message && store.message.message ? (
                <span className='login__message text-danger-400'>
                    {store.message.message}
                </span>
            ) : (
                ''
            )}
        </div>
    );
};
