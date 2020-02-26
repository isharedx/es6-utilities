function isWindow(obj) {
    return obj != null && obj === obj.window;
}

function isString(str) {
    return typeof str === 'string';
}

function isNumeric(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

function isFunction(obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    return typeof obj === "function" && typeof obj.nodeType !== "number";
}

function isHtml(html) {
    if (typeof html !== 'string') return false;
    html = html.trim();
    return html.charAt(0) === '<' && html.charAt(html.length - 1) === '>' && html.length >= 3;
}

function isPlainObject(obj) {
    let proto, ctor;

    // Detect obvious negatives
    // Use toString instead of  Aui.type to catch host objects
    if (!obj || {}.toString.call(obj) !== "[object Object]") return false;

    proto = {}.getPrototypeOf(obj);

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) return true;

    // Objects with prototype are plain if they were constructed by a global Object function
    ctor = {}.hasOwnProperty.call(proto, "constructor") && proto.constructor;

    return typeof ctor === "function" && {}.hasOwnProperty.toString.call(ctor) === {}.hasOwnProperty.toString.call(Object);
}

function isEmpty(v) {
    switch (typeof v) {
        case 'undefined':
            return true;
        case 'string':
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
            break;
        case 'boolean':
            if (!v) return true;
            break;
        case 'number':
            if (0 === v || isNaN(v)) return true;
            break;
        case 'object':
            if (null === v || v.length === 0) return true;
            for (let i in v) return false;
            return true;
        default:
            return false;
    }
    return false;
}

/**
 *判断是否为 DOM 对象
 *
 * @param item
 * @returns {*}
 */
function isDOMObject(item) {
    // 首先判断是否支持 HTMLELement，如果支持，使用HTMLElement，如果不支持，通过判断DOM的特征，如果拥有这些特征说明就是ODM节点，特征使用的越多越准确
    return (typeof HTMLElement === 'function') ?
        (item instanceof HTMLElement) :
        (item && (typeof item === 'object') && (item.nodeType === 1) && (typeof item.nodeName === 'string'));
}


const type = (function() {
    let $class2type = {},
        classes = "Boolean Number String Function Array Date RegExp Object Error"
        .split(" ");
    // for (let i = 0, c = ''; i < classes.length, c = classes[i]; i++) {
    //     $class2type["[object " + c + "]"] = c.toLowerCase();
    // }
    classes.forEach((item) => {
        $class2type["[object " + item + "]"] = item.toLowerCase();
    });

    return function(obj) {
        // if (obj === null) return obj + "";
        if (obj == null) return String(obj);
        // Support: Android <=2.3 only (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
            // ? class2type[{}.toString.call(obj)] || "object"
            $class2type[{}.toString.call(obj)] || "object" :
            typeof obj;
    }
}());

function typeOf(obj) {
    return ((obj == null) ?
        String(obj) :
        (Object.prototype.toString.call(obj).replace(/\[object\s+(\w+)\]/i, "$1") || "object")
    ).toLowerCase();
}

/**
 * 依赖 type(obj)
 * @returns {((arg: any) => arg is Array<any>) | (function(*=): boolean)}
 */
let isArray = (function() {
    return Array.isArray || function(obj) {
        return type(obj) === "array";
    };
}());

/**
 * 依赖 isFunction(fn), isWindow(obj)
 */
function isArrayLike(obj) {
    // Support: real iOS 8.2 only (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    let length = !!obj && "length" in obj && obj.length,
        _type = type(obj);

    if (isFunction(obj) || isWindow(obj)) return false;

    return _type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj;
}

export default {
    isWindow,
    isString,
    isNumeric,
    isFunction,
    isHtml,
    isPlainObject,
    isEmpty,
    isDOMObject,
    type,
    typeOf,
    isArray,
    isArrayLike,
}