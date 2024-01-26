import React from "react";
import style from "./MyButton.module.css";

function MyButton({ children, type, onClick, theme }) {
    return (
        <button className={[style.MyButton, style[type], style[theme]].join(" ")} onClick = { onClick } > { children }</button >
    )
}

export default MyButton;