import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="home">
            <h1 className="text-dark-200">Testing .text-dark-200</h1>
            <div className="row">
                <div className="col-12 bg-danger-300">12</div>
                <div className="col-11 bg-danger-200">11</div>
                <div className="col-10 bg-dark-300">10</div>
                <div className="col-9 bg-dark-200">9</div>
                <div className="col-8 bg-dark-100">8</div>
                <div className="col-7 bg-primary-500">7</div>
                <div className="col-6 bg-primary-400">6</div>
                <div className="col-5 bg-primary-300">5</div>
                <div className="col-4 bg-primary-200">4</div>
                <div className="col-3 bg-primary-100">3</div>
                <div className="col-2 bg-secondary-300">2</div>
            </div>
            <button className="btn">Cambia el tamaño de la pantalla!</button>
        </div>
    );
};
