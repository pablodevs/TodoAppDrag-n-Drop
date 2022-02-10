import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav>
            <div>
                <Link to="/">
                    <span>React Boilerplate</span>
                </Link>
                <div>
                    <Link to="/demo">
                        <button>Check the Context in action</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
