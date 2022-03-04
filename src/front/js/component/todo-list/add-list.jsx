import React, { useContext, useEffect, useRef, useState } from 'react';
import { CirclePicker } from 'react-color';
import '../../../styles/components/popups/add-list.scss';
import { Context } from '../../store/appContext';
import { List } from './list.jsx';

export const AddList = () => {
    // to prevent useEffect from runnning on mount we'll use useRef:
    const isMounted = useRef(false);

    const { store, actions } = useContext(Context);
    const [data, setData] = useState({
        name: '',
        color: '#f5463d',
    });

    useEffect(() => {
        if (isMounted.current) {
            actions.popup.setPopup(
                <List list={store.user.todoLists.slice(-1)[0]} />
            );
        } else {
            isMounted.current = true;
        }
    }, [store.user]);

    const handleChange = e => {
        setData({ ...data, name: e.target.value });
    };
    const handleColorChange = color => {
        setData({ ...data, color: color.hex });
    };

    const handleSubmit = e => {
        e.preventDefault();
        actions.addNewList(data);
        setData({
            name: '',
            color: '',
        });
    };

    return (
        <div className='add-list flex-col'>
            <h1 className='add-list__title'>New List</h1>
            <form className='form flex-col' onSubmit={handleSubmit}>
                <div className='input-wrapper'>
                    <input
                        type='text'
                        name='name'
                        id='todo-list-name'
                        placeholder='Write a name'
                        value={data.name}
                        onChange={handleChange}
                        style={{
                            borderColor: data.color,
                            borderWidth: '3px',
                            boxShadow: 'none',
                        }}
                        className='form__name'
                        required
                    />
                    <label
                        htmlFor=''
                        style={{ color: data.color, fontWeight: 'bold' }}
                    >
                        Name
                    </label>
                </div>
                <span>Choose a color if you want:</span>
                <div style={{ marginInline: 'auto' }}>
                    <CirclePicker
                        name='color'
                        width='252px'
                        onChange={handleColorChange}
                        className='form__color-picker'
                    />
                </div>
                <button className='form__submit btn btn--secondary'>
                    Confirm
                </button>
            </form>
        </div>
    );
};
