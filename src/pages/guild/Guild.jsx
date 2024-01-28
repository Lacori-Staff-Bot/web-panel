import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./Guild.css";
import { ThemeContext, NavigateContext } from "../../App";

import NavBar from "../../components/UI/navBar/NavBar";
import NavItem from "../../components/UI/navItem/navItem";
import MyButton from "../../components/UI/myButton/MyButton";

function GuildPage({ mainBlock }) {
    const theme = useContext(ThemeContext);

    const params = useParams();
    const navigate = useContext(NavigateContext);

    return (
        <div className={theme === "light" ? "Guild light" : "Guild dark"}>
            <nav>
                <NavBar theme={theme}>
                    <NavItem onClick={() => navigate(`/g/${params.id}`, { replace: false })}>Основные настройки</NavItem>
                    <NavItem onClick={() => navigate(`/g/${params.id}/restrictions`, { replace: false })}>Ограничения</NavItem>
                    <NavItem onClick={() => navigate(`/g/${params.id}/bans`, { replace: false })}>Активные баны</NavItem>
                    <NavItem onClick={() => navigate(`/g/${params.id}/warns`, { replace: false })}>Активные варны</NavItem>
                    <NavItem onClick={() => navigate(`/g/${params.id}/blocks`, { replace: false })}>Активные блокировки</NavItem>
                </NavBar>
                <MyButton type={"Navigate"} onClick={() => navigate("/dashboard", { replace: false })}>Обратно</MyButton>
            </nav>
            {mainBlock}
        </div>
    )
}

export default GuildPage;