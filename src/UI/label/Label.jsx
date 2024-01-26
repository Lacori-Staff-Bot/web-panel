import React from "react";
import style from "./Label.module.css";

function Label({children}) {
    return(
        <div className={style.Label}>{children}</div>
    )
}

export default Label;