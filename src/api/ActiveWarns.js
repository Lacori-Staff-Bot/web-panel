import { xhr, sendAPIRequest } from "./Main";
import stringToHash from "../subfunctions/stringToHash";

import Notify from "../UI/notify/Notify";

function activeWarns(cookie, key, params, type, id, setResponse, removeCookies, setNotify, navigate) {
    if (!cookie) {
        navigate("/auth", { replace: true });
        return;
    }

    const hash = stringToHash(key);
    const data = { cookie, key: hash, guildId: params.id, type, id };
    sendAPIRequest("POST", "/active_warns", data, (ev) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (type === "get_info") {
                    setResponse(JSON.parse(xhr.response));
                }
            } else if (xhr.status === 501) {
                removeCookies("auth");
                removeCookies("key")
                navigate("/auth", { replace: true });
            } else if (xhr.status === 502) {
                setNotify(<Notify label={"Ошибка"} type={"Error"} description={"Варн уже не является активным."} />)
            }
        }
    })
}

export default activeWarns;