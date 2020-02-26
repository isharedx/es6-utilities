//是否存在类
function hasClass(element, cName) {
    if (!element) {
        return false
    } else if (element.classList && typeof element.classList.contains === "function") {
        return element.classList.contains(className);
    } else if (element.className) {
        return !!element.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
    }
}

// 添加类
function addClass(element, classNames) {
    if (typeof classNames === "string") classNames = [classNames];
    if (!element) return false;

    for (var i = 0, c; i < classNames.length; i++) {
        if (!(c = classNames[i])) continue;

        if (element.classList) {
            element.classList.add(c);
        } else if (element.className && !hasClass(element, classNames)) {
            element.className += " " + c;
        }
    }
}

//删除类
function delClass(element, classNames) {
    if (typeof classNames === "string") classNames = [classNames];
    if (!element) return false;

    for (var i = 0, c; i < classNames.length; i++) {
        if (!(c = classNames[i]) || typeof c !== 'string') continue;

        if (element.classList) {
            element.classList.remove(c);
        } else if (element.className && hasClass(element, c)) {
            element.className = elements.className.replace(new RegExp("(\\s|^)" + c + "(\\s|$)"), ""); // replace方法是替换
        }
    }
}

function loadScript(url, callback, options = false) {
    if (typeof url === "string") url = [url];
    var load = function(src) {
        var script = document.createElement("script");
        if (callback) {
            if (script.readyState) {
                script.onreadystatechange = function() {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        if (--n === 0) callback(options);
                    }
                }
            } else {
                script.onload = function() {
                    if (--n === 0) callback(options);
                }
            }
        }
        script.src = src;
        document.getElementsByTagName("head")[0].appendChild(script);
    };
    for (var i = 0, n = url.length; i < n; i++) load(url[i]);
}

const setInnerHTML = (function() {
    /*
     * 描述：跨浏览器的设置 innerHTML 方法
     * 允许插入的 HTML 代码中包含 script 和 style
     * 参数：
     *   elm: DOM 树中的节点，设置它的 innerHTML
     *   html: 插入的 HTML 代码
     * 经测试的浏览器：ie5+, firefox1.5+, opera8.5+
     */
    function setInnerHTML(elm, html) {
        let ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('msie') >= 0 && ua.indexOf('opera') < 0) {
            html = '<div style="display:none">for IE</div>' + html;
            html = html.replace(/<script([^>]*)>/gi, '<script$1 defer="true">');
            elm.innerHTML = html;
            elm.removeChild(elm.firstChild);
        } else {
            let nextSibling = elm.nextSibling;
            let parentNode = elm.parentNode;
            parentNode.removeChild(elm);
            elm.innerHTML = html;
            if (nextSibling)
                parentNode.insertBefore(elm, nextSibling)
            else
                parentNode.appendChild(elm);
        }
    };
    /*
    描述：重定义 document.write 函数.
    避免在使用 setInnerHTML 时，插入的 HTML 代码中包含 document.write 语句，导致原页面受到破坏。
    */
    document.write = function() {
        let body = document.getElementsByTagName('body')[0];
        for (let i = 0; i < arguments.length; i++) {
            let arg = arguments[i];
            if (typeof argument == 'string') {
                let elm = body.appendChild(document.createElement('div'));
                setInnerHTML(elm, arg);
            }
        }
    }

    return setInnerHTML;
}());

export default {
    hasClass,
    addClass,
    delClass,
    loadScript,
    setInnerHTML,
}