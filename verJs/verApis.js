/**
 * 原生前后端分离请求接口参数API
 * @type {apis}
 */
window.verApis = (function () {
    var apis = function () {
        this.token = "rT9TZRaGbKBfuAu"; //通讯token
        this.uri = "//www.yum.com/api.php"; //请求链接
        this.format = "json"; //传输方式
        this.data = {}; //传输参数
        this.method = ""; //接口连接
        this.sign_chat = "md5"; //加密方式
        this.type = "post"; //提交方式
        this.async = true;
        this.success = function (data) {
            //成功回调
        };
        this.fail = function (data) {
            //失败回调
        }
    };

    apis.prototype = {
        init: function (params) {
            if (params.format) this.format = params.format;
            if (params.method) this.method = params.method;
            if (params.data) this.data = params.data;
            if (params.sign_chat) this.sign_chat = params.sign_chat;
            if (params.uri) this.uri = params.uri;
            if (params.token) this.token = params.token;
            if (params.type) this.type = params.type;
            if (params.success) this.success = params.success;
            if (params.fail) this.fail = params.fail;
            if (params.async) this.async = false;
            this._api_data();
        },
        _api_data: function () {
            var data = this.get_data();
            this.type = this.type.toUpperCase();
            var _self = this;
            var xhr = new XMLHttpRequest();
            xhr.open(_self.type, _self.uri, this.async);
            xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 203) {
                        return false;
                    } else if (xhr.status == 200 || xhr.status == 304) {
                        _self.success(xhr.responseText);
                    } else {
                        _self.fail(xhr.responseText);
                    }
                }
            };
            xhr.send(data);
        },
        get_data: function () {
            //传参整理
            var data = {
                header: {
                    method: this.method,
                    time: this.times(),
                    sign: this.get_sign(),
                    base: this.sign_chat,
                    format: this.format
                },
                body: this.data
            };
            return JSON.stringify(data);
        },
        get_sign: function () {
            var data = this.keySort(this.data);
            if (this.sign_chat == "md5") {
                return hex_md5((data + this.token));
            }
        },
        keySort: function (data) {
            try {
                var newkey = Object.keys(data).sort();
                var newsValue = '';
                for (var i in newkey) {
                    var ks = data[newkey[i]].toString();
                    if (this.validateHtmlTag(ks)) {
                        ks = ks.replace(/<[^>]+>/g, "");
                    }
                    var cn = ks.match(/[\u4e00-\u9fa5]+/g);
                    if (cn) {
                        ks = encodeURIComponent(ks);
                    }
                    if (ks.length > 1 && ks.length < 180) {
                        newsValue += newkey[i] + ks;
                    }
                }
                return newsValue;
            } catch (e) {
                return e;
            }

        },
        times: function (type) {
            if (type == "timestmp") return (new Date()).valueOf();
            var t = new Date(),
                year = t.getFullYear(),
                month = t.getMonth() + 1,
                day = t.getDate(),
                hours = t.getHours(),
                min = t.getMinutes(),
                sec = t.getSeconds();

            switch (type) {
                case "Time":
                    return (hours < 10 ? "0" + hours : hours) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
                    break;
                case "Date":
                    return year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
                    break;
                default:
                    return year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day) + " " + (hours < 10 ? "0" + hours : hours) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
                    break;
            }
        },
        validateHtmlTag: function (str) {
            var reg = /<(?:(?:\/?[A-Za-z]\w*\b(?:[=\s](['"]?)[\s\S]*?\1)*)|(?:!--[\s\S]*?--))\/?>/g;//验证规则
            return str.match(reg);
        }

    };
    return apis;
})();