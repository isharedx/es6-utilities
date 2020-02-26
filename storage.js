function setStorage(key, val) {
    if (!window.localStorage) return false;

    return window.localStorage.setItem(key, window.JSON.stringify(value));
}

function getStorage(key) {
    if (!window.localStorage) return false;
    var json = window.localStorage.getItem(key);

    return window.JSON.parse(json);
}

function clearStorage() {
    return window.localStorage.clear();
}

function storage(method, key = '', val = null) {
    switch (method) {
        case 'set':
            return setStorage(key, val);
        case 'get':
            return getStorage(key);
        case 'clear':
            return clearStorage(key);
        default:
            return false;
    }
}

export default storage;