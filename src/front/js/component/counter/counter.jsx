import PropTypes from "prop-types";
import React, { useEffect, useState, useContext } from "react";
import gusine from "../../../img/gusine.png";
import gusinette from "../../../img/gusinette.png";
import { Context } from "../../store/appContext";
import { Number } from "./number.jsx";

export const Counter = props => {
    const { store, actions } = useContext(Context);
    const [clock, setClock] = useState([]);

    // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const updateClock = () => {
            let currentTime = new Date().getTime();

            // Segundos que quedan antes de la fecha
            let seg = Math.round((props.date.getTime() - currentTime) / 1000);

            if (seg < 0) {
                // stop timer
                clearInterval(timer);
            } else {
                // update timer
                let days = Math.floor(seg / (24 * 60 * 60));
                seg = seg - days * 24 * 60 * 60;
                let hours = Math.floor(seg / (60 * 60));
                seg = seg - hours * 60 * 60;
                let mins = Math.floor(seg / 60);
                seg = seg - mins * 60;

                setClock([days, hours, mins, seg]);
            }
        };

        const timer = setInterval(updateClock, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="counter center bg-primary-500">
            <div className="counter__images center">
                {/* <img src={gusine} alt="gusine" />
                <img src={gusinette} alt="gusinette" /> */}
            </div>
            <div className="container">
                <div className="row">
                    {clock.map((value, index) => (
                        <Number label={value} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

Counter.propTypes = {
    date: PropTypes.object.isRequired,
};
