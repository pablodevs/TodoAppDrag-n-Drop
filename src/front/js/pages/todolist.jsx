import React, { useContext, useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import "../../styles/pages/todo-list.scss";
import { Context } from "../store/appContext";

export const TodoList = () => {
    const { store, actions } = useContext(Context);

    const [list, setList] = useState([]);
    const [data, setData] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        setList([...list, data]);
        setData("");
        document.querySelector("#todo-input").focus();
    };

    return (
        <div className="todo-list center flex-col">
            <h1 className="todo-list__title">Todo List</h1>
            <button
                className="btn-with-icon"
                onClick={() => actions.setPopup()}>
                <BsPlusSquareFill />
                New List
            </button>
            {/* <form onSubmit={handleSubmit} className="todo-list__form">
                <input
                    autoFocus
                    type="text"
                    id="todo-input"
                    value={data}
                    onChange={e => setData(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn-icon todo-list__form__submit">
                    <BsPlusSquareFill />
                </button>
            </form> */}
            <ul className="todo-list__items">
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};
