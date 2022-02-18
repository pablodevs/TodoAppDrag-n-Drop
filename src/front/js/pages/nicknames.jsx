import React, { useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
import nicknamesData from "../json/nicknames.json";
import "../../styles/pages/nicknames.scss";

export const Nicknames = () => {
    const [nickname, setNickname] = useState("");
    const [data, setData] = useState("");

    const nicknameGenerator = () => {
        const [prefixes, suffixes, adjectives, names] = [
            ...Object.values(nicknamesData),
        ];

        let randomNumber = Math.random();

        let randomNickname =
            randomNumber < 0.333
                ? [prefixes, suffixes].map(randomElement).join("")
                : randomNumber < 0.666
                ? [adjectives, names].map(randomElement).join("")
                : [adjectives, prefixes, suffixes].map(randomElement).join("");

        setNickname(randomNickname);
    };

    const randomElement = array =>
        array[Math.floor(Math.random() * array.length)];

    const handleSubmit = e => {
        e.preventDefault();
        if (data) setNickname(data);
        document.querySelector("#nickname-input").focus();
    };
    return (
        <div className="nicknames center flex-col">
            <h1 className="nicknames__title">Nicknames</h1>
            <button
                className="btn btn--danger nnicknames__toggle"
                onClick={nicknameGenerator}>
                Generate
            </button>
            <br />
            <form className="nicknames__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="nickname-input"
                    placeholder="Insert new nickname"
                    value={data}
                    onChange={e => setData(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn-icon"
                    onClick={handleSubmit}>
                    <BsPlusSquareFill />
                </button>
            </form>
            <br />
            <span className="nicknames__nickname">{nickname}</span>
            <br />
            <button className="btn btn--secondary nicknames__add-nickname">
                Add Nickname
            </button>
        </div>
    );
};
