import React, { useContext } from "react";
import style from "./MyButton.module.css";

import { ThemeContext } from "../../../App";

function MyButton({ children, type, onClick, styles }) {
    const theme = useContext(ThemeContext);
    
    return (
        <button className={[style.MyButton, style[type], style[theme]].join(" ")} style={styles} onClick = { onClick } > { children }</button >
    )
}

export default MyButton;