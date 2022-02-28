import PropTypes from 'prop-types';
import React from 'react';
import { BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { MdDragIndicator } from 'react-icons/md';
import '../../../styles/components/todo-list/todo.scss';

export const Todo = props => {
    return (
        <li className={'todo' + (props.todo.complete ? ' todo--complete' : '')}>
            <span
                className='todo__color-decoration'
                style={{ backgroundColor: props.color }}
            ></span>
            <button
                onClick={() => props.checkTodo(props.id)}
                className={
                    'todo__btn-check' +
                    (props.todo.complete ? ' todo__btn-check--complete' : '')
                }
            >
                <div className='outline-effect'>
                    {props.todo.complete ? <BsCheckCircleFill /> : <BsCircle />}
                </div>
            </button>
            <button
                className='todo__task'
                onClick={() => {
                    // Open task editor
                }}
            >
                {props.todo.task}
            </button>
            <button className='todo__btn-drag'>
                <MdDragIndicator />
            </button>
        </li>
    );
};

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    todo: PropTypes.object.isRequired,
    checkTodo: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
};
