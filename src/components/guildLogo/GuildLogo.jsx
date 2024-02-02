import React from "react";
import style from "./GuildLogo.module.css";

function GuildLogo({ logo, label, onClick, notHaveBot }) {
    return (
        <div className={style.GuildLogo} onClick={onClick}>
            <div className={style.guild}>
                <img src={logo} alt={label} />
                <p className={style.label}>{label}</p>
            </div>
            {notHaveBot === true ? <p className={style.notHave}>Бот отсутствует</p> : <p className={[style.notHave, style.notHaveHidden].join(" ")}>Бот отсутствует</p>}
        </div>
    )
}

export default GuildLogo;