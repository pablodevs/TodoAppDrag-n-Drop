import PropTypes from "prop-types";
import React from 'react';
import { IconContext } from "react-icons";
import { BsPlusLg } from "react-icons/bs";
import todoList from "../../../img/todo-list.png";
import "../../../styles/components/todo-list/list.scss";

export const List = props => {
    return (
        <div className="list">
            <header className="list__header" style={{ backgroundColor: props.list.color }}>
                <h1 className="list__title">{props.list.name}</h1>
            </header>
            <div className="list__todos">
                <img src={todoList} alt="empty todo list" className="list__img" />
            </div>
            <button className="list__add-btn" onClick={() => {
                // Add todo (aparece un input arriba a lo navbar)
                return;
            }}>
                <IconContext.Provider value={{ className: "btn-icon btn-icon--plus" }}>
                    <div className="flex">
                        <BsPlusLg style={{ backgroundColor: props.list.color }} />
                    </div>
                </IconContext.Provider>
            </button>
        </div>
    )
}

List.propTypes = {
    list: PropTypes.object.isRequired,
};