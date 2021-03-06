import React, { useContext, useEffect, useRef, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsPlusLg } from 'react-icons/bs';
import '../../styles/pages/todo-list.scss';
import { Menu } from '../component/menu.jsx';
import { AddList } from '../component/todo-list/add-list.jsx';
import { ListLi } from '../component/todo-list/list-li.jsx';
import { List } from '../component/todo-list/list.jsx';
import { Context } from '../store/appContext';

export const TodoLists = () => {
    const { store, actions } = useContext(Context);

    const buttonEl = useRef(null);

    const [listOfLists, setListOfLists] = useState([<li key={0}>Loading...</li>]);

    useEffect(() => {
        actions.user.getTodoListsOfUser();
    }, []);

    useEffect(() => {
        if (store.todoLists) {
            if (store.todoLists.length) {
                setListOfLists(
                    store.todoLists.map(list => (
                        <ListLi key={list.id} list={list} deleteList={deleteList} />
                    ))
                );
                delete buttonEl.current.dataset.tooltip;
            } else {
                setListOfLists([<li key={-1}>No lists yet</li>]);
                buttonEl.current.dataset.tooltip = 'Add a new list!';
            }
        }
    }, [store.todoLists]);

    const addList = data => {
        actions.addNewList(data).then(list => {
            actions.popup.setPopup(<List list={list} />);
            actions.user.getTodoListsOfUser();
        });
    };

    const deleteList = listId => {
        actions.deleteTodoList(listId).then(resp => {
            if (resp) {
                actions.user.getTodoListsOfUser();
                actions.popup.closePopup();
            }
        });
    };

    return (
        <div className='todo-lists center flex-col'>
            <h1 className='todo-lists__title'>Your todo lists</h1>
            <button
                className='todo-lists__add-btn'
                ref={buttonEl}
                onClick={() =>
                    actions.popup.setPopup(<AddList addList={addList} />, true, 'medium')
                }
            >
                <IconContext.Provider value={{ className: 'btn-icon btn-icon--plus' }}>
                    <div className='flex'>
                        <BsPlusLg />
                    </div>
                </IconContext.Provider>
            </button>
            <ul className='todo-lists__lists'>{listOfLists}</ul>
            <div className='todo-lists__menu'>
                <Menu />
            </div>
        </div>
    );
};
