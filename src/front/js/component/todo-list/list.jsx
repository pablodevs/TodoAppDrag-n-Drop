import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsArrowLeftShort, BsCheck2, BsPlusLg } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import todoList from '../../../img/todo-list.png';
import '../../../styles/components/popups/list.scss';
import { Context } from '../../store/appContext';
import { Todo } from './todo.jsx';

export const List = props => {
    const { store, actions } = useContext(Context);

    const titleEl = useRef(null);
    const labelEl = useRef(null);
    const inputEl = useRef(null);

    const [listOfTodos, setListOfTodos] = useState([]);
    const [title, setTitle] = useState(props.list.name);
    const [data, setData] = useState('');
    const [form, setForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [firstTime, setFirstTime] = useState(true);
    const [content, setContent] = useState(
        <p className='list__img'>Loading...</p>
    );

    useEffect(() => {
        let list = store.todoLists.find(
            element => element.id === props.list.id
        );

        if (list.todos) {
            if (!list.todos.length) {
                setContent(
                    <img
                        src={todoList}
                        alt='empty todo list'
                        className='list__img'
                    />
                );
            } else
                setListOfTodos(
                    list.todos.map(item => (
                        <Todo
                            key={item.id}
                            id={item.id}
                            task={item.task}
                            complete={item.complete}
                            list_id={item.list_id}
                            color={props.list.color}
                            updateTodo={updateTodo}
                            deleteTodo={deleteTodo}
                        />
                    ))
                );
        }

        if (list.name !== props.list.name) {
            setTitle(list.name);
        }
    }, [store.todoLists]);

    useEffect(() => {
        if (editing) {
            titleEl.current.focus();
        }
    }, [editing]);

    const handleBlur = e => {
        // currentTarget is the parent element, relatedTarget is the clicked element
        if (!e.currentTarget.contains(e.relatedTarget)) {
            console.log('YES');
            titleEl.current.classList.remove('error');
            setEditing(false);
            if (!title || title !== props.list.name) {
                setTitle(props.list.name);
            }
        }
    };

    const handleTitleSubmit = e => {
        e.preventDefault();

        if (title) {
            if (title !== props.list.name) {
                actions.updateTodoList({
                    id: props.list.id,
                    name: title,
                });
            }
            setEditing(false);
        } else {
            titleEl.current.classList.add('error');
            titleEl.current.focus();
        }
    };

    const toggleLabelEffect = e => {
        if ((data || e.type === 'focus') && !labelEl.current.classList.length) {
            if (firstTime) {
                inputEl.current.focus();
                labelEl.current.classList.add('visited');
                setFirstTime(false);
            } else {
                labelEl.current.classList.add('visited');
            }
        } else if (e.type === 'blur' && !data) {
            labelEl.current.classList.remove('visited');
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Agarrar el todo del back!
        actions.addTodo(data, props.list.id);
        setData('');
        setForm(false);
    };

    // Todo's functions
    const updateTodo = todo => actions.updateTodo(todo, props.list.id);
    const deleteTodo = todoId => actions.deleteTodo(todoId, props.list.id);

    return (
        <div className='list'>
            <header
                className='list__header'
                style={{ backgroundColor: props.list.color }}
            >
                <h1 className='list__title flex'>
                    {editing ? (
                        <form onSubmit={handleTitleSubmit} onBlur={handleBlur}>
                            <input
                                className='input-title'
                                type='text'
                                value={title}
                                ref={titleEl}
                                onChange={e => {
                                    titleEl.current.classList.remove('error');
                                    setTitle(e.target.value);
                                }}
                            />
                            <button>
                                <BsCheck2 />
                            </button>
                        </form>
                    ) : (
                        title
                    )}
                    {editing ? (
                        ''
                    ) : (
                        <button onClick={() => setEditing(true)}>
                            <AiFillEdit />
                        </button>
                    )}
                </h1>
            </header>
            <main>
                <div
                    className={'list__form-bg' + (form ? ' show-form-bg' : '')}
                    onClick={e => {
                        if (e.target.classList[0] === 'list__form-bg')
                            setForm(false);
                    }}
                >
                    <form
                        onSubmit={handleSubmit}
                        className={'list__form' + (form ? ' show-form' : '')}
                    >
                        <button
                            type='button'
                            className='list__form__btn-close'
                            onClick={() => {
                                setFirstTime(true);
                                setForm(false);
                            }}
                        >
                            <BsArrowLeftShort />
                        </button>
                        <label htmlFor='todo-input'>
                            <input
                                ref={inputEl}
                                type='text'
                                id='todo-input'
                                value={data}
                                onFocus={toggleLabelEffect}
                                onBlur={toggleLabelEffect}
                                onChange={e => setData(e.target.value)}
                                required
                            />
                            <span ref={labelEl}>New task</span>
                        </label>
                        <button
                            type='submit'
                            className='btn-icon btn-icon--check list__form__submit'
                        >
                            <BsCheck2 />
                        </button>
                    </form>
                </div>
                {listOfTodos.length ? (
                    <ul className='list__todos'>{listOfTodos}</ul>
                ) : (
                    content
                )}
            </main>
            <button
                className='list__btn-toggle-form'
                onClick={() => {
                    setData('');
                    setFirstTime(true);
                    setForm(!form);
                    if (!form) {
                        setTimeout(() => {
                            inputEl.current.focus();
                        }, 300);
                    }
                }}
            >
                <IconContext.Provider
                    value={{
                        className: `btn-icon btn-icon--plus ${
                            form ? 'active' : ''
                        }`,
                    }}
                >
                    <div className='flex'>
                        <BsPlusLg
                            style={{ backgroundColor: props.list.color }}
                        />
                    </div>
                </IconContext.Provider>
            </button>
        </div>
    );
};

List.propTypes = {
    list: PropTypes.object.isRequired,
};
