import PropTypes from "prop-types";
import React, { useRef, useState } from 'react';
import { IconContext } from "react-icons";
import { BsArrowLeftShort, BsCheck2, BsPlusLg } from "react-icons/bs";
// import todoList from "../../../img/todo-list.png";
import "../../../styles/components/todo-list/list.scss";
import { Todo } from "./todo.jsx";

export const List = props => {
    const labelEl = useRef(null);
    const inputEl = useRef(null);

    const [listOfTodos, setListOfTodos] = useState([{ task: "Task 1", done: false }, { task: "Task 2", done: false }, { task: "Task 3", done: false }]);
    const [data, setData] = useState("");
    const [form, setForm] = useState(false);
    const [firstTime, setFirstTime] = useState(true);

    const toggleLabelEffect = (e) => {
        if ((data || e.type === "focus") && !labelEl.current.classList.length) {
            if (firstTime)
                setTimeout(() => {
                    labelEl.current.classList.add("visited");
                    setFirstTime(false);
                }, 300);
            else {
                labelEl.current.classList.add("visited");
            }
        }
        else {
            labelEl.current.classList.remove("visited");
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        setListOfTodos([...listOfTodos, { task: data, done: false }]);
        setData("");
        setForm(false);
    };

    return (
        <div className="list">
            <header className="list__header" style={{ backgroundColor: props.list.color }}>
                <h1 className="list__title">{props.list.name}</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit} className={"list__form" + (form ? " show-form" : "")}>
                    <button type="button" className="list__form__btn-close" onClick={() => {
                        setFirstTime(true);
                        setForm(false);
                    }
                    }>
                        <BsArrowLeftShort />
                    </button>
                    <label htmlFor="todo-input">
                        <input
                            ref={inputEl}
                            type="text"
                            id="todo-input"
                            value={data}
                            onFocus={toggleLabelEffect}
                            onBlur={toggleLabelEffect}
                            onChange={e => setData(e.target.value)}
                        />
                        <span ref={labelEl}>New task</span>
                    </label>
                    <button
                        type="submit"
                        className="btn-icon btn-icon--check list__form__submit">
                        <BsCheck2 />
                    </button>
                </form>
                {listOfTodos.length ? (
                    <ul className="list__todos">
                        {listOfTodos.map((item, index) => (
                            <Todo key={index} todo={item} />
                        ))}
                    </ul>) : (
                    <img src={todoList} alt="empty todo list" className="list__img" />)
                }
            </main>
            <button className="list__btn-toggle-form" onClick={() => {
                setForm(!form);
                setFirstTime(true);
                inputEl.current.focus();
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