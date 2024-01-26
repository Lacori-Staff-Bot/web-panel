import React, { useEffect, useState } from "react";
import style from "./Notify.module.css";

function Notify({ label, type, description }) {
    const [classes, setClasses] = useState([style.Notify, style[type]]);

    useEffect(() => {
        setTimeout(() => {
            setClasses(classes => [...classes, style.Deleted]);
        }, 4500);
    }, [])

    return (
        <div className={classes.join(" ")}>
            <p>{label}</p>
            <p>{description}</p>
        </div>
    )
}

export default Notify;