import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import activeBans from "../../../api/ActiveBans.js";
import { NavigateContext } from "../../../App.jsx";

import LoadingScreen from "../../../components/UI/loadingScreen/LoadingScreen";
import ActiveBlock from "../../../components/activeBlock/ActiveBlock";
import Nothink from "../../../components/UI/nothink/Nothink";

function ActiveBans({ cookies, removeCookies, notify, setNotify }) {
    const [bans, setBans] = useState([]);

    const [response, setResponse] = useState(null);
    const [blockBody, setBlockBody] = useState(<LoadingScreen />);

    const navigate = useContext(NavigateContext);
    const params = useParams();

    useEffect(() => {
        activeBans(cookies.auth, cookies.key, params.id, "get_info", undefined, setResponse, removeCookies, undefined, undefined, navigate);
    }, [cookies.auth, cookies.key, params.id, navigate, removeCookies, setNotify]);

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
                    activeBans(cookies.auth, cookies.key, params.id, "remove_ban", ban.id, undefined, removeCookies, notify, setNotify, navigate);
                    setBans(bans => bans.filter(b => b.id !== ban.id));
                }} target={ban.target} author={ban.author} reasone={ban.reasone} data={ban.data} key={ban.id} />]);
            }
        } else {
            setBlockBody(<Nothink />);
        }
    }, [cookies.auth, cookies.key, params.id, removeCookies, navigate, notify, setNotify, bans]);

    return (
        <div className="mainBlock">
            {blockBody}
        </div>
    )
}

export default ActiveBans;