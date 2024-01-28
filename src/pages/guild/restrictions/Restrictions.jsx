import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import restrictions from "../../../api/Restrictions.js";
import { NavigateContext } from "../../../App.jsx";

import Label from "../../../components/UI/label/Label";
import LoadingScreen from "../../../components/UI/loadingScreen/LoadingScreen";
import Selector from "../../../components/UI/selectorMenu/Selector";
import Range from "../../../components/UI/range/Range";
import SwitchLine from "../../../components/switchLine/SwitchLine";
import MyButton from "../../../components/UI/myButton/MyButton";
import Notify from "../../../components/UI/notify/Notify";

function Restrictions({ cookies, removeCookies, setNotify }) {
    const [signalChannel, setSignalChannel] = useState(0);
    const [maxBans, setMaxBans] = useState(0);
    const [maxMutes, setMaxMutes] = useState(0);
    const [maxWarns, setMaxWarns] = useState(0);
    const [maxPreds, setMaxPreds] = useState(0);
    const [permissions, setPermissions] = useState([]);

    const [response, setResponse] = useState(null);
    const [blockBody, setBlockBody] = useState(<LoadingScreen />);

    const navigate = useContext(NavigateContext);
    const params = useParams();

    useEffect(() => {
        restrictions(cookies.auth, cookies.key, params, "get_info", setResponse, removeCookies, setNotify, navigate);
    }, [navigate, setResponse, params, cookies, removeCookies, setNotify]);

    useEffect(() => {
        if (response !== null) {
            setSignalChannel(response.signalChannel !== null ? response.signalChannel : 0);
            setMaxBans(response.maxBans !== null ? response.maxBans : 0);
            setMaxMutes(response.maxMutes !== null ? response.maxMutes : 0);
            setMaxWarns(response.maxWarns !== null ? response.maxWarns : 0);
            setMaxPreds(response.maxPreds !== null ? response.maxPreds : 0);
            setPermissions([]);
            for (const role of response.roles) {
                setPermissions(permissions => [...permissions, { id: role.id, name: role.name, selected: role.selected }]);
            }
        }
    }, [response]);

    useEffect(() => {
        if (response !== null) {
            setBlockBody([
                <div className="block" key={"settings"}>
                    <Label>Настройка системы ограничений</Label>
                    <Selector onChange={(ev) => {
                        setSignalChannel(ev.currentTarget.value);
                    }} multiple={false} variants={response.channels} name={"Канал не выбран"} value={signalChannel}>Сигнальный канал:</Selector>
                    <Range min={0} max={10} step={1} value={maxBans} onChange={(ev) => {
                        setMaxBans(ev.currentTarget.value);
                    }}>Максимальное количество банов:</Range>
                    <Range min={0} max={15} step={1} value={maxMutes} onChange={(ev) => {
                        setMaxMutes(ev.currentTarget.value);
                    }}>Максимальное количество мутов:</Range>
                    <Range min={0} max={15} step={1} value={maxWarns} onChange={(ev) => {
                        setMaxWarns(ev.currentTarget.value);
                    }}>Максимальное количество варнов:</Range>
                    <Range min={0} max={20} step={1} value={maxPreds} onChange={(ev) => {
                        setMaxPreds(ev.currentTarget.value);
                    }}>Максимальное количество предов:</Range>
                </div>,
                <div className="block" key={"permissions"}>
                    <Label>Роли с правом на обход системы ограничений</Label>
                    {permissions.map(permission => (
                        <SwitchLine onChange={(ev) => {
                            permission.selected = ev.currentTarget.checked;
                            setPermissions(permissions => [...permissions]);
                        }} checked={permission.selected} key={permission.id}>{permission.name}</SwitchLine>
                    ))}
                </div>,
                <div className="saveButtonBlock" key={"save_button"}>
                    <MyButton onClick={(ev) => {
                        if (!(0 <= maxBans && maxBans <= 10)) {
                            setNotify(<Notify label={"Ошибка"} type={"Error"} description={"Максимальное количество банов должно быть в диапазоне от 0 до 10."} />)
                        }
                        if (!(0 <= maxMutes && maxMutes <= 15)) {
                            setNotify(<Notify label={"Ошибка"} type={"Error"} description={"Максимальное количество мутов должно быть в диапазоне от 0 до 15."} />)
                        }
                        if (!(0 <= maxWarns && maxWarns <= 15)) {
                            setNotify(<Notify label={"Ошибка"} type={"Error"} description={"Максимальное количество варнов должно быть в диапазоне от 0 до 15."} />)
                        }
                        if (!(0 <= maxPreds && maxPreds <= 20)) {
                            setNotify(<Notify label={"Ошибка"} type={"Error"} description={"Максимальное количество предов должно быть в диапазоне от 0 до 20."} />)
                        }

                        var parsedPermissions = [];
                        for (const permission of permissions) {
                            if (permission.selected) parsedPermissions.push(permission.id);
                        }
                        restrictions(cookies.auth, cookies.key, params, "set_settings", undefined, removeCookies, setNotify, navigate, signalChannel, maxBans, maxMutes, maxWarns, maxPreds, parsedPermissions)
                    }} type={"Save"}>Сохранить</MyButton>
                </div>
            ]);
        }
    }, [cookies, navigate, params, removeCookies, response, setNotify, signalChannel, maxBans, maxMutes, maxWarns, maxPreds, permissions]);

    return (
        <div className="mainBlock">
            {blockBody}
        </div>
    )
}

export default Restrictions;