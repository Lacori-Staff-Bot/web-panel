import { xhr, sendAPIRequest } from "./Main";
import stringToHash from "../subfunctions/stringToHash";

import Notify from "../UI/notify/Notify";

async function mainSettings(cookie, key, params, type, setResponse, removeCookies, setNotify, navigate, audit, male, female, preds) {
    if (!cookie) {
        navigate("/auth", { replace: true });
        return;
    }

    const hash = stringToHash(key);
    const data = { cookie, key: hash, guildId: params.id, type, audit, male, female, preds };
    sendAPIRequest("POST", "/main_settings", data, (e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (type === "get_info") {
                    setResponse(JSON.parse(xhr.response));
                } else if (type === "set_settings") {
                    setNotify(<Notify label={"Успешно"} type={"Success"} description={"Настройки обновлены."} />)
                }
            } else if (xhr.status === 501) {
                removeCookies("auth");
                removeCookies("key");
                navigate("/auth", { replace: true });
            } else if (xhr.status === 502) {
                setNotify(<Notify label={"Ошибка"} type={"Error"} description={"Изменение параметров не требуется, введёные данные идентичны с актуальными."} />)
            }
        }
    });
}

export default mainSettings;