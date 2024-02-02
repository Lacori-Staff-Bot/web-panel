import React, { useContext } from "react";
import style from "./ActiveBlock.module.css";

import MyButton from "../UI/myButton/MyButton";

import { ThemeContext } from "../../App";

function ActiveBlock({ target, author, reasone, data, onClick }) {
    const theme = useContext(ThemeContext);

    return (
        <div className={[style.ActiveBlock, style[theme]].join(" ")}>
            <div className={style.left}>
                <p>Пользователь: {target}</p>
                <p>Выдал: {author}</p>
                <p>Причина: {reasone}</p>
            </div>
            <div className={style.right}>
                <p>Актуально от: {new Date(parseInt(data)).toLocaleString()}</p>
                <MyButton onClick={onClick} type={"Remove"}>Снять</MyButton>
            </div>
        </div>
    )
}

export default ActiveBlock;