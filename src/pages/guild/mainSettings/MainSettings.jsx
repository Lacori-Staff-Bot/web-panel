import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mainSettings from "../../../api/MainSettings.js";

import Label from "../../../UI/label/Label.jsx";
import Selector from "../../../UI/selectorMenu/Selector.jsx";
import MyButton from "../../../UI/myButton/MyButton.jsx";
import LoadingScreen from "../../../UI/loadingScreen/LoadingScreen.jsx";
import Notify from "../../../UI/notify/Notify.jsx";

function MainSettings({ cookies, removeCookies, setNotify }) {
    const [audit, setAudit] = useState(0);
    const [male, setMale] = useState(0);
    const [female, setFemale] = useState(0);
    const [preds, setPreds] = useState(0);
    
    const [response, setResponse] = useState(null);
    const [blockBody, setBlockBody] = useState(<LoadingScreen />);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        mainSettings(cookies.auth, cookies.key, params, "get_info", setResponse, removeCookies, undefined, navigate);
    }, []);

    useEffect(() => {
        if (response !== null) {
            setAudit(response.currentAudit !== null ? response.currentAudit : 0);
            setMale(response.currentMale !== null ? response.currentMale : 0);
            setFemale(response.currentFemale !== null ? response.currentFemale : 0);
            setPreds(response.currentPreds !== null ? response.currentPreds : 0);
        }
    }, [response]);

    useEffect(() => {
        if (response !== null) {
            setBlockBody([
                <div className="block" key={"audit"}>
                    <Label>Система аудита</Label>
                    <Selector onChange={(ev) => {
                        setAudit(ev.currentTarget.value);
                    }} variants={response.channels} name={"Канал не выбран"} value={audit}>Канал аудита:</Selector>
                </div>,
                <div className="block" key={"gender_roles"}>
                    <Label>Система гендр ролей</Label>
                    <Selector onChange={(ev) => {
                        setMale(ev.currentTarget.value);
                    }} variants={response.roles} name={"Роль не выбрана"} value={male}>Мужская роль:</Selector>
                    <Selector onChange={(ev) => {
                        setFemale(ev.currentTarget.value);
                    }} variants={response.roles} name={"Роль не выбрана"} value={female}>Женская роль:</Selector>
                </div>,
                <div className="block" key={"preds"}>
                    <Label>Система предупреждений</Label>
                    <Selector onChange={(ev) => {
                        setPreds(ev.currentTarget.value);
                    }} variants={response.channels} name={"Канал не выбран"} value={preds}>Канал предупреждений:</Selector>
                </div>,
                <div className="saveButtonBlock" key={"save_button"}>
                    <MyButton onClick={() => {
                        if (male !== "0") {
                            if (female === "0") {
                                setNotify(<Notify label={"Ошибка"} type={"Error"} description={"Чтобы активировать систему гендр ролей укажите две роли."} />);
                                return;
                            }
                            if (male === female) {
                                setNotify(<Notify label={"Ошибка"} type={"Error"} description={"Гендр роли не должны совпадать."} />);
                                return;
                            }
                        }
                        if (female !== "0") {
                            if (male === "0") {
                                setNotify(<Notify label={"Ошибка"} type={"Error"} description={"Чтобы активировать систему гендр ролей укажите две роли."} />);
                                return;
                            }
                        }

                        if (!cookies.auth) {
                            navigate("/auth", { replace: true });
                            return;
                        }
                        mainSettings(cookies.auth, cookies.key, params, "set_settings", undefined, removeCookies, setNotify, navigate, audit, male, female, preds);
                    }} type={"Save"}>Сохранить</MyButton>
                </div>
            ]);
        }
    }, [audit, male, female, preds]);

    return (
        <div className="mainBlock">
            {blockBody}
        </div>
    )
}

export default MainSettings;