window.verTabs = (function () {
    var tabs = function () {
        this.data = [];
        this.defaults = [];
        this.style = '';
        this.parents = document.querySelector("body");
    };

    tabs.prototype = {
        init: function (params) {
            if (params.data) this.data = params.data;
            if (params.defa) this.defaults = params.defa;
            if (params.items) this.parents = document.querySelector(params.items);
            this.appends();
            this.items = document.getElementById("verTabs");
            this.left = document.getElementById("verTabsLeft");
            this.right = document.getElementById("verTabsRight");
            this.options = document.getElementById("verTabsOption");
            this.changeItems = document.getElementById("verChangItems");
            if (!this.changeItems) {
                var changeItems = document.createElement("div");
                changeItems.id = "verChangItems";
                changeItems.style.display = "none";
                document.body.appendChild(changeItems);
                this.changeItems = document.getElementById("verChangItems");
            }
            this.defaultsIdList();
            this.leftData();
            this.rightData();
            var _self = this;
            this.options.querySelector(".verTabsRightBtn").onclick = function (e) {
                _self.addBtns("left");
            };
            this.options.querySelector(".verTabsLeftBtn").onclick = function (e) {
                _self.addBtns("right");
            };

            this.clicks();
        },
        defaultsIdList: function () {
            var text = this.changeItems.innerText;
            if (text) {
                text = JSON.parse(text);
                for (var i in text) {
                    if ((this.defaults && !this.defaults.includes(text[i].id)) || !this.defaults) {
                        this.defaults.push(parseInt(text[i].id));
                    }
                }
            }
        },
        appends: function () {
            var html = '<style>\n' +
                '        #verTabs {\n' +
                '            height: 400px;\n' +
                '            width: 600px;\n' +
                '            border-radius: 5px;\n' +
                '        }\n' +
                '\n' +
                '        #verTabs > div {\n' +
                '            display: inline-block;\n' +
                '            border: 1px solid #666;\n' +
                '            height: 100%;\n' +
                '            border-radius: 5px;\n' +
                '            vertical-align: top;\n' +
                '        }\n' +
                '\n' +
                '        #verTabs  ul {\n' +
                '            height: 360px;\n' +
                '            vertical-align: top;\n' +
                '        }\n' +
                '\n' +
                '        #verTabsLeft {\n' +
                '            width: 220px;\n' +
                '            overflow: auto;\n' +
                '        }\n' +
                '\n' +
                '        #verTabsOption {\n' +
                '            width: 80px;\n' +
                '            border: none !important;\n' +
                '            text-align: center;\n' +
                '            line-height: 45px;\n' +
                '            padding-top: 10%;\n' +
                '            overflow: hidden;\n' +
                '            margin: 0 5px;\n' +
                '        }\n' +
                '\n' +
                '        #verTabsOption button {\n' +
                '            background: none;\n' +
                '            border: 1px solid #0d69d2;\n' +
                '            color: #666;\n' +
                '            width: 100%;\n' +
                '            height: 30px;\n' +
                '            border-radius: 5px;\n' +
                '            cursor: pointer;\n' +
                '            outline: none;\n' +
                '        }\n' +
                '\n' +
                '        #verTabsRight {\n' +
                '            width: 220px;\n' +
                '            overflow: auto;\n' +
                '        }\n' +
                '\n' +
                '        #verTabs li {\n' +
                '            padding: 0 15px;\n' +
                '            display: block;\n' +
                '            line-height: 30px;\n' +
                '            cursor: pointer;\n' +
                '        }\n' +
                '\n' +
                '        #verTabs li:hover, #verTabs li.verTabsActives {\n' +
                '            background: #d7342e;\n' +
                '            color: #fff;\n' +
                '        }\n' +
                '\n' +
                '        #verTabs p {\n' +
                '            padding-left: 15px;\n' +
                '        }\n' +
                '\n' +
                '        #verTabs p span.verTabsChange,#verTabs p span.verTabsUnChange {\n' +
                '            cursor: pointer;\n' +
                '        }\n' +
                '\n' +
                '        #verTabs p span:last-child {\n' +
                '            float: right;\n' +
                '        }\n' +
                '\n' +
                '        #verTabs p span:last-child code {\n' +
                '            color: #d7342e;\n' +
                '            padding: 0 10px;\n' +
                '            font-weight: bold;\n' +
                '        }\n' +
                '    </style><div id="verTabs">\n' +
                '    <div id="verTabsLeftBox">\n' +
                '        <p><span data-post="left" class="verTabsChange">全选</span><span>已选（<code class="verTabsNumber" data-pos="left">0</code>）</span></p>\n' +
                '        <ul id="verTabsLeft"></ul>\n' +
                '    </div>\n' +
                '    <div id="verTabsOption">\n' +
                '        <button class="verTabsRightBtn" type="button">添加</button>\n' +
                '        <button class="verTabsLeftBtn" type="button">删除</button>\n' +
                '    </div>\n' +
                '    <div id="verTabsRightBox">\n' +
                '        <p><span data-post="right" class="verTabsChange">全选</span><span>已选（<code class="verTabsNumber" data-pos="right">0</code>）</span></p>\n' +
                '        <ul id="verTabsRight"></ul>\n' +
                '    </div>\n' +
                '</div>';
            this.parents.innerHTML = html;
        },
        leftData: function () {
            var html = "";
            for (var i in this.data) {
                var d = this.data[i];
                if ((this.defaults && !(this.defaults.includes(d.id))) || !this.defaults)
                    html += "<li data-id='" + d.id + "' onclick='btn_length(this)' data-pos='Left'>" + d.name + "</li>";
            }
            this.left.innerHTML = html;
        },
        rightData: function () {
            var html = "";
            var def = this.changeItems.innerText;
            var name = [];
            if (def) {
                def = JSON.parse(def);
                for (var j in def) {
                    name.push(parseInt(def[j].id));
                    var da = def[j];
                    html += "<li data-id='" + da.id + "' onclick='btn_length(this)' data-pos='Right'>" +
                        "<input type='hidden' name='verTablist[]' value='" + da.id + "'>" + da.name + "" +
                        "</li>";
                }
            }
            for (var i in this.data) {
                var d = this.data[i];
                if (this.defaults && (this.defaults.includes(d.id)) && !(name.includes(d.id))) {
                    html += "<li data-id='" + d.id + "' onclick='btn_length(this)' data-pos='Right'>" +
                        "<input type='hidden' name='verTablist[]' value='" + d.id + "'>" + d.name + "" +
                        "</li>";
                }
            }
            this.right.innerHTML = html;
            this.defaultID("right");
        },
        defaultID: function (op) {
            var li = this.right.querySelectorAll("li");
            if (li.length < 1) {
                this.changeItems.innerHTML = "";
                return false;
            }
            var ids = [];
            var html = this.changeItems.innerText;
            if (!html || op === "left") html = [];
            else if (op === "right") {
                //添加，向原数据追加，无需清楚数据
                html = JSON.parse(html);
                for (var i in html) {
                    ids.push(html[i].id);
                }
            }
            li.forEach(function (items) {
                if ((ids && !(ids.includes(items.getAttribute("data-id")))) || !ids)
                    html.push({id: items.getAttribute("data-id"), name: items.innerText});
            });
            if (html.length > 0)
                html = JSON.stringify(html);
            else html = "";
            this.changeItems.innerHTML = html;
        },
        addBtns: function (options) {
            var _h = this[options].querySelectorAll(".verTabsActives");
            var op = options == "left" ? "right" : "left";
            if (_h.length) {
                var _self = this;
                var child = (this.changeItems.innerText);
                if (child) child = JSON.parse(child);
                _h.forEach(function (items) {
                    var li = document.createElement("li");
                    var text = items.innerText;
                    var id = items.getAttribute("data-id");
                    li.setAttribute("data-id", id);
                    li.setAttribute("onclick", "btn_length(this)");
                    li.innerText = text;
                    if (op === "right") {
                        var input = document.createElement("input");
                        input.name = "verTablist[]";
                        input.value = id;
                        input.type = "hidden";
                        li.appendChild(input);
                    }
                    items.remove();
                    _self[op].appendChild(li);
                });
                var len_items = document.querySelectorAll(".verTabsNumber");
                len_items.forEach(function (ir) {
                    var ler = ir.getAttribute("data-pos");
                    ir.innerText = _self[ler].querySelectorAll(".verTabsActives").length;
                });
                this[options].parentElement.querySelector(".verTabsChange").classList.remove(".verTabsUnChange");
                this[options].parentElement.querySelector(".verTabsChange").innerText = "全选";
            } else {
                alert("没有选中的节点");
            }
            this.defaultID(op);
        },
        clicks: function () {
            var _self = this;
            var changet = this.parents.querySelectorAll(".verTabsChange");
            var unchanget = this.parents.querySelectorAll(".verTabsUnChange");
            changet.forEach(function (change) {
                change.onclick = function () {
                    this.classList.toggle("verTabsUnChange");
                    var ler = this.getAttribute("data-post");
                    if (this.classList.contains("verTabsUnChange")) {
                        this.innerText = "全不选";
                        var kl = _self[ler].querySelectorAll("li");
                        kl.forEach(function (item) {
                            item.classList.add("verTabsActives");
                        });
                        this.nextSibling.querySelector(".verTabsNumber").innerText = kl.length;
                    } else {
                        this.innerText = "全选";
                        var kl = _self[ler].querySelectorAll("li");
                        kl.forEach(function (item) {
                            item.classList.remove("verTabsActives");
                        });
                        this.nextSibling.querySelector(".verTabsNumber").innerText = 0;
                    }
                }
            });
        }
    };

    return tabs;
})();

var btn_length = function (obj) {
    obj.classList.toggle("verTabsActives");
    var len = obj.parentElement.querySelectorAll(".verTabsActives").length;
    document.getElementById("verTabs" + obj.getAttribute("data-pos") + "Box").querySelector(".verTabsNumber").innerText = len;
}