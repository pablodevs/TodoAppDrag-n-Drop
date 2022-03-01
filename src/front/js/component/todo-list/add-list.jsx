import React, { useContext, useState } from 'react';
import { CirclePicker } from 'react-color';
import '../../../styles/components/todo-list/add-list.scss';
import { Context } from '../../store/appContext';

export const AddList = () => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({
        name: '',
        color: '#f5463d',
    });

    const handleChange = e => {
        setData({ ...data, name: e.target.value });
    };
    const handleColorChange = color => {
        setData({ ...data, color: color.hex });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Enviar data al backend, por ahora lo enviamos a la store
        actions.addNewList(data);
        setData({
            name: '',
            color: '',
        });
        actions.popup.closePopup();
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
