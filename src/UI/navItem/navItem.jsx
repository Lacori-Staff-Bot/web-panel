import React from "react";
import style from "./navItem.module.css";

function NavItem({children, onClick}) {
    return(
        <li className={style.NavItem} onClick={onClick}>{children}</li>
    )
}

export default NavItem;