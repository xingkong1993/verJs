window.verSelector = (function () {
    var selector = function () {
        this.selector = document.querySelectorAll("select[data-selector]");
        this.data = [];
        this.search_data = "";
        this.init();
    };

    selector.prototype = {
        init: function () {
            var styles = document.createElement("style");
            styles.innerHTML = "*[data-selector]{display:none}.verSeletor{max-width:220px;width:auto;max-height:320px;z-index:9999;display:inherit}.verSeletor ul{padding:0;line-height:35px;max-height:calc(100% - 45px);overflow-x:auto;margin:10px 0}.verSeletor ul,.verSeletor ol,.verSeletor li{list-style:none}.verSeletor ul li{padding:0 15px;cursor:pointer;display:block;line-height:30px}.verSeletor ul li:hover,.verSeletor ul li.actives{background:#d7342e;color:#fff}.verSelectorSearch,.M-verSelectorSearch{width:95%}.verSeletor p{padding:0;margin:0}.verSeletorSearchBox{border:1px solid #ddd;background:#fff;padding:5px;height:260px;display:none;position:absolute;z-index:99999}.M-verSeletorSearchBox{border:1px solid #ddd;background:#fff;padding:5px;height:260px;display:none;position:fixed;z-index:99999;width:100%;left:0;bottom:0}.verSeletor .verSelectorSearch input{height:30px;line-height:30px;padding:0 15px;outline:0;width:calc(100% - 30px)}.verSeletor .M-verSelectorSearch input{height:30px;line-height:30px;padding:0 15px;outline:0;width:calc(100% - 30px)}.verSeletorOption,.M-verSeletorOption{border:1px solid #ddd;padding-left:15px!important;line-height:30px;margin-bottom:10px!important;height:30px;vertical-align:top}.verSeletorOption span:first-child,.M-verSeletorOption span:first-child{width:120px;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:30px;display:inline-block}.verSeletor .ver-triangle-down{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #666;float:right;margin-top:10px;margin-right:5px}.verSeletor li+li{margin-left:0}";
            document.getElementsByTagName("head")[0].appendChild(styles);
            if (!this.isMobile()) {
                this.options();
                this.show_list();
                this.search_list();
                this.cliick_list();
            } else {
                this.Moption();
                this.Mshow();
                this.search_list();
                this.Mclick();
            }

        },
        isMobile: function () {
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
            var flag = false;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = true;
                    break;
                }
            }
            return flag;
        },
        options: function () {
            var _self = this;
            this.selector.forEach(function (item) {
                var def = "";
                var option = item.querySelectorAll("option");
                var html = document.createElement("div");
                html.className = "verSeletor";
                var datas = [];
                var _html = ' <p class="verSeletorOption"><span>请选择</span> <span class="ver-triangle-down"></span></p>\n' +
                    '        <div class="verSeletorSearchBox">\n' +
                    '            <p class="verSelectorSearch">\n' +
                    '                <input autocomplete="off" onblur="this.placeholder=this.value?\'\':\'请输入关键字\'" onfocus="this.placeholder=\'\'" placeholder="请输入关键字"\n' +
                    '                       type="text">\n' +
                    '            </p>\n' +
                    '            <ul data-name="' + item.name + '">\n';
                option.forEach(function (i) {
                    var values = i.value,
                        sele = i.selected,
                        text = i.text;
                    // if(values && text != "请选择"){
                    var cl = "";
                    if (sele) {
                        cl = "active";
                        def = text;
                    }
                    _html += '<li data-value="' + values + '" class="' + cl + '">' + text + '</li>';
                    // _self.data[item.name].push({id:values,name:text});
                    datas.push({id: parseInt(values), name: text});
                    // }
                });
                _html += '            </ul>\n' +
                    '        </div>';
                html.innerHTML = _html;
                item.parentElement.appendChild(html);
                item.parentElement.querySelector(".verSeletorOption").querySelector("span").innerText = def;
                _self.data[item.name] = datas;
            });
        },
        Moption: function () {
            var _self = this;
            this.selector.forEach(function (item) {
                var def = "";
                var option = item.querySelectorAll("option");
                var html = document.createElement("div");
                html.className = "verSeletor M-verSeletor";
                var datas = [];
                var _html = ' <p class="M-verSeletorOption"><span>请选择</span> <span class="ver-triangle-down"></span></p>\n' +
                    '        <div class="M-verSeletorSearchBox">\n' +
                    '            <p class="M-verSelectorSearch">\n' +
                    '                <input autocomplete="off" onblur="this.placeholder=this.value?\'\':\'请输入关键字\'" onfocus="this.placeholder=\'\'" placeholder="请输入关键字"\n' +
                    '                       type="text">\n' +
                    '            </p>\n' +
                    '            <ul data-name="' + item.name + '">\n';
                option.forEach(function (i) {
                    var values = i.value,
                        sele = i.selected,
                        text = i.text;
                    // if(values && text != "请选择"){
                    var cl = "";
                    if (sele) {
                        cl = "active";
                        def = text;
                    }
                    _html += '<li data-value="' + values + '" class="' + cl + '">' + text + '</li>';
                    // _self.data[item.name].push({id:values,name:text});
                    datas.push({id: parseInt(values), name: text});
                    // }
                });
                _html += '            </ul>\n' +
                    '        </div>';
                html.innerHTML = _html;
                item.parentElement.appendChild(html);
                item.parentElement.querySelector(".M-verSeletorOption").querySelector("span").innerText = def;
                _self.data[item.name] = datas;
            });
        },
        show_list: function () {
            var _self = this;
            document.onclick = function (e) {
                var box = document.querySelectorAll(".verSeletorSearchBox");
                box.forEach(function (item) {
                    item.style.display = "none";
                    item.querySelector(".verSelectorSearch").querySelector("input").value = "";
                });
                var target = e.target;
                if (target.classList.contains("verSeletorOption") || target.parentElement.classList.contains("verSeletorOption")) {
                    if (target.parentElement.classList.contains("verSeletorOption")) target = target.parentNode;
                    box = target.parentNode.querySelector(".verSeletorSearchBox");
                    _self.refult_data(box);
                    // box.style.display = box.style.display == "block"?"none":"block";
                    if (box.classList.contains("blocks")) {
                        box.classList.remove("blocks");
                        box.style.display = "none";
                    } else {
                        box.classList.add("blocks");
                        box.style.display = "block";
                    }
                } else if (target.classList.contains("verSelectorSearch") || target.parentElement.classList.contains("verSelectorSearch")) {
                    if (target.parentElement.classList.contains("verSelectorSearch")) target = target.parentElement;
                    box = target.parentElement;
                    _self.refult_data(box);
                    box.style.display = "block";
                } else {
                    box.forEach(function (item) {
                        item.querySelector(".verSelectorSearch").querySelector("input").placeholder = "请输入关键字";
                        item.classList.remove("blocks");
                    });
                }
                _self.cliick_list();
            }
        },
        Mshow: function () {
            var _self = this;
            document.onclick = function (e) {
                var box = document.querySelectorAll(".M-verSeletorSearchBox");
                box.forEach(function (item) {
                    item.style.display = "none";
                    item.querySelector(".M-verSelectorSearch").querySelector("input").value = "";
                });
                var target = e.target;
                if (target.classList.contains("M-verSeletorOption") || target.parentElement.classList.contains("M-verSeletorOption")) {
                    if (target.parentElement.classList.contains("M-verSeletorOption")) target = target.parentNode;
                    box = target.parentNode.querySelector(".M-verSeletorSearchBox");
                    _self.refult_data(box);
                    // box.style.display = box.style.display == "block"?"none":"block";
                    if (box.classList.contains("blocks")) {
                        box.classList.remove("blocks");
                        box.style.display = "none";
                    } else {
                        box.classList.add("blocks");
                        box.style.display = "block";
                    }
                } else if (target.classList.contains("M-verSelectorSearch") || target.parentElement.classList.contains("M-verSelectorSearch")) {
                    if (target.parentElement.classList.contains("M-verSelectorSearch")) target = target.parentElement;
                    box = target.parentElement;
                    _self.refult_data(box);
                    box.style.display = "block";
                } else {
                    box.forEach(function (item) {
                        item.querySelector(".M-verSelectorSearch").querySelector("input").placeholder = "请输入关键字";
                        item.classList.remove("blocks");
                    });
                }
                _self.Mclick();
            }
        },
        search_list: function () {
            var _self = this;
            var cls = this.isMobile() ? ".M-verSelectorSearch" : ".verSelectorSearch";
            var search_input = document.querySelectorAll(cls);
            search_input.forEach(function (ins) {
                var puts = ins.querySelector("input");
                puts.onkeyup = function () {
                    if(this.value == this.search_data) return false;
                    this.search_data = this.value;
                    _self.relod_data(this);
                };

                puts.onblur = function () {
                    if(this.value == this.search_data) return false;
                    this.search_data = this.value;
                    _self.relod_data(this);
                }
            });
        },
        relod_data: function (objects) {
            var value = objects.value;
            var ul = objects.parentElement.parentElement.querySelector("ul");
            var keys = ul.getAttribute("data-name");
            var ids = [];
            var data = this.data[keys];
            var html = "";
            var sele = document.querySelector("select[name=" + keys + "]").querySelectorAll("option");
            sele.forEach(function (items) {
                if (items.value) {
                    ids.push(parseInt(items.value));
                }
            });
            for (var i in data) {
                if (data[i].name.indexOf(value) >= 0 && ids.includes(data[i].id)) {
                    html += '<li data-value="' + data[i].id + '">' + data[i].name + '</li>';
                }
            }
            if (!html) html = '<li style="color: grey;text-align: center" class="ver-norml">没有搜索到相关数据信息</li>';
            ul.innerHTML = html;
            if (!this.isMobile())
                this.cliick_list();
            else
                this.Mclick();
        },
        cliick_list: function () {
            var box = document.querySelectorAll(".verSeletorSearchBox");
            box.forEach(function (i) {
                var li = i.querySelectorAll("li");
                li.forEach(function (item) {
                    item.onclick = function () {
                        if (!this.classList.contains("ver-norml")) {
                            this.parentElement.querySelectorAll("li").forEach(function (d) {
                                d.classList.remove("actives");
                            });
                            this.classList.add("actives");
                            var value = this.getAttribute("data-value");
                            var name = this.parentElement.getAttribute("data-name");
                            var text = this.innerText;
                            this.parentNode.parentNode.style.display = "none";
                            this.parentNode.parentNode.parentNode.querySelector(".verSeletorOption").querySelector("span").innerText = text;
                            var select = (document.querySelector("select[name=" + name + "]"));
                            select.value = value;
                            this.parentNode.parentNode.querySelector(".verSelectorSearch").querySelector("input").value = "";
                        }
                    }
                });
            });
        },
        Mclick: function () {
            var box = document.querySelectorAll(".M-verSeletorSearchBox");
            box.forEach(function (i) {
                var li = i.querySelectorAll("li");
                li.forEach(function (item) {
                    item.onclick = function () {
                        if (!this.classList.contains("ver-norml")) {
                            this.parentElement.querySelectorAll("li").forEach(function (d) {
                                d.classList.remove("actives");
                            });
                            this.classList.add("actives");
                            var value = this.getAttribute("data-value");
                            var name = this.parentElement.getAttribute("data-name");
                            var text = this.innerText;
                            this.parentNode.parentNode.style.display = "none";
                            this.parentNode.parentNode.parentNode.querySelector(".M-verSeletorOption").querySelector("span").innerText = text;
                            var select = (document.querySelector("select[name=" + name + "]"));
                            select.value = value;
                            this.parentNode.parentNode.querySelector(".M-verSelectorSearch").querySelector("input").value = "";
                        }
                    }
                });
            });
        },
        refult_data: function (box) {
            var ul = box.querySelector("ul"),
                names = ul.getAttribute("data-name"),
                select = document.querySelector("select[name=" + names + "]"),
                html = "",
                datas = [],
                selects = select.querySelectorAll("option"),
                cls = this.isMobile() ? ".M-verSeletorOption" : ".verSeletorOption";
            selects.forEach(function (items) {
                datas.push({id: parseInt(items.value), name: items.innerText});
                var cl = "";
                if (items.selected) {
                    cl = "actives";
                    box.parentNode.querySelector(cls).querySelector("span").innerText = items.innerText;
                }
                // if(items.value)
                html += "<li data-value='" + items.value + "' class='" + cl + "'>" + items.innerText + "</li>"
            });
            ul.innerHTML = html;
            this.data[names] = datas;
        }
    };

    return selector;
})();