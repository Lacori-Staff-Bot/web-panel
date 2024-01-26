function stringToHash(string) {

    let hash = 0;

    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash += char;
    }

    return hash.toString();
}

export default stringToHash;