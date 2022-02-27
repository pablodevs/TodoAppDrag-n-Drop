import React, { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
// import { BsPlusSquareFill } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import "../../styles/pages/todo-list.scss";
import { AddList } from "../component/todo-list/add-list.jsx";
import { List } from "../component/todo-list/list.jsx";
import { Context } from "../store/appContext";

export const TodoLists = () => {
    const { store, actions } = useContext(Context);

    const [listOfLists, setListOfLists] = useState([]);
    const [list, setList] = useState([]);
    const [data, setData] = useState("");

    useEffect(() => {
        setListOfLists(store.todoLists.length ?
            <ul className="todo-lists__lists">
                {store.todoLists.map((list, index) => (
                    <li key={index} style={{ borderColor: list.color }}>
                        <button onClick={() => {
                            actions.setPopup(<List list={list} />)
                            return;
                        }}>
                            <span style={{ backgroundColor: list.color }} className="color-mark">
                            </span>
                            {list.name}
                        </button>
                        <IconContext.Provider value={{ className: "del-icon" }}>
                            <button className="btn-delete-list" onClick={() => actions.deleteTodoList(index)}>
                                <FaTrash />
                            </button>
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
        <div className="todo-lists center flex-col">
            <h1 className="todo-lists__title">Todo List</h1>
            <button className="todo-lists__add-btn" onClick={() => actions.setPopup(<AddList />)}>
                <IconContext.Provider value={{ className: "btn-icon btn-icon--plus" }}>
                    <div className="flex">
                        <BsPlusLg />
                    </div>
                </IconContext.Provider>
            </button>
            {/* <form onSubmit={handleSubmit} className="todo-lists__form">
                <input
                    autoFocus
                    type="text"
                    id="todo-input"
                    value={data}
                    onChange={e => setData(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn-icon todo-lists__form__submit">
                    <BsPlusSquareFill />
                </button>
            </form> */}
            {/* <ul className="todo-lists__items">
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul> */}
            {listOfLists}
        </div>
    );
};
