import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { MAIN_REDIRECT_URI, CLIENT_ID } from "../../assets/configs.js";
import auth from "../../api/Auth.js";
import "./Auth.css";

import DiscordAuth from "../../UI/discordAuth/DiscordAuth.jsx";

function AuthPage({ cookies, setCookies }) {
    const [navigate, setNavigate] = useState(cookies.auth ? <Navigate to="/dashboard" replace={false} /> : null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            const queryParams = new URLSearchParams(window.location.search);
            const code = queryParams.get("code");
            var abc = "abcdefghijklmnopqrstuvwxyz0123456789";
            var key = "";
            for (let i = 0; i < 20; i++) {
                key += abc[Math.floor(Math.random() * abc.length)];
            }
            auth(code, key, setCookies, setNavigate);
            setIsLoaded(true);
        }
    }, [isLoaded, setCookies])

    return (
        <div className="Login">
            <DiscordAuth link={`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${MAIN_REDIRECT_URI}/auth&scope=identify+guilds`} />
            {navigate}
        </div>
    )
}

export default AuthPage;