import React, { useContext, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsPlusLg } from 'react-icons/bs';
import { FaListUl, FaTrash } from 'react-icons/fa';
import '../../styles/pages/todo-list.scss';
import { AddList } from '../component/todo-list/add-list.jsx';
import { List } from '../component/todo-list/list.jsx';
import { Context } from '../store/appContext';

export const TodoLists = () => {
    const { store, actions } = useContext(Context);

    const [todosFetch, setTodosFetch] = useState(false);
    const [listOfLists, setListOfLists] = useState([]);

    useEffect(() => {
        if (store.user && !store.user.todoLists) {
            actions.user.getTodoListsOfUser();
        }
    }, [store.user]);

    useEffect(() => {
        if (
            !todosFetch &&
            store.user &&
            store.user.todoLists &&
            store.user.todoLists.length
        ) {
            store.user.todoLists.forEach(list => actions.getTodos(list.id));
            setTodosFetch(true);
        }
    }, [store.user]);

    useEffect(() => {
        setListOfLists(
            store.user && store.user.todoLists ? (
                store.user.todoLists.length && store.user.todoLists[0].todos ? (
                    <ul className='todo-lists__lists'>
                        {store.user.todoLists.map(list => (
                            <li
                                key={list.id}
                                style={{ borderColor: list.color }}
                            >
                                <button
                                    onClick={() => {
                                        actions.popup.setPopup(
                                            <List list={list} />
                                        );
                                    }}
                                >
                                    <div
                                        className='color-mark'
                                        style={{ color: list.color }}
                                    >
                                        <FaListUl />
                                    </div>
                                    {list.name}
                                    {list.todos && list.todos.length ? (
                                        <small className='completed-tasks'>
                                            {
                                                list.todos.filter(
                                                    element => element.complete
                                                ).length
                                            }
                                            /{list.todos.length}
                                        </small>
                                    ) : (
                                        <small className='completed-tasks'>
                                            0/0
                                        </small>
                                    )}
                                </button>
                                <IconContext.Provider
                                    value={{ className: 'icon-delete' }}
                                >
                                    <button
                                        className='btn-delete'
                                        onClick={() => {
                                            setTodosFetch(false);
                                            actions.deleteTodoList(list.id);
                                        }}
                                    >
                                        <FaTrash />
                                    </button>
                                </IconContext.Provider>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Todavía no tienes ninguna lista</p>
                )
            ) : (
                <p>Loading...</p>
            )
        );
    }, [store.user]);

    return (
        <div className='todo-lists center flex-col'>
            <h1 className='todo-lists__title'>Todo List</h1>
            <button
                className='todo-lists__add-btn'
                onClick={() => actions.popup.setPopup(<AddList />)}
            >
                <IconContext.Provider
                    value={{ className: 'btn-icon btn-icon--plus' }}
                >
                    <div className='flex'>
                        <BsPlusLg />
                    </div>
                </IconContext.Provider>
            </button>
            {listOfLists}
        </div>
    );
};
