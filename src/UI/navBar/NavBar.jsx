import React, { useEffect, useState } from "react";
import style from "./NavBar.module.css";

function NavBar({ children, theme }) {
    return (
        <ul className={theme === "light" ? [style.NavBar, style.light].join(" ") : [style.NavBar, style.dark].join(" ")}>
            {children}
        </ul>
    )
}

export default NavBar;