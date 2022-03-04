import React, { useContext, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsPlusLg } from 'react-icons/bs';
import '../../styles/pages/todo-list.scss';
import { AddList } from '../component/todo-list/add-list.jsx';
import { List } from '../component/todo-list/list.jsx';
import { ListLi } from '../component/todo-list/list-li.jsx';
import { Context } from '../store/appContext';

export const TodoLists = () => {
    const { store, actions } = useContext(Context);

    const [listOfLists, setListOfLists] = useState([<p key={0}>Loading...</p>]);

    useEffect(() => {
        getLists();
    }, []);

    useEffect(() => {
        if (store.todoLists.length) {
            setListOfLists(
                <ul className='todo-lists__lists'>
                    {store.todoLists.map(list => (
                        <ListLi
                            key={list.id}
                            list={list}
                            deleteList={deleteList}
                        />
                    ))}
                </ul>
            );
        }
    }, [store.todoLists]);

    const getLists = () => {
        actions.user.getTodoListsOfUser().then(todoListsLength => {
            if (!todoListsLength)
                setListOfLists([<p key={-1}>Todavía no tienes listas.</p>]);
        });
    };

    const addList = data => {
        actions.addNewList(data).then(list => {
            actions.popup.setPopup(<List list={list} />);
            getLists();
        });
    };

    const deleteList = listId => {
        actions.deleteTodoList(listId).then(resp => {
            if (resp) {
                getLists();
                actions.popup.closePopup();
            }
        });
    };

    return (
        <div className='todo-lists center flex-col'>
            <h1 className='todo-lists__title'>Todo List</h1>
            <button
                className='todo-lists__add-btn'
                onClick={() =>
                    actions.popup.setPopup(
                        <AddList addList={addList} />,
                        true,
                        'medium'
                    )
                }
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
