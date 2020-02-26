function setSession(key, val) {
    if (!window.sessionStorage) return false;
    return window.sessionStorage.setItem(key, window.JSON.stringify(val));
}

function getSession(key) {
    if (!window.sessionStorage) return false;
    var json = window.sessionStorage.getItem(key);
    return window.JSON.parse(json);
}

function clearSession() {
    return window.sessionStorage.clear();
}

function session(method, key = '', val = null) {
    switch (method) {
        case 'set':
            return setSession(key, val);
        case 'get':
            return getSession(key);
        case 'clear':
            return clearSession(key);
        default:
            return false;
    }
}

export default session;