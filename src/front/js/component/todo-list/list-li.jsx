import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaListUl, FaTrash, FaUserFriends } from 'react-icons/fa';
import '../../../styles/components/todo-list/list-li.scss';
import { ConfirmPopup } from '../../component/confirm-popup.jsx';
import { Context } from '../../store/appContext.js';
import { List } from './list.jsx';

export const ListLi = props => {
    const { store, actions } = useContext(Context);

    const [canBeDeleted, setCanBeDeleted] = useState(false);

    useEffect(() => {
        if (store.user) setCanBeDeleted(props.list.user_id === store.user.id);
    }, [store.user]);

    return (
        <li className='list-li' key={props.list.id} style={{ borderColor: props.list.color }}>
            <button
                onClick={() => {
                    actions.popup.setPopup(<List list={props.list} />);
                }}
            >
                <div className='color-mark' style={{ color: props.list.color }}>
                    <FaListUl />
                </div>
                {props.list.name}
                {props.list.todos && props.list.todos.length ? (
                    <small className='completed-tasks'>
                        {props.list.todos.filter(element => element.complete).length}/
                        {props.list.todos.length}
                    </small>
                ) : (
                    <small className='completed-tasks'>0/0</small>
                )}
            </button>
            <IconContext.Provider value={{ className: 'icon-delete' }}>
                <button
                    className='btn-delete'
                    style={canBeDeleted ? {} : { opacity: '0', pointerEvents: 'none' }}
                    onClick={() => {
                        actions.popup.setPopup(
                            <ConfirmPopup
                                func={() => props.deleteList(props.list.id)}
                                data={{
                                    title: `Delete List ${props.list.name}?`,
                                    message:
                                        'This will delete all Tasks associated with the list. Are you sure?',
                                    confirm: 'Yes, delete it',
                                    cancel: 'No, keep it',
                                    style: 'danger',
                                }}
                            />,
                            true,
                            'small'
                        );
                    }}
                >
                    <FaTrash />
                </button>
            </IconContext.Provider>
        </li>
    );
};
ListLi.propTypes = {
    list: PropTypes.object.isRequired,
    deleteList: PropTypes.func.isRequired,
};
