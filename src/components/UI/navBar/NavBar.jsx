import React, { useContext } from "react";
import style from "./NavBar.module.css";

import { ThemeContext } from "../../../App";

function NavBar({ children }) {
    const theme = useContext(ThemeContext);

    return (
        <ul className={theme === "light" ? [style.NavBar, style.light].join(" ") : [style.NavBar, style.dark].join(" ")}>
            {children}
        </ul>
    )
}

export default NavBar;