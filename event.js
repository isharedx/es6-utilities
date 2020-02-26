//绑定事件
function addHandler(elm, types, handler) {
    if (!elm || !types || typeof types !== 'string') return false;
    var events = types.split(',');
    for (var i = 0; i < events.length; i++) {
        + function() {
            var e = events[i];
            switch (e) {
                case 'hover':
                    addHandler(elm, 'mouseover,mouseout', handler);
                    break;
                case '':
                    break;
                default:
                    if (elm.addEventListener) {
                        elm.addEventListener(e, handler, false);
                    } else if (elm.attachEvent) {
                        elm.attachEvent('on' + e, handler);
                    } else {
                        elm['on' + e] = handler;
                    }
            }
        }();
    }
    return elm;
}

//移除事件
function delHandler(elm, types, handler) {
    if (!elm || !types || typeof types !== 'string') return false;
    var events = types.split(',');
    for (var i = 0; i < events.length; i++) {
        + function() {
            var e = events[i];
            switch (e) {
                case 'hover':
                    delHandler(elm, 'mouseover,mouseout', handler);
                    break;
                case '':
                    break;
                default:
                    if (elm.removeEventListener) {
                        elm.removeEventListener(e, handler, false);
                    } else if (elm.detachEvent) {
                        elm.detachEvent('on' + e, handler);
                    } else {
                        elm['on' + e] = null;
                    }
            }
        }();
    }
    return elm;
}

//阻止冒泡
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

//阻止默认事件
function preventDefault(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        window.event.returnValue = false;
    }
}

//获取点击的DOM对象
function getTarget(event) {
    if (event.target) {
        return event.target;
    } else {
        return window.event.srcElement;
    }
}

//获取事件
function getEvent(event) {
    return event ? event : window.event;
}

export default {
    addHandler,
    delHandler,
    stopBubble,
    preventDefault,
    getTarget,
    getEvent,
}