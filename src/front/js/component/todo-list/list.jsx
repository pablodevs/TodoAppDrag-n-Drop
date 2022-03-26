import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { IconContext } from 'react-icons';
import { AiFillEdit } from 'react-icons/ai';
import { BsArrowLeftShort, BsCheck2, BsPlusLg } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import todoList from '../../../img/todo-list.png';
import '../../../styles/components/popups/list.scss';
import { Context } from '../../store/appContext';
import { Todo } from './todo.jsx';

export const List = props => {
    const { store, actions } = useContext(Context);

    const btnShareEl = useRef(null);
    const titleEl = useRef(null);
    const labelEl = useRef(null);
    const inputEl = useRef(null);

    const [list, setList] = useState(props.list);
    const [listOfTodos, setListOfTodos] = useState([]);
    const [title, setTitle] = useState(props.list.name);
    const [data, setData] = useState('');
    const [form, setForm] = useState(false);
    const [editing, setEditing] = useState(false);
    const [firstTime, setFirstTime] = useState(true);
    const [share, setShare] = useState(props.list.share);
    const [canBeShared, setCanBeShared] = useState(false);
    const [content, setContent] = useState(<p className='list__img'>Loading...</p>);

    useEffect(() => {
        setCanBeShared(props.list.user_id === store.user.id);
    }, []);

    useEffect(() => {
        let foundList = store.todoLists.find(element => element.id === props.list.id);

        if (foundList && foundList.todos) {
            if (!foundList.todos.length) {
                setContent(<img src={todoList} alt='empty todo list' className='list__img' />);
                setListOfTodos(foundList.todos);
            } else setListOfTodos(foundList.todos);
        }

        if (foundList && foundList.name !== props.list.name) {
            setTitle(foundList.name);
        }
    }, [store.todoLists]);

    useEffect(() => {
        let thisList = store.todoLists.find(list => props.list.id === list.id);
        if (thisList) setShare(thisList.share);
        else setShare(!share);
    }, [store.todoLists]);

    useEffect(() => {
        if (editing) {
            titleEl.current.focus();
        }
    }, [editing]);

    const handleBlur = e => {
        // currentTarget is the parent element, relatedTarget is the clicked element
        if (!e.currentTarget.contains(e.relatedTarget)) {
            titleEl.current.classList.remove('error');
            setEditing(false);
            if (!title || title !== list.name) {
                setTitle(list.name);
            }
        }
    };

    const handleTitleSubmit = e => {
        e.preventDefault();

        if (title) {
            if (title !== list.name) {
                actions.updateTodoList({
                    id: list.id,
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
        // Agarrar el 'todo' del back!
        actions.addTodo(data, list.id);
        setData('');
        setForm(false);
    };

    // Todo's functions
    const updateTodo = todoData => actions.updateTodo(todoData, list.id);
    const deleteTodo = todoId => actions.deleteTodo(todoId, list.id);

    // Drag & Drop functions
    const reorder = (list, startIndex, endIndex) => {
        const reorderedList = [...list];
        const [removed] = reorderedList.splice(startIndex, 1);
        reorderedList.splice(endIndex, 0, removed);

        return reorderedList;
    };

    const handleDragEnd = result => {
        const { source, destination } = result;

        if (!destination) return;
        if (source.index === destination.index) return;

        const newListOfTodos = reorder(listOfTodos, source.index, destination.index);

        setListOfTodos(newListOfTodos);

        actions.reorderTodos({
            listId: list.id,
            sourceIndex: source.index,
            destinationIndex: destination.index,
        });
        // Crear el "manda las completadas abajo"
    };

    return (
        <div className='list'>
            <header className='list__header' style={{ backgroundColor: list.color }}>
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
                {editing ? (
                    ''
                ) : canBeShared ? (
                    <button
                        className={'btn-share center' + (share ? ' active' : '')}
                        ref={btnShareEl}
                        onClick={() =>
                            actions
                                .updateTodoList({
                                    id: list.id,
                                    share: !share,
                                })
                                .then(list => setList(list))
                        }
                    >
                        <FaUserFriends />
                    </button>
                ) : (
                    ''
                )}
            </header>
            <main>
                <div
                    className={'list__form-bg' + (form ? ' show-form-bg' : '')}
                    onClick={e => {
                        if (e.target.classList[0] === 'list__form-bg') setForm(false);
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
                    <DragDropContext onDragEnd={res => handleDragEnd(res)}>
                        <Droppable droppableId='todos' direction='vertical'>
                            {provided => (
                                <ul
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className='list__todos'
                                >
                                    {listOfTodos.map((item, idx) => (
                                        <Draggable
                                            draggableId={item.id.toString()}
                                            // index={item.index || idx}
                                            index={idx}
                                            key={item.id.toString()}
                                        >
                                            {provided => (
                                                <li
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Todo
                                                        dragHandleProps={provided.dragHandleProps} // esto es lo que decide qué zona activa el drag (los puntitos esos de la derecha)
                                                        id={item.id}
                                                        task={item.task}
                                                        complete={item.complete}
                                                        list_id={item.list_id}
                                                        color={list.color}
                                                        updateTodo={updateTodo}
                                                        deleteTodo={deleteTodo}
                                                    />
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
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
                        className: `btn-icon btn-icon--plus ${form ? 'active' : ''}`,
                    }}
                >
                    <div className='flex'>
                        <BsPlusLg style={{ backgroundColor: list.color }} />
                    </div>
                </IconContext.Provider>
            </button>
        </div>
    );
};

List.propTypes = {
    list: PropTypes.object.isRequired,
};
