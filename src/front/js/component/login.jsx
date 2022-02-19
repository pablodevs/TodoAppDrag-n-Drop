import React, { useContext, useState } from "react";
import "../../styles/components/login.scss";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);

    const [data, setData] = useState({
        name: "",
        password: "",
    });

    const handleOnChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
        actions.generateToken(data.name, data.password);
    };

    return (
        <div className="bg-cover">
            <div className="popup login flex-col">
                <h1 className="login__title">LOGIN</h1>
                <form onSubmit={handleSubmit} className="login__form">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            id="#name"
                            name="name"
                            value={data.name}
                            autoComplete="off"
                            onChange={handleOnChange}
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="password"
                            id="#password"
                            name="password"
                            value={data.password}
                            autoComplete="off"
                            onChange={handleOnChange}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn btn--primary">Login</button>
                </form>
            </div>
        </div>
    );
};
