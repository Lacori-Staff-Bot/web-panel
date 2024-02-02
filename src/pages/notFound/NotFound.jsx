import React from "react";
import "./NotFound.css";

import NavLink from "../../components/UI/navLink/NavLink";

function NotFound() {
    return (
        <div className="NotFound">
            <div className="block">
                <p>Упс, кажется вы попали куда-то не туда.</p>
                <NavLink to="/" type="navigate">Вернуться на главную</NavLink>
            </div>
        </div>
    )
}

export default NotFound;