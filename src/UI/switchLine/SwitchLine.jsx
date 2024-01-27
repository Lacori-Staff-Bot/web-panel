import React from "react";
import style from "./SwitchLine.module.css";

import Switch from "../switch/Switch";

function SwitchLine({children, onChange, theme, checked}) {
    return (
        <div className={style.SwitchLine}>
            <p>{children}</p>
            <Switch onChange={onChange} theme={theme} checked={checked} />
        </div>
    )
}

export default SwitchLine;