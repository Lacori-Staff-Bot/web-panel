import { API_URL } from "../assets/configs";
export const xhr = new XMLHttpRequest();

export async function sendAPIRequest(method, path, data, callback) {
    xhr.open(method, API_URL+path, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = callback;
    xhr.send(JSON.stringify(data));
}