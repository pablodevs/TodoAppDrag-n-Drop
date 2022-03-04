import React, { useContext, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsPlusLg } from 'react-icons/bs';
import '../../styles/pages/todo-list.scss';
import { AddList } from '../component/todo-list/add-list.jsx';
import { ListLi } from '../component/todo-list/list-li.jsx';
import { Context } from '../store/appContext';

export const TodoLists = () => {
    const { store, actions } = useContext(Context);

    const [listOfLists, setListOfLists] = useState([<p>Loading...</p>]);

    useEffect(() => getLists(), []);

    const addList = data => {
        actions.addNewList(data).then(list => getLists());
    };

    const deleteList = listId => {
        actions.deleteTodoList(listId).then(resp => {
            if (resp) {
                getLists();
                actions.popup.closePopup();
            }
        });
    };

    const getLists = () => {
        actions.user.getTodoListsOfUser().then(todoLists => {
            if (!todoLists.length)
                setListOfLists([<p>Todavía no tienes listas.</p>]);
            else
                setListOfLists(
                    <ul className='todo-lists__lists'>
                        {todoLists.map(list => (
                            <ListLi
                                key={list.id}
                                list={list}
                                deleteList={deleteList}
                            />
                        ))}
                    </ul>
                );
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
