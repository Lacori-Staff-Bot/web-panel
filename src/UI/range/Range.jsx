import React from "react";
import style from "./Range.module.css";

function Range({ children, min, max, step, value, onChange }) {
    return (
        <div className={style.Range}>
            <p>{children}</p>
            <input type="range" min={min} max={max} step={step} value={value} onChange={onChange} />
            <p>{value}</p>
        </div>
    )
}

export default Range;