import React, { useEffect, useState } from "react";
import style from "./Selector.module.css";

function Selector({ name, children, variants, onChange, value }) {
    const [options, setOptions] = useState([<option value={0} key={0}>{name}</option>]);

    useEffect(() => {
        setOptions([<option key={0} value={0}>{name}</option>]);
        for (let variant of variants) {
            setOptions(options => [...options, <option value={variant.id} key={variant.id}>{variant.name}</option>]);
        }
    }, [variants]);

    return (
        <div className={style.Selector}>
            <p>{children}</p>
            <select onChange={onChange} value={value}>
                {options}
            </select>
        </div>
    )
}

export default Selector;