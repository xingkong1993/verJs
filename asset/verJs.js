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
        this.error = function (errorMessage, target) {
            this.clear_error(target);
            target.classList.add("ver-error-input");
            var errorTag = document.createElement("span");
            errorTag.className = "ver-errors";
            var iconCarets = document.createElement("i");
            iconCarets.className = "verJsFont ver-icon-carets ver-error-caret";
            errorTag.appendChild(iconCarets);
            var iconInfo = document.createElement("i");
            iconInfo.className = "verJsFont icon-info-o";
            errorTag.appendChild(iconInfo);
            var span = document.createElement("span");
            span.innerText = errorMessage;
            errorTag.appendChild(span);
            this.insertAfter(errorTag, target);
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
            css.href = "asset/need/common.css?v=1.0.2&$_=" + Math.random();
            icon.href = "asset/need/vericon.css?v=1.0.2&$_=" + Math.random();
            css.rel = icon.rel = "stylesheet";
            css.type = icon.type = "text/css";
            var link = document.getElementsByTagName("head")[0];
            link.appendChild(css);
            link.appendChild(icon);
        };
        this.success = function (data) {
            alert("提交成功！")
        }
        this.fail = function (data) {
            alert("提交失败！");
        }
    };
    ver.prototype = {
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
            if (params.success) {
                this.success = params.success;
            }
            if (params.fail) {
                this.fail = params.fail;
            }
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
            }
            return true;
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
                }
                else if (value > max) {
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
        },
        ajax: function () {
            var _self = this;
            var data = this.formData();
            var xhr = new XMLHttpRequest();
            xhr.open(this.form.method, this.form.action, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200 || xhr.status == 304) {
                        _self.success(xhr.responseText);
                    } else {
                        _self.fail(xhr.responseText);
                    }
                }
            };
            xhr.send(data);
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
        }
    };
    return ver;
})();