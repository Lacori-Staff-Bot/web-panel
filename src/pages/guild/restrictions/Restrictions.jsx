import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Label from "../../../UI/label/Label";
import LoadingScreen from "../../../UI/loadingScreen/LoadingScreen";
import Notify from "../../../UI/notify/Notify";

function Restrictions({ cookies, removeCookies, setNotify }) {
    const [signalChannel, setSignalChannel] = useState(0);
    const [maxBans, setMaxBans] = useState(0);
    const [maxMutes, setMaxMutes] = useState(0);
    const [maxWarns, setMaxWarns] = useState(0);
    const [maxPreds, setMaxPreds] = useState(0);
    const [permissions, setPermissions] = useState([]);

    const [response, setResponse] = useState(null);
    const [blockBody, setBlockBody] = useState(<LoadingScreen />);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (response !== null) {
            setSignalChannel(response.signalChannel !== null ? response.signalChannel : 0);
            setMaxBans(response.maxBans !== null ? response.maxBans : 0);
            setMaxMutes(response.maxMutes !== null ? response.maxMutes : 0);
            setMaxWarns(response.maxWarns !== null ? response.maxWarns : 0);
            setMaxPreds(response.maxPreds !== null ? response.maxPreds : 0);
        }
    }, [response]);

    useEffect(() => {
        if (response !== null) {
            setBlockBody([
                <div className="block" key={"settings"}>
                    <Label>Настройка системы ограничений</Label>
                    
                </div>
            ]);
        }
    }, [signalChannel, maxBans, maxMutes, maxWarns, maxPreds]);

    return (
        <div className="mainBlock">
            {blockBody}
        </div>
    )
}

export default Restrictions;