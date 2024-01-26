import { Navigate } from "react-router-dom";
import stringToHash from "../subfunctions/stringToHash.js";
import { xhr, sendAPIRequest } from "./Main.js";

async function auth(code, key, setCookies, setNavigate) {
    if (code) {
        var hash = stringToHash(key);
        var data = { code, key: hash };
        await sendAPIRequest("POST", "/auth", data, (e) => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                setCookies("auth", JSON.parse(xhr.response).cookie, { maxAge: 7 * 24 * 60 * 60 });
                setCookies("key", key, { maxAge: 7 * 24 * 60 * 60 });
                setNavigate(<Navigate to="/dashboard" replace={false} />)
            }
        });
    }
}

export default auth;