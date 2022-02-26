import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
    const location = useLocation();

    return location.pathname.split("/").pop() ? <div className="navbar">
        <Link to="/">
            <IconContext.Provider value={{ className: "btn-icon" }}>
                <div>
                    <AiOutlineHome />
                </div>
            </IconContext.Provider>
        </Link>
    </div> : "";
};
