import { xhr, sendAPIRequest } from "./Main";
import stringToHash from "../subfunctions/stringToHash";

import Notify from "../components/UI/notify/Notify";

async function restrictions(cookie, key, id, type, setResponse, removeCookies, notify, setNotify, navigate, signalChannel, maxBans, maxMutes, maxWarns, maxPreds, permissions) {
    if (!cookie) {
        navigate("/auth", { replace: true });
        return;
    }

    const hash = stringToHash(key);
    const data = { cookie, key: hash, guildId: id, type, signalChannel, maxBans, maxMutes, maxWarns, maxPreds, permissions };
    sendAPIRequest("POST", "/restrictions", data, (e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (type === "get_info") {
                    setResponse(JSON.parse(xhr.response));
                } else if (type === "set_settings") {
                    setNotify(notify => [...notify, <Notify label={"Успешно"} type={"Success"} description={"Настройки обновлены."} key={notify.length} />]);
                }
            } else if (xhr.status === 501) {
                removeCookies("auth");
                removeCookies("key")
                navigate("/auth", { replace: true });
            } else if (xhr.status === 502) {
                setNotify(notify => [...notify, <Notify label={"Ошибка"} type={"Error"} description={"Изменение параметров не требуется, введёные данные идентичны с актуальными."} key={notify.length} />]);
            }
        }
    });
}

export default restrictions;