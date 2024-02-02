import { xhr, sendAPIRequest } from "./Main";
import stringToHash from "../subfunctions/stringToHash";

import Notify from "../components/UI/notify/Notify";

async function mainSettings(cookie, key, id, type, setResponse, removeCookies, notify, setNotify, navigate, audit, male, female, preds) {
    if (!cookie) {
        navigate("/auth", { replace: true });
        return;
    }

    const hash = stringToHash(key);
    const data = { cookie, key: hash, guildId: id, type, audit, male, female, preds };
    sendAPIRequest("POST", "/main_settings", data, (e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (type === "get_info") {
                    setResponse(JSON.parse(xhr.response));
                } else if (type === "set_settings") {
                    setNotify(notify => [...notify, <Notify label={"Успешно"} type={"Success"} description={"Настройки обновлены."} key={notify.length} />]);
                }
            } else if (xhr.status === 501) {
                removeCookies("auth");
                removeCookies("key");
                navigate("/auth", { replace: true });
            } else if (xhr.status === 502) {
                setNotify(notify => [...notify, <Notify label={"Ошибка"} type={"Error"} description={"Изменение параметров не требуется, введёные данные идентичны с актуальными."} key={notify.length} />]);
            }
        }
    });
}

export default mainSettings;