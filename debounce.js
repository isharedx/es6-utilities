/**
 * 防抖函数
 * @param func 事件触发的操作
 * @param wait 多少毫秒内连续触发事件，不会执行
 * @param immediate 是否立即执行
 * @returns {Function}
 */
function debounce(func, wait, immediate = false) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;

        if (immediate && !timeout)
            func.apply(context, args);

        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        }, wait);
    };
}

export default debounce;