import React from "react";
import style from "./Switch.module.css";

function Switch({ onChange, theme }) {
    return (
        <label className={style.Switch}>
            <input type="checkbox" onChange={onChange} />
            <span className={theme === "light" ? [style.Slider, style.light].join(" ") : [style.Slider, style.dark].join(" ")}></span>
        </label>
    )
}

export default Switch;