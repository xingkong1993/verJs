window.verSelector = (function () {
    var selector = function (param) {
        this.select = document.querySelectorAll("*[data-selector]");
        //加载样式列表
        this.style();
        changes(this.select);
    };
    //加载默认元素
    selector.prototype = {
        getPath: function () {
            var jsPath = document.currentScript ? document.currentScript.src : function () {
                var js = document.scripts
                    , last = js.length - 1
                    , src;
                for (var i = last; i > 0; i--) {
                    if (js[i].readyState === 'interactive') {
                        src = js[i].src;
                        break;
                    }
                }
                return src || js[last].src;
            }();
            return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
        }(),
        style: function () {
            var path = this.getPath + "need/";
            var icon_link = document.createElement("link"),
                css_link = document.createElement("link");
            icon_link.href = path + "vericon.css?version=1.0";
            css_link.href = path + "select.css?version=1.0";
            css_link.rel = icon_link.rel = "stylesheet";
            css_link.type = icon_link.type = "text/css";
            var link = document.getElementsByTagName("head")[0];
            link.appendChild(css_link);
            link.appendChild(icon_link);
        }
    };
    //生成选择组件
    var changes = function (items) {
        items.forEach(function (it) {
            //生成select表单
            var name = it.name,
                checks = it.getAttribute("data-selector-checks");
            var html = document.createElement("div");
            html.className = "verSelector";

            if (checks == "true") {
                html.setAttribute("data-selector-checks", true);
            }

            html.setAttribute("data-name", name);

            var defa_text = it.querySelector("option").innerText,
                defa_value = it.value;

            html.setAttribute("data-value", defa_value);
            var _html = "<div class=\"verSelector-focus\">\n" +
                " </div>\n" +
                " <div class=\"verSelector-box verSelector-one\">\n" +
                " <span class=\"verSelector-text verSelector-one\">" + defa_text + "</span>\n" +
                " <i class=\"verJsFont icon-caret-down verSelector-caret verSelector-one\"></i>\n" +
                " </div>\n" +
                " <div class=\"verSelector-items verSelector-two\">\n" +
                " <div class=\"verSelector-search verSelector-two\">\n" +
                " <input type=\"search\" autocomplete=\"off\" class=\"verSelector-search-input verSelector-two\">\n" +
                " <i class=\"verSelector-search-button verJsFont icon-search verSelector-two\"></i>\n" +
                " </div>\n" +
                " <div class=\"verSelector-option verSelector-two\"></div>\n" +
                " <div class=\"verSelector-btns verSelector-two\">" +
                " <button class=\"verSelector-success-button verSelector-btn verSelector-two\">保存</button>\n" +
                " <button class=\"verSelector-error-button verSelector-btn verSelector-two\">取消</button> \n" +
                "</div>\n" +
                " </div>";

            html.innerHTML = _html;
            insertAfter(html, it);
            option();
            html.querySelector(".verSelector-search-input").onkeyup = keyup_search;
            html.querySelector(".verSelector-search-button").onclick = keyup_search;
            html.querySelector(".verSelector-success-button").onclick = save_cheks;
        });
    };
    //点击保存按钮
    var save_cheks = function () {

    };
    //搜索关键字查询
    var keyup_search = function () {
        if (this.classList.contains("verSelector-search-input")) {
            var value = this.value;
        } else {
            var value = this.parentElement.querySelector(".verSelector-search-input").value;
        }

        var ops = this.parentElement.parentElement.parentElement,
            select = ops.getAttribute("data-name"),
            child = document.querySelector("[name='" + select + "']").querySelectorAll("option"),
            options = this.parentElement.nextElementSibling,
            text = [],
            check = ops.getAttribute("data-selector-checks");
        if (value == "") {
            show_options(this.parentElement.parentElement);
            return false;
        }


        child.forEach(function (ite) {
            if (ite.innerText.indexOf(value) >= 0) {
                text.push(ite);
            }
        });
        if (text.length < 1) {
            options.innerHTML = "<span style='display: block;margin: 0;padding: 0;color: grey;text-align: center;line-height: 60px'>没搜索到关键字信息</span>";
        } else {
            var _h = "";
            for (var i in text) {
                var icon = "";
                if (check == "true") {
                    icon = '<i class="verJsFont icon-check-box"></i>'
                }
                var value = text[i].getAttribute("value");
                _h += '<p data-value="' + value + '" class="verSelector-option-value verSelector-two">' + icon + ' ' + text[i].innerText + '</p>'
            }

            options.innerHTML = _h;
        }

        _option();
    };
    //显示选择列表
    var show_options = function (tar) {
        var parents = tar.parentNode,
            select = parents.getAttribute("data-name"),
            option = document.querySelector("[name=" + select + "]"),
            items = parents.querySelector(".verSelector-items"),
            options = option.querySelectorAll("option"),
            check = parents.getAttribute("data-selector-checks"),
            mobile = isMobile(),
            ops = items.querySelector(".verSelector-option");
        if (mobile) {
            parents.querySelector(".verSelector-focus").classList.add("verSelector-focus-show")
        }
        parents.querySelector(".verSelector-search-input").value = "";
        items.classList.add("verSelector-focus-show");

        var _h = "";
        options.forEach(function (i) {
            var cl = "";
            var icon = "";
            var value = i.getAttribute("value");
            if (i.selected) {
                cl = "actives";
            }
            if (check == "true") {
                var ic = "icon-check-box";
                if (cl) {
                    ic = "icon-check-box-cicre";
                }
                if (value != "") {
                    icon = '<i class="verJsFont verSelector-icon-check ' + ic + '"></i>'
                }
            }
            if (value != '') {
                _h += '<p data-value="' + value + '" class="verSelector-option-value verSelector-two ' + cl + '">' + icon + ' ' + i.innerText + '</p>'
            }
        });
        ops.innerHTML = _h;
        _option();
    };
    //相关操作信息
    var option = function () {
        document.onclick = function (e) {
            var item = document.querySelectorAll(".verSelector-items");
            var focus = document.querySelectorAll(".verSelector-focus");
            var target = e.target;
            //判断是否是下拉选框点击时间
            if (target.classList.contains("verSelector-one")) {
                item.forEach(function (itm) {
                    if (itm.classList.contains("verSelector-focus-show")) {
                        itm.classList.remove("verSelector-focus-show");
                    }
                });
                if (isMobile()) {
                    focus.forEach(function (itm) {
                        itm.classList.remove("verSelector-focus-show");
                    })
                }
                if (target.classList.contains("verSelector-text") || target.classList.contains("verSelector-caret")) {
                    target = target.parentElement;
                }
                show_options(target);
            } else if (target.classList.contains("verSelector-two")) {
                return true;
            } else {
                item.forEach(function (itm) {
                    if (itm.classList.contains("verSelector-focus-show")) {
                        itm.classList.remove("verSelector-focus-show")
                    }
                });
                if (isMobile()) {
                    focus.forEach(function (itm) {
                        itm.classList.remove("verSelector-focus-show");
                    })
                }
            }
        }
    };
    //选中某一项条件
    var _option = function () {
        var options = document.querySelectorAll(".verSelector-option-value");
        options.forEach(function (items) {
            items.onclick = function () {

            }
        })
    };
    //在某一元素之后追加元素
    var insertAfter = function (item, afters) {
        var parent = afters.parentNode;
        if (parent.lastChild == afters) {
            parent.appendChild(item);
        } else {
            parent.insertBefore(item, afters.nextSibling)
        }
    };
    //是否是移动端
    var isMobile = function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            var width = document.body.offsetWidth;
            //响应式操作
            if (width <= 980) {
                flag = true;
            }
        }

        return flag;
    };
    return selector;
})();
