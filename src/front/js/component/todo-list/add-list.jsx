import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { CirclePicker } from 'react-color';
import '../../../styles/components/popups/add-list.scss';

export const AddList = props => {
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

    return (
        <div className='add-list flex-col'>
            <h1 className='add-list__title'>New List</h1>
            <form
                className='form flex-col'
                onSubmit={e => {
                    e.preventDefault();
                    setData({
                        name: '',
                        color: '',
                    });
                    props.addList(data);
                }}
            >
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
                        autoComplete='off'
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

AddList.propTypes = {
    addList: PropTypes.func.isRequired,
};
