import React, { useContext, useEffect, useState } from "react";
import { MAIN_REDIRECT_URI, CLIENT_ID } from "../../assets/configs.js";
import auth from "../../api/Auth.js";
import "./Auth.css";
import { NavigateContext } from "../../App.jsx";

import DiscordAuth from "../../components/discordAuth/DiscordAuth.jsx";

function AuthPage({ setCookies }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useContext(NavigateContext);

    useEffect(() => {
        if (!isLoaded) {
            const queryParams = new URLSearchParams(window.location.search);
            const code = queryParams.get("code");
            var abc = "abcdefghijklmnopqrstuvwxyz0123456789";
            var key = "";
            for (let i = 0; i < Math.floor(Math.random() * 16 + 15); i++) {
                key += abc[Math.floor(Math.random() * abc.length)];
            }
            auth(code, key, setCookies, navigate);
            setIsLoaded(true);
        }
    }, [isLoaded, setCookies, navigate])

    return (
        <div className="Login">
            <DiscordAuth link={`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${MAIN_REDIRECT_URI}/auth&scope=identify+guilds`} />
        </div>
    )
}

export default AuthPage;