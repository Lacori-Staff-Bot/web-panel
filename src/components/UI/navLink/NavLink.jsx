import React from "react";
import { Link } from "react-router-dom";
import style from "./NavLink.module.css";

function NavLink({ children, to, type }) {
    return (
        <Link to={to} replace={false} className={[style.navLink, style[type]].join(" ")}>{children}</Link>
    );
}

export default NavLink;