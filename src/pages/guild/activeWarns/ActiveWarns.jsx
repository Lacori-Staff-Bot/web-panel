import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import activeWarns from "../../../api/ActiveWarns.js";

import LoadingScreen from "../../../UI/loadingScreen/LoadingScreen";
import ActiveBlock from "../../../UI/activeBlock/ActiveBlock";
import Nothink from "../../../UI/nothink/Nothink";


function ActiveWarns({ cookies, removeCookies, setNotify, theme }) {
    const [warns, setWarns] = useState([]);

    const [response, setResponse] = useState(null);
    const [blockBody, setBlockBody] = useState(<LoadingScreen />);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        activeWarns(cookies.auth, cookies.key, params, "get_info", undefined, setResponse, removeCookies, setNotify, navigate);
    }, []);

    useEffect(() => {
        if (response !== null) {
            setWarns(response.warns);
        }
    }, [response]);

    useEffect(() => {
        if (warns.length !== 0) {
            setBlockBody([]);
            for (const warn of warns) {
                setBlockBody(blockBody => [...blockBody, <ActiveBlock onClick={(ev) => {
                    activeWarns(cookies.auth, cookies.key, params, "remove_warn", warn.id, undefined, removeCookies, setNotify);
                    setWarns(warns => warns.filter(w => w.id !== warn.id));
                }} target={warn.target} author={warn.author} reasone={warn.reasone} data={warn.data} theme={theme} key={warn.id} />]);
            }
        } else {
            setBlockBody(<Nothink />);
        }
    }, [warns, theme]);

    return (
        <div className="mainBlock">
            {blockBody}
        </div>
    )
}

export default ActiveWarns;