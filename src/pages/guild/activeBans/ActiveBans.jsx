import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import activeBans from "../../../api/ActiveBans.js";

import LoadingScreen from "../../../UI/loadingScreen/LoadingScreen";
import ActiveBlock from "../../../UI/activeBlock/ActiveBlock";
import Nothink from "../../../UI/nothink/Nothink";


function ActiveBans({ cookies, removeCookies, setNotify, theme }) {
    const [bans, setBans] = useState([]);

    const [response, setResponse] = useState(null);
    const [blockBody, setBlockBody] = useState(<LoadingScreen />);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        activeBans(cookies.auth, cookies.key, params, "get_info", undefined, setResponse, removeCookies, setNotify, navigate);
    }, []);

    useEffect(() => {
        if (response !== null) {
            setBans(response.bans);
        }
    }, [response]);

    useEffect(() => {
        if (bans.length !== 0) {
            setBlockBody([]);
            for (const ban of bans) {
                setBlockBody(blockBody => [...blockBody, <ActiveBlock onClick={(ev) => {
                    activeBans(cookies.auth, cookies.key, params, "remove_ban", ban.id, undefined, removeCookies, setNotify);
                    setBans(bans => bans.filter(b => b.id !== ban.id));
                }} target={ban.target} author={ban.author} reasone={ban.reasone} data={ban.data} theme={theme} key={ban.id} />]);
            }
        } else {
            setBlockBody(<Nothink />);
        }
    }, [bans, theme]);

    return (
        <div className="mainBlock">
            {blockBody}
        </div>
    )
}

export default ActiveBans;