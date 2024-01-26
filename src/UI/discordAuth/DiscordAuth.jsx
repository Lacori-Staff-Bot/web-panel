import React from "react";
import style from "./DiscordAuth.module.css";

import discordLogo from "../../assets/discordLogo.svg";

function DiscordAuth({link}) {
    return(
        <a href={link} className={style.discordAuth}><img src={discordLogo} alt="discordLogo" />Авторизация</a>
    )
}

export default DiscordAuth;