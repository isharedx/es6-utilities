function cookie(method, key, val = '') {
    switch (method) {
        case 'set':
            return setCookie(key, val);
        case 'get':
            return getCookie(key);
        case 'del':
            return delCookie(key);
        default:
            return false;
    }
}

function setCookie(key, val, time = 30) {
    var exp = new Date();
    exp.setTime(exp.getTime() + time * 24 * 60 * 60 * 1000);
    //创建cookie  并且设置生存周期为GMT时间
    return document.cookie = key + '=' + encodeURIComponent(window.JSON.stringify(value)) + ';expires=' + (time === undefined ? '' : exp.toGMTString());

    // return document.cookie = key + "=" + escape(val) + ";expires=" + exp.toGMTString();
}

function getCookie(key) {
    var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
    // return unescape(arr[2]);
        return window.JSON.parse(decodeURIComponent(arr[2]));
    else
        return null;
}

function delCookie(key) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var val = getCookie(key);
    if (val == null) return false;
    return document.cookie = key + "=" + val + ";expires=" + exp.toGMTString();
}

export default cookie;