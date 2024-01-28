import React from "react";
import style from "./SwitchLine.module.css";

import Switch from "../UI/switch/Switch";

function SwitchLine({children, onChange, checked}) {
    return (
        <div className={style.SwitchLine}>
            <p>{children}</p>
            <Switch onChange={onChange} checked={checked} />
        </div>
    )
}

export default SwitchLine;