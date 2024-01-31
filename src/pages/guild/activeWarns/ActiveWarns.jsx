import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import activeWarns from "../../../api/ActiveWarns.js";
import { NavigateContext } from "../../../App.jsx";

import LoadingScreen from "../../../components/UI/loadingScreen/LoadingScreen";
import ActiveBlock from "../../../components/activeBlock/ActiveBlock";
import Nothink from "../../../components/UI/nothink/Nothink";


function ActiveWarns({ cookies, removeCookies, notify, setNotify }) {
    const [warns, setWarns] = useState([]);

    const [response, setResponse] = useState(null);
    const [blockBody, setBlockBody] = useState(<LoadingScreen />);

    const navigate = useContext(NavigateContext);
    const params = useParams();

    useEffect(() => {
        activeWarns(cookies.auth, cookies.key, params.id, "get_info", undefined, setResponse, removeCookies, undefined, undefined, navigate);
    }, [cookies.auth, cookies.key, params.id, removeCookies, navigate, notify, setNotify]);

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
                    activeWarns(cookies.auth, cookies.key, params.id, "remove_warn", warn.id, undefined, removeCookies, notify, setNotify, navigate);
                    setWarns(warns => warns.filter(w => w.id !== warn.id));
                }} target={warn.target} author={warn.author} reasone={warn.reasone} data={warn.data} key={warn.id} />]);
            }
        } else {
            setBlockBody(<Nothink />);
        }
    }, [cookies.auth, cookies.key, params.id, removeCookies, notify, setNotify, navigate, warns]);

    return (
        <div className="mainBlock">
            {blockBody}
        </div>
    )
}

export default ActiveWarns;