import React from "react";
import "./Guild.css";

import NavBar from "../../UI/navBar/NavBar";
import NavItem from "../../UI/navItem/navItem";
import MyButton from "../../UI/myButton/MyButton";
import { useNavigate, useParams } from "react-router-dom";

function GuildPage({ theme, mainBlock }) {
    const params = useParams();
    const navigate = useNavigate();

    return (
        <div className={theme == "light" ? "Guild light" : "Guild dark"}>
            <nav>
                <NavBar theme={theme}>
                    <NavItem onClick={() => navigate(`/g/${params.id}`, { replace: false })}>Основные настройки</NavItem>
                    <NavItem onClick={() => navigate(`/g/${params.id}/restrictions`, { replace: false })}>Ограничения</NavItem>
                    <NavItem onClick={() => navigate(`/g/${params.id}/bans`, { replace: false })}>Активные баны</NavItem>
                    <NavItem onClick={() => navigate(`/g/${params.id}/warns`, { replace: false })}>Активные варны</NavItem>
                    <NavItem onClick={() => navigate(`/g/${params.id}/blocks`, { replace: false })}>Активные блокировки</NavItem>
                </NavBar>
                <MyButton type={"Navigate"} theme={theme} onClick={() => navigate("/dashboard", { replace: false })}>Обратно</MyButton>
            </nav>
            {mainBlock}
        </div>
    )
}

export default GuildPage;