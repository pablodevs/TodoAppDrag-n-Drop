import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
// import { BsPlusSquareFill } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import "../../styles/pages/todo-list.scss";
import { AddList } from "../component/todo-list/add-list.jsx";
// import { List } from "../component/todo-list/list.jsx";
import { Context } from "../store/appContext";

export const TodoList = () => {
    const { store, actions } = useContext(Context);

    const [listOfLists, setListOfLists] = useState([]);
    const [list, setList] = useState([]);
    const [data, setData] = useState("");

    useEffect(() => {
        setListOfLists(store.todoLists.length ?
            <ul className="todo-list__lists">
                {store.todoLists.map((list, index) => (
                    <li key={index} style={{ borderColor: list.color }}>
                        <span style={{ backgroundColor: list.color }} className="color-mark">
                        </span>
                        {list.name}
                        <IconContext.Provider value={{ className: "del-icon" }}>
                            <span>
                                <FaTrash />
                            </span>
                        </IconContext.Provider>
                    </li>
                ))}
            </ul>
            : <p>Todavía no tienes ninguna lista</p>)
    }, [store.todoLists])

    const handleSubmit = e => {
        e.preventDefault();
        setList([...list, data]);
        setData("");
        document.querySelector("#todo-input").focus();
    };

    return (
        <div className="todo-list center flex-col">
            <h1 className="todo-list__title">Todo List</h1>
            <button className="todo-list__add-btn" onClick={() => actions.setPopup(<AddList />)}>
                <IconContext.Provider value={{ className: "btn-icon plus-icon" }}>
                    <div>
                        <BsPlusLg />
                    </div>
                </IconContext.Provider>
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
            {/* <ul className="todo-list__items">
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul> */}
            {listOfLists}
        </div>
    );
};
