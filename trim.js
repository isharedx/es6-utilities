let trim = (String.prototype.trim && !String.prototype.trim.call("\uFEFF\xA0")) ?
    function(text) {
        return text == null ?
            "" :
            String.prototype.trim.call(text);
    } :
    String.prototype.trim = function(text) { // 上述两个方法不支持，使用自定义的方法，清空两边的空格或特殊字符
        return text == null ?
            "" :
            (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };

export default trim;