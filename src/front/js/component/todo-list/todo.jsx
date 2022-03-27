import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { BsCheck2, BsCheckCircleFill, BsCircle } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';
import '../../../styles/components/todo-list/todo.scss';

export const Todo = props => {
    const inputEl = useRef(null);

    const [editing, setEditing] = useState(false);
    const [data, setData] = useState(props.task);

    useEffect(() => {
        if (editing) {
            inputEl.current.focus();
        }
    }, [editing]);

    const handleBlur = e => {
        // currentTarget is the parent element, relatedTarget is the clicked element
        if (!e.currentTarget.contains(e.relatedTarget)) {
            inputEl.current.classList.remove('error');
            setEditing(false);
            if (!data || data !== props.task) {
                setData(props.task);
            }
        }
    };

    const handleChange = e => {
        inputEl.current.classList.remove('error');
        setData(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (data) {
            if (data !== props.task) {
                props.updateTodo({
                    id: props.id,
                    task: data,
                });
            }
            setEditing(false);
        } else {
            inputEl.current.classList.add('error');
            inputEl.current.focus();
        }
    };

    return (
        <div
            className={
                'todo' +
                (props.complete ? ' todo--complete' : '') +
                (editing ? ' todo--editing' : '')
            }
            style={editing ? { zIndex: '1', position: 'relative' } : {}}
        >
            <span
                className='todo__color-decoration'
                style={{ backgroundColor: props.color }}
            ></span>
            <button
                onClick={() =>
                    props.updateTodo({
                        id: props.id,
                        complete: !props.complete,
                    })
                }
                className={'todo__btn-check' + (props.complete ? ' todo__btn-check--complete' : '')}
            >
                <div className='outline-effect'>
                    {props.complete ? <BsCheckCircleFill /> : <BsCircle />}
                </div>
            </button>
            {editing ? (
                <form className='todo__form' onSubmit={handleSubmit} onBlur={e => handleBlur(e)}>
                    <input
                        className='todo__task'
                        value={data}
                        onChange={handleChange}
                        ref={inputEl}
                    />
                    <button
                        className={
                            'btn-icon btn-icon--check todo__submit' + (editing ? ' show' : '')
                        }
                    >
                        <BsCheck2 />
                    </button>
                    <button
                        type='button'
                        className={'btn-icon todo__btn-delete' + (editing ? ' show' : '')}
                        onClick={() => props.deleteTodo(props.id)}
                    >
                        <FaTrash />
                    </button>
                </form>
            ) : (
                <button className='todo__task' onClick={() => setEditing(true)}>
                    {data}
                </button>
            )}
            <div className='todo__btn-drag' {...props.dragHandleProps}>
                <MdDragIndicator />
            </div>
        </div>
    );
};

Todo.propTypes = {
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
    list_id: PropTypes.number.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    dragHandleProps: PropTypes.object.isRequired,
};
