import PropTypes from "prop-types";
import React from 'react';
import { BsCircle, BsCheckCircle } from "react-icons/bs";

export const Todo = props => {
    return (
        <li className="todo">
            <BsCircle />
            <BsCheckCircle />
            <p>{props.todo.task}</p>
        </li>
    )
}

Todo.propTypes = {
    todo: PropTypes.object.isRequired,
    // completeTodo: PropTypes.func.isRequired
};