import { xhr, sendAPIRequest } from "./Main";
import stringToHash from "../subfunctions/stringToHash.js";

function logout(cookie, key, removeCookies, navigate) {
    if (!cookie) {
        navigate("/auth", { replace: true });
        return;
    }

    const hash = stringToHash(key);
    const data = { cookie, key: hash };
    sendAPIRequest("POST", "/logout", data, (ev) => {
        if (xhr.readyState === 4) {
            removeCookies("auth");
            removeCookies("key");
            navigate("/auth", { replace: true });
        }
    })
}

export default logout;