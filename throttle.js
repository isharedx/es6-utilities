/**
 * 节流throttle代码（时间戳+定时器）
 * @param func 事件触发的操作
 * @param must 多少毫秒内触发事件，必会执行
 * @param delay 多少毫秒内连续触发事件，不会执行
 */
function throttle(func, must, delay = 0) {
    var timeout = null,
        prevTime = Date.now();

    return function() {
        var context = this,
            args = arguments,
            currTime = new Date(),
            remaining = delay - (currTime - prevTime);

        clearTimeout(timeout);
        // 如果达到了规定的触发时间间隔，触发 handler
        if ((remaining <= 0) || (currTime - prevTime >= must)) {
            func.apply(context, args);
            prevTime = Date.now();
            // 没达到触发间隔，重新设定定时器
        } else {
            timeout = setTimeout(func, wait);
        }
    };
}

export default throttle;