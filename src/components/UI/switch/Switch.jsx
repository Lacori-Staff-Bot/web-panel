import React, { useContext } from "react";
import style from "./Switch.module.css";

import { ThemeContext } from "../../../App";

function Switch({ onChange, checked }) {
    const theme = useContext(ThemeContext);

    return (
        <label className={style.Switch}>
            <input type="checkbox" onChange={onChange} checked={checked} />
            <span className={theme === "light" ? [style.Slider, style.light].join(" ") : [style.Slider, style.dark].join(" ")}></span>
        </label>
    )
}

export default Switch;