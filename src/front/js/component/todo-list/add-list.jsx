import React, { useContext, useState } from 'react';
import { GithubPicker } from 'react-color';
import "../../../styles/components/todo-list/add-list.scss";
import { Context } from "../../store/appContext";


export const AddList = () => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({
        name: "",
        color: "#f5463d"
    })

    const handleChange = (e) => {
        setData({ ...data, name: e.target.value })
    };
    const handleColorChange = (color) => {
        setData({ ...data, color: color.hex })
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Enviar data al backend, por ahora lo enviamos a la store
        actions.addNewList(data);
        setData({
            name: "",
            color: ""
        });
        actions.closePopup();
    };

    return (
        <div className='add-list flex-col'>
            <h1 className="add-list__title">New List</h1>
            <form className='form flex-col' onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input type="text" name="name" id="todo-list-name" placeholder='Write a name' value={data.name} onChange={handleChange} className="form__name" />
                    <label htmlFor="">
                        Name
                    </label>
                </div>
                <span>Choose a color if you want:</span>
                <GithubPicker name="color" width='214px' onChange={handleColorChange} className="form__color-picker" />
                <button className="form__submit btn btn--secondary">Confirm</button>
            </form>
        </div>
    )
}
