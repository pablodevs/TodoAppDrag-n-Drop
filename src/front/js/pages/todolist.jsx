import React, { useEffect, useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import "../../styles/pages/todo-list.scss";

export const TodoList = () => {
    const [list, setList] = useState([]);
    const [data, setData] = useState("");

    useEffect(() => console.log(data), [data]);

    const handleSubmit = e => {
        e.preventDefault();
        setList([...list, data]);
        setData("");
        document.querySelector("#todo-input").focus();
    };

    return (
        <div className="todo-list center flex-col">
            <h1 className="todo-list__title">Todo List</h1>
            <form onSubmit={handleSubmit} className="todo-list__form">
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
            </form>
            <ul className="todo-list__items">
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};
