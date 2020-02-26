let namespace = function() {
    var args = arguments; //函数内部args为参数长度
    for (var i = 0; i < args.length; i++) { //循环截取参数绑定到window上边
        var objs = args[i].split('.');
        var ctx = window;
        for (var j = 0; j < objs.length; j++) {
            ctx[objs[j]] = ctx[objs[j]] || {};
            ctx = ctx[objs[j]]
        }
    }
    return ctx;
};

// namespace("hello.base")//启动方式
export default namespace;