import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mainSettings from "../../../api/MainSettings.js";
import { NavigateContext } from "../../../App.jsx";

import Label from "../../../components/UI/label/Label";
import Selector from "../../../components/UI/selectorMenu/Selector";
import MyButton from "../../../components/UI/myButton/MyButton";
import LoadingScreen from "../../../components/UI/loadingScreen/LoadingScreen";
import Notify from "../../../components/UI/notify/Notify";

function MainSettings({ cookies, removeCookies, notify, setNotify }) {
    const [audit, setAudit] = useState(0);
    const [male, setMale] = useState(0);
    const [female, setFemale] = useState(0);
    const [preds, setPreds] = useState(0);

    const [response, setResponse] = useState(null);

    const navigate = useContext(NavigateContext);
    const params = useParams();

    useEffect(() => {
        mainSettings(cookies.auth, cookies.key, params.id, "get_info", setResponse, removeCookies, undefined, undefined, navigate);
    }, [cookies.auth, cookies.key, navigate, params.id, removeCookies]);

    useEffect(() => {
        if (response !== null) {
            setAudit(response.currentAudit !== null ? response.currentAudit : 0);
            setMale(response.currentMale !== null ? response.currentMale : 0);
            setFemale(response.currentFemale !== null ? response.currentFemale : 0);
            setPreds(response.currentPreds !== null ? response.currentPreds : 0);
        }
    }, [response]);

    return (
        <div className="mainBlock">
            {response !== null ? (<>
                <div className="block" key={"audit"}>
                    <Label>Система аудита</Label>
                    <Selector onChange={(ev) => {
                        setAudit(ev.currentTarget.value);
                    }} variants={response.channels} name={"Канал не выбран"} value={audit}>Канал аудита:</Selector>
                </div>
                <div className="block" key={"gender_roles"}>
                    <Label>Система гендр ролей</Label>
                    <Selector onChange={(ev) => {
                        setMale(ev.currentTarget.value);
                    }} variants={response.roles} name={"Роль не выбрана"} value={male}>Мужская роль:</Selector>
                    <Selector onChange={(ev) => {
                        setFemale(ev.currentTarget.value);
                    }} variants={response.roles} name={"Роль не выбрана"} value={female}>Женская роль:</Selector>
                </div>
                <div className="block" key={"preds"}>
                    <Label>Система предупреждений</Label>
                    <Selector onChange={(ev) => {
                        setPreds(ev.currentTarget.value);
                    }} variants={response.channels} name={"Канал не выбран"} value={preds}>Канал предупреждений:</Selector>
                </div>
                <div className="saveButtonBlock" key={"save_button"}>
                    <MyButton onClick={() => {
                        if (male !== 0) {
                            if (female === 0) {
                                setNotify(notify => [...notify, <Notify label={"Ошибка"} type={"Error"} description={"Чтобы активировать систему гендр ролей укажите две роли."} key={notify.length} />]);
                                return;
                            }
                            if (male === female) {
                                setNotify(notify => [...notify, <Notify label={"Ошибка"} type={"Error"} description={"Гендр роли не должны совпадать."} key={notify.length} />]);
                                return;
                            }
                        }
                        if (female !== 0) {
                            if (male === 0) {
                                setNotify(notify => [...notify, <Notify label={"Ошибка"} type={"Error"} description={"Чтобы активировать систему гендр ролей укажите две роли."} key={notify.length} />]);
                                return;
                            }
                        }

                        if (!cookies.auth) {
                            navigate("/auth", { replace: true });
                            return;
                        }
                        mainSettings(cookies.auth, cookies.key, params.id, "set_settings", undefined, removeCookies, notify, setNotify, navigate, audit, male, female, preds);
                    }} type={"Save"}>Сохранить</MyButton>
                </div>
            </>) : <LoadingScreen />}
        </div>
    )
}

export default MainSettings;