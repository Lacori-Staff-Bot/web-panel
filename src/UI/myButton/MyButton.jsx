import React from "react";
import style from "./MyButton.module.css";

function MyButton({ children, type, onClick, theme, styles }) {
    return (
        <button className={[style.MyButton, style[type], style[theme]].join(" ")} style={styles} onClick = { onClick } > { children }</button >
    )
}

export default MyButton;