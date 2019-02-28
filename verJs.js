/**
 * @version V1.0.2
 * @author 搬砖的小白
 * @date 2018-08-25 17:48
 * @name VerJs
 * @remark verjs是一款原生js代码编写的表单验证插件，提供了常用的10种表单验证方式，包括身份证号码验证、手机电话号码、电子邮箱验证、必填字段验证、正则自定义验证、多次对比验证、最大值/最小值验证……，后续功能正在开发中敬请期待
 */
window.VerJs = (function () {
    var ver = function () {
        this.form;
        this.token = "";
        this.messages = {
            required: "当前选项不能为空！",
            min: 0,
            max: 0,
            minlength: 0,
            maxlength: 0,
            rule: "",
            equal: "",
            mobile: "请输入有效的手机号码",
            email: "请输入规则的电子邮箱",
            idcard: "请输入有效的身份证号码"
        };
        this.change;
        this.linkName = "asset/need";
        this.error = function (errorMessage, target) {
            this.clear_error(target);
            var block = target.getAttribute("data-block");
            target.classList.add("ver-error-input");
            var errorTag = document.createElement("span");
            if (!block) {
                var iconCarets = document.createElement("i");
                iconCarets.className = "verJsFont ver-icon-carets ver-error-caret";
                errorTag.appendChild(iconCarets);
                errorTag.className = "ver-errors";
            } else {
                errorTag.className = "ver-errors ver-errorMessageBlock";
            }
            var iconInfo = document.createElement("i");
            iconInfo.className = "verJsFont icon-info-o";
            errorTag.appendChild(iconInfo);
            var span = document.createElement("span");
            span.innerText = errorMessage;
            errorTag.appendChild(span);
            this.insertAfter(errorTag, target);
            var iconcolor = target.getAttribute("data-icon-color");
            if (iconcolor) {
                var parent = (target.offsetParent);
                var iconcirle = parent.querySelector("iconcirle");
                iconcirle.classList.add("ver-error-inputs")
            }
        };
        this.insertAfter = function (newElement, targentElement) {
            var parent = targentElement.parentNode;
            if (parent.lastChild == targentElement) {
                parent.appendChild(newElement);
            } else {
                parent.insertBefore(newElement, targentElement.nextSibling);
            }
        };
        this.styles = function () {
            var css = document.createElement("link"),
                icon = document.createElement("link");
            css.href = this.getPath + "need/common.css?v=1.0.2&$_=" + Math.random();
            icon.href = this.getPath + "need/vericon.css?v=1.0.2&$_=" + Math.random();
            css.rel = icon.rel = "stylesheet";
            css.type = icon.type = "text/css";
            var link = document.getElementsByTagName("head")[0];
            link.appendChild(css);
            link.appendChild(icon);
        };
        this.success = function (data) {
            console.log(data);
        };
        this.fail = function (data) {
            console.log(data);
        }
        this.signBase = "md5";
        this.format = "json";
    };
    ver.prototype = {
        getPath:function(){
            var jsPath = document.currentScript ? document.currentScript.src : function(){
                var js = document.scripts
                    ,last = js.length - 1
                    ,src;
                for(var i = last; i > 0; i--){
                    if(js[i].readyState === 'interactive'){
                        src = js[i].src;
                        break;
                    }
                }
                return src || js[last].src;
            }();
            return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
        }(),
        init: function (params) {
            var _self = this;
            this.styles();
            this.form = document.querySelector(params.form);
            if (!this.form) this.form = document.querySelector("form");
            this.change = params.change ? params.change : "default";
            this._sef_data(params.data, params.message);
            this.form.onsubmit = function () {
                return _self.submit();
            };
            this.form.onreset = function () {
                return _self.reset();
            }
            if (params.success) {
                this.success = params.success;
            }
            if (params.fail) {
                this.fail = params.fail;
            }

            if (params.api) {
                this.api = params.api;
            }

            if (params.signBase) {
                this.signBase = params.signBase;
            }

            if (params.apiToken) {
                this.token = params.apiToken;
            }

            if (params.format) this.format = params.format;
        },
        submit: function () {
            this.verification();
            var error = this.form.querySelectorAll(".ver-error-input").length;
            if (error > 0) {
                this.form.querySelector(".ver-error-input").focus();
                return false;
            }
            var form = this.form.getAttribute("data-form");
            if (form == "ajax") {
                this.ajax();
                return false;
            } else if (form == "api") {
                this.ajax();
                return false;
            }
            return true;
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
        reset: function () {
            this.form.reset();
            var _self = this;
            for (var i in this.messages) {
                var names = this.form.querySelectorAll("[data-" + i + "]");
                if (names.length > 0) {
                    names.forEach(function (items) {
                        _self.clear_error(items);
                    })
                }
            }
        },
        _sef_data: function (data, message) {
            var _self = this;
            if (data) {
                for (var i in data) {
                    var names = document.getElementsByName(i);
                    names.forEach(function (item) {
                        for (var j in data[i]) {
                            var messages = message && message[i] && message[i][j] ? message[i][j] : _self.messages[j];
                            if (j != "min" && j != "max" && j != "minlength" && j != "maxlength" && j != "rule" && j != "equal") {
                                item.setAttribute("data-" + j, messages);
                            } else if (j == "rule") {
                                item.setAttribute("data-rule", data[i][j]);
                                item.setAttribute("data-rule-message", messages);
                            } else {
                                item.setAttribute("data-" + j, data[i][j]);
                            }

                        }
                    })
                }
            }

            //判断标记中是否有data验证的数据标记
            for (var i in this.messages) {
                var names = this.form.querySelectorAll("[data-" + i + "]");
                names.forEach(function (items) {
                    var val = items.getAttribute("data-" + i);
                    if (val == "true" || val == "false") {
                        items.setAttribute("data-" + i, _self.messages[i]);
                    }
                    items.onblur = function () {
                        _self.query(this);
                    };
                    items.change = function () {
                        _self.query(this);
                    };
                    items.onfocus = function () {
                        _self.clear_error(this);
                    };
                    if (_self.change == "keyup") {
                        items.onkeyup = function () {
                            _self.query(this);
                        }
                    }
                })
            }
        },
        verification: function () {
            var _self = this;
            for (var i in this.messages) {
                var names = this.form.querySelectorAll("[data-" + i + "]");
                if (names.length > 0) {
                    names.forEach(function (items) {
                        _self.query(items);
                    })
                }
            }
        },
        query: function (objects) {
            var data = {
                required: required,
                min: minOrMax,
                max: minOrMax,
                minlength: lengths,
                maxlength: lengths,
                rule: rules,
                equal: equal,
                mobile: mobile,
                email: email,
                idcard: IdCard
            };
            var _self = this;
            for (var item in data) {
                if (objects.getAttribute("data-" + item)) {
                    data[item]();
                }
            }

            function required() {
                var value = objects.value,
                    errorMessage = objects.getAttribute("data-required");
                if (value == '' || value == null) {
                    _self.error(errorMessage, objects);
                    return false;
                }
                return true;
            }

            function minOrMax() {
                var value = (objects.value),
                    min = parseInt(objects.getAttribute("data-min")),
                    max = parseInt(objects.getAttribute("data-max"));
                value = parseInt(value);
                if (value) {
                    if (isNaN(value) || min > value) {
                        _self.error("最小值为：" + min, objects);
                        return false;
                    } else if (!isNaN(max) && max < value) {
                        _self.error("最大值为：" + max, objects);
                        return false;
                    }
                }
                return true;
            }

            function lengths() {
                var value = objects.value.length,
                    max = parseInt(objects.getAttribute("data-maxlength")),
                    min = parseInt(objects.getAttribute("data-minlength"));
                if (value < min) {
                    _self.error("最少输入" + min + "个字符", objects);
                    return false;
                } else if (value > max) {
                    _self.error("最多输入" + max + "个字符", objects);
                    return false;
                }
                return true;
            }

            function rules() {
                var value = objects.value,
                    rule = objects.getAttribute("data-rule"),
                    errorMessage = objects.getAttribute("data-rule-message");
                if (!errorMessage) errorMessage = "格式错误!";
                rule = new RegExp(rule);
                if (value) {
                    if (!rule.test(value)) {
                        _self.error(errorMessage, objects);
                        return false;
                    }
                }
                return true;
            }

            function equal() {
                var value = objects.value,
                    equal = document.querySelector(objects.getAttribute("data-equal")).value,
                    errorMessage = "两次输入内容不一致";
                if (value != equal) {
                    _self.error(errorMessage, objects);
                    return false;
                }
                return true;
            }

            function mobile() {
                var value = objects.value,
                    rule_tel = /^(0\d{2,3}\d{7,8}|0\d{2,3}-)\d{7,8}$/,
                    rule_phone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
                    errorMessage = objects.getAttribute("data-mobile");
                if (value && !rule_phone.test(value) && !rule_tel.test(value)) {
                    _self.error(errorMessage, objects);
                    return false;
                }
                return true;
            }

            function email() {
                var value = objects.value,
                    rule_email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
                    errorMessage = objects.getAttribute("data-email");
                if (value && !rule_email.test(value)) {
                    _self.error(errorMessage, objects);
                    return false;
                }
                return true;
            }

            function IdCard() {
                var value = objects.value,
                    rule_email = /^([1-9]\d{5}[1]\d{3}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[0-9xX]|[1-9]\d{5}\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3})$/,
                    errorMessage = objects.getAttribute("data-idcard");
                if (value && !rule_email.test(value)) {
                    _self.error(errorMessage, objects);
                    return false;
                }
                return true;
            }
        },
        clear_error: function (objects) {
            var parent = objects.parentNode,
                errorTag = parent.querySelector(".ver-errors");
            if (errorTag) {
                parent.removeChild(errorTag);
            }
            objects.classList.remove("ver-error-input");
            var iconcolor = objects.getAttribute("data-icon-color");
            if (iconcolor) {
                var parent = (objects.offsetParent);
                var iconcirle = parent.querySelector("iconcirle");
                iconcirle.classList.remove("ver-error-inputs")
            }
        },
        ajax: function () {
            var form = this.form.getAttribute("data-form");
            var _self = this;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", this.form.action, true);
            xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
            var data = this.formData();
            if (form == "api") {
                xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                var data = this.apis();
                var datas = {
                    header: {
                        method: this.api,
                        time: this.times(),
                        sign: this.my_sign(data),
                        base: this.signBase,
                        format: this.format
                    },
                    body: data
                }
                data = datas;
                data = JSON.stringify(data);
            }

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
        my_sign: function (data) {
            data = this.keySort(data);
            if (this.signBase == "md5") {
                return hex_md5(data + this.token, "utf-8");
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
        apis: function () {
            var ele = {},
                inputs = this.form.querySelectorAll("input"),
                select = this.form.querySelectorAll("select"),
                text = this.form.querySelectorAll("textarea"),
                _self = this;
            if (inputs.length > 0) {
                inputs.forEach(function (items) {
                    var types = items.type.toLowerCase();
                    if (types != "checkbox" && types != "radio") {
                        ele[items.name] = items.value;
                    } else {
                        if (items.checked) {
                            ele[items.name] = (items.value);
                        }
                    }
                })
            }

            if (select.length > 0) {
                select.forEach(function (items) {
                    ele[items.name] = items.value;
                })
            }

            if (text.length > 0) {
                text.forEach(function (items) {
                    ele[items.name] = items.value;
                })
            }

            return ele;
        },
        formData: function () {
            var ele = [],
                inputs = this.form.querySelectorAll("input"),
                select = this.form.querySelectorAll("select"),
                text = this.form.querySelectorAll("textarea");
            if (inputs.length > 0) {
                inputs.forEach(function (items) {
                    // ele.push(items);
                    var type = items.type.toLowerCase(),
                        value = "";
                    if (type !== 'checkbox' && type != "radio") {
                        value = items.name + "=" + items.value;
                    } else {
                        if (items.checked) {
                            value = items.name + "=" + items.value;
                        }
                    }
                    if (value) {
                        ele.push(value);
                    }
                });
            }

            if (select.length > 0) {
                select.forEach(function (items) {
                    ele.push(items.name + "=" + items.value);
                })
            }

            if (text.length > 0) {
                text.forEach(function (items) {
                    ele.push(items.name + "=" + items.value);
                })
            }
            return encodeURI(ele.join("&"));
        },
        validateHtmlTag: function (str) {
            var reg = /<(?:(?:\/?[A-Za-z]\w*\b(?:[=\s](['"]?)[\s\S]*?\1)*)|(?:!--[\s\S]*?--))\/?>/g;//验证规则
            return str.match(reg);
        }

    };
    return ver;
})();