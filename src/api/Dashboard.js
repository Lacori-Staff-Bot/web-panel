import { xhr, sendAPIRequest } from "./Main.js";
import { CLIENT_ID, MAIN_REDIRECT_URI } from "../assets/configs.js";
import stringToHash from "../subfunctions/stringToHash.js";

import GuildLogo from "../components/guildLogo/GuildLogo.jsx";
import replace from "../assets/replace.svg";

async function dashboard(cookie, key, removeCookies, navigate, setGuilds) {
    const hash = stringToHash(key);
    const data = { cookie, key: hash };
    await sendAPIRequest("POST", "/dashboard", data, (e) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const parsedGuilds = JSON.parse(xhr.response);
            for (const guild of parsedGuilds) {
                setGuilds(guilds => [...guilds, <GuildLogo onClick={() => {
                    if (guild.hasBot) {
                        navigate(`/g/${guild.id}`);
                    } else {
                        window.open(`https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&permissions=8&scope=bot+applications.commands&guild_id=${guild.id}&disable_guild_select=1&redirect_uri=${MAIN_REDIRECT_URI}/dashboard`);
                    }
                }} logo={guild.icon != null ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : replace} label={guild.name} notHaveBot={!guild.hasBot ? true : false} key={guild.id} />])
            }
        } else if (xhr.readyState === 4 && xhr.status === 501) {
            removeCookies("auth");
            removeCookies("key");
            navigate("/auth", { replace: true });
        }
    });
}

export default dashboard;