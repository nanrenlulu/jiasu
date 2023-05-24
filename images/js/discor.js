var mobile = false;
var ua = navigator.userAgent.toLowerCase();
if (/android/i.test(ua)) {
    mobile = true;
}
if (/ipad|iphone|ipod/.test(ua) && !window.MSStream) {
    mobile = true;
}
var hash = { 32: "\u3000" };

function StayPosition(speed) {
    this.objs = [];
    this.speed = speed || 0.1;
    this.timer = this.round = this.obj = this.end = null;
    this.cucTemp;

    if (StayPosition.initialize !== true) {
        function correct(func, obj) {
            return function () {
                func.call(obj);
            };
        }
        StayPosition.prototype.start = function () {
            this.timer = setInterval(correct(this.run, this), 33);
        };
        StayPosition.prototype.stop = function () {
            clearInterval(this.timer);
        };
        StayPosition.prototype.capitalize = function (prop) {
            return prop.replace(/^[a-z]/, function (a) {
                return a.toUpperCase();
            });
        };
        StayPosition.prototype.add = function (dom, prop, topNumber) {
            var offset = prop ? "offset" + this.capitalize(prop) : "offsetTop";
            var scroll = prop ? "scroll" + this.capitalize(prop) : "scrollTop";
            prop = prop ? prop : this.offset.slice(6).toLowerCase();
            this.objs.push({
                dom: dom,
                prop: {
                    size: dom[offset],
                    name: prop,
                    offset: offset,
                    scroll: scroll,
                    reheight: topNumber,
                },
            });
        };
        StayPosition.prototype.run = function () {
            this.cucTemp = document.getElementById("main-container").offsetTop;
            for (var i = 0, l = this.objs.length; i < l; i++) {
                this.obj = this.objs[i];
                this.end =
                    (document.documentElement[this.obj.prop.scroll] ||
                        document.body[this.obj.prop.scroll]) +
                    this.obj.prop.size;
                var aa = this.cucTemp + this.obj.prop.reheight;
                //  console.log(  document.documentElement[this.obj.prop.scroll] || document.body[this.obj.prop.scroll]);
                // console.log(   this.obj.prop.size);
                //  console.log(this.obj.dom[this.obj.prop.offset]);
                //  console.log(this.end != this.obj.dom[this.obj.prop.offset])
                if (
                    this.end > aa &&
                    this.end != this.obj.dom[this.obj.prop.offset]
                ) {
                    this.round =
                        this.end - this.obj.dom[this.obj.prop.offset] > 0
                            ? Math.ceil
                            : Math.floor;
                    this.obj.dom.style[this.obj.prop.name] =
                        this.obj.dom[this.obj.prop.offset] +
                        this.round(
                            (this.end - this.obj.dom[this.obj.prop.offset]) *
                                this.speed
                        ) +
                        "px";
                } else if (this.end <= aa) {
                    this.obj.dom.style[this.obj.prop.name] = aa + "px";
                }
            }
        };
    }
    StayPosition.initialize = true;
}

//  栏目下的广告
function createHeaderAd(pageFlag) {
    //0是广告比较多的情况, 1是广告比较少的情况
    let hengfuList = "";
    let strHtml = "";
    if (pageFlag == 1) {
        //广告比较多
        hengfuList = neiyehengfu;
    } else if (pageFlag == 0) {
        //广告比较少
        hengfuList = shouyehengfu;
    }
    if (hengfuList) {
        for (let i = 0; i < hengfuList.length; i++) {
            const item = hengfuList[i];
            strHtml += `<li><a href="${item.url}" target="_blank"><img src="${item.img}" /></a></li>`;
        }
    }
    if (strHtml) {
        let divhtml = `<ul>${strHtml}</ul>`;
        $(".photo-header-title-content-text-dallor").append(divhtml);
    }
}

//内容处的广告
function createContentAd(flag) {
    //0 content上面的广告 1 content下面的广告  2 both
    if (flag == 0 || flag == 2) {
        var temp = neironghengfu;
        let strHtml = `<div id="photo-content-title-text-main"><div class="photo-content-title-bottomx1"><a href=${neirongdatu[0].url}" target="_blank"><img src="${neirongdatu[0].img}"></a></div><div class="photo-help"><a href="/help/help.html"><div class="left">无法观看说明</div></a><a onclick = "configFav()"><div class="right">永久收藏本站</div></a></div>`;
        if (temp.length > 0) {
            strHtml += `<div class="photo-content-title-bottomx"><a href="${temp[0].url}" target="_blank"><img src="${temp[0].img}" /></a></div>`;
        }
        strHtml = strHtml + "</div>";
        $(".photo-content-title-text-main").append(strHtml);
    }
    let strHtml = "";
    if (flag == 1 || flag == 2) {
        if (temp.length > 0) {
            for (let i = 0; i < temp.length; i++) {
                const item = temp[i];
                if (i > 0 && i < 3) {
                    strHtml += `<div class="photo-content-title-bottomx"><a target="_blank" href="${item.url}"><img src="${item.img}"></a></div>`;
                }
            }
        }
        strHtml += `<div class="photo-help"><a href="/help/help.html"><div class="left">无法观看说明</div></a><a onclick = "configFav()"><div class="right">永久收藏本站</div></a></div><div class="photo-content-title-bottomx">`;
        if (temp.length > 3) {
            strHtml += `<a href="${temp[3].url}" target="_blank"><img src="${temp[3].img}"></a>`;
        }
        strHtml = strHtml + "</div>";
        $(".photo-content-title-text-main-foot").append(strHtml);
    }
}
//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

//小说列表除广告
function createListTextAd() {
    var strhtml = "";
    var color = "";
    if (xiaoshuowenzi && xiaoshuowenzi.length > 0) {
        for (let i = 0; i < xiaoshuowenzi.length; i++) {
            const item = xiaoshuowenzi[i];
            if (i == 0) {
                color = "#0000FF";
            } else {
                color = "#FF0000";
            }
            strhtml += `li class="gao-container"><a href="${
                item.url
            }" target="_blank"><span>${getNowFormatDate()}</span><font color="${color}">${
                item.name
            }</font></a></li>`;
        }
        $(".list-text-my ul").prepend(strhtml);
    }
}

function getFloatHtml(position = "left", x, y, imgData, i) {
    let id = `${position}_couple_${i}`;
    let width = "width:130px;height:220px";
    if (mobile) {
        width = "width:60px;height:110px";
    }
    var rc_s = `<div class="close_discor gao-container" id="${id}" style="z-index:101; position:absolute;top:${y}px;${position}:${x}px;">
    <a href="${imgData[i].url}" target="_blank"><img src="${imgData[i].img}" border="0" style="${width}" ></a>
    <div style="position:absolute;top:0px;right:0px;margin:1px;width:15px;height:15px;line-height:16px;background:#000;font-size:11px;text-align:center;">
    <a href="javascript:hideCouple(${id});" style="color:white;text-decoration:none;">×</a></div></div>`;
    document.writeln(rc_s);
    return id;
}
function addFloatData(dataFloat, float_s, id, position) {
    dataFloat.push({
        dom: document.getElementById(id),
        reheight: position,
    });
    try {
        float_s.add(document.getElementById(id), "top", position);
    } catch (e) {
        console.log(e.message);
    }
}

//对联广告
function createFloatAd() {
    var float_s;
    var device_left = 5;
    try {
        float_s = new StayPosition(0.2);
    } catch (e) {
        console.log(e);
    }
    let float_top_position = 5;
    let float_middle_position = 260;
    let float_bottom_position = 0;
    if (mobile) {
        float_top_position = window.innerHeight / 2.5;
        float_middle_position = window.innerHeight / 1.8;
        float_bottom_position = window.innerHeight - 190;
        device_left = 0;
    } else {
        float_top_position = window.innerHeight / 5;
        float_middle_position = float_top_position + 220;
        float_bottom_position = float_middle_position + 220;
    }

    var dataFloat = [];
    if (zuoyoupiaofu == null || zuoyoupiaofu.length == 0) {
        return;
    }
    var float_title_header_data = zuoyoupiaofu;

    let id = getFloatHtml(
        "left",
        device_left,
        float_top_position,
        float_title_header_data,
        0
    );
    addFloatData(dataFloat, float_s, id, float_top_position);

    id = getFloatHtml(
        "right",
        device_left,
        float_top_position,
        float_title_header_data,
        1
    );

    addFloatData(dataFloat, float_s, id, float_top_position);

    id = getFloatHtml(
        "left",
        device_left,
        float_middle_position,
        float_title_header_data,
        2
    );

    addFloatData(dataFloat, float_s, id, float_middle_position);

    id = getFloatHtml(
        "right",
        device_left,
        float_middle_position,
        float_title_header_data,
        3
    );

    addFloatData(dataFloat, float_s, id, float_middle_position);

    id = getFloatHtml(
        "left",
        device_left,
        float_bottom_position,
        float_title_header_data,
        4
    );
    addFloatData(dataFloat, float_s, id, float_bottom_position);

    id = getFloatHtml(
        "right",
        device_left,
        float_bottom_position,
        float_title_header_data,
        5
    );
    addFloatData(dataFloat, float_s, id, float_bottom_position);

    var tempOffset = document.getElementById("main-container").offsetTop;
    var end = document.body.scrollTop;
    try {
        float_s.start();
    } catch (e) {
        var div = document.body;
        //touchstart类似mousedown
        div.ontouchstart = function (e) {}.bind(this);
        //touchmove类似mousemove
        div.ontouchmove = function (e) {
            end = document.body.scrollTop;
            mouseEvent(dataFloat, tempOffset, end);
        }.bind(this);
        // touchend类似mouseup
        div.ontouchend = function (e) {
            mouseEvent(dataFloat, tempOffset, end);
        }.bind(this);
    }
}

function mouseEvent(dataFloat, tempOffset, end) {
    for (let i = 0; i < dataFloat.length; i++) {
        const item = dataFloat[i];
        var aa = tempOffset + item.reheight;
        if (end != item.dom.offsetTop) {
            var domOffSetTop = item.dom.offsetTop;
            if (domOffSetTop > end - 510 + aa) {
                moveTop(item.dom, item.dom.offsetTop, end - 510 + aa, -3);
            } else {
                moveTop(item.dom, item.dom.offsetTop, end - 510 + aa, 3);
            }
        }
    }
}
function moveTop(dom, start, end, temp) {
    if (start * temp < end * temp) {
        dom.style["top"] = start + temp + "px";
        setTimeout(function () {}, 11);
        moveTop(dom, start + temp, end, temp);
    }
}

$(document).on("click touchstart", ".selector-ios-click", function (e) {
    $(this).parent().hide();
    var ovent = e || event;
    ovent.stopPropagation();
    ovent.preventDefault();
});

//除了首页其他页面底部的广告
function createFootAd() {
    if (neiyedibu == null || neiyedibu.length == 0) return;
    var bottom_comm = neiyedibu;
    var uptwo = "";
    var bottomfour = "";
    for (let i = 0; i < bottom_comm.length; i++) {
        const item = bottom_comm[i];
        const ahtml =
            item.url == ""
                ? ""
                : `<a href="${item.url}" target="_blank"><img src="${item.img}" border="0"></a>`;
        if (i < 4) {
            bottomfour += `<li>${ahtml}</li>`;
        }
        if (i >= 4) {
            uptwo += ahtml;
        }
    }

    var strhtml = `<div class="footer-content-title-dallor-uptwo-img">${uptwo}</div>
    <ul class="bottom-content-title-bottom-container">${bottomfour}</ul>`;
    $(".photo--content-title-bottomx--foot").append(strhtml);
}

function camLink() {
    window.open(cam_url);
}

function createDetailAd() {
    var strhtml = "";
    if (dainyingwenzi) {
        for (let i = 0; i < dainyingwenzi.length; i++) {
            const item = dainyingwenzi[i];
            strhtml += `<div class="row"><p>推薦:<a href="${item.url}" class="c_theme">${item.name}</a></p></div>`;
        }
        $(".shipin-tuijian-gao").append(strhtml);
    }
}

//电影详情处的内容广告
function createMovieDetailAd() {
    var middle_square = dianyingfangkuai;
    if (middle_square && middle_square.length > 0) {
        let first = middle_square[0];
        if (first.img) {
            let strHtml = '<div class="pull-right"><div class="row">';
            strHtml += `<a href="${first.url}"><img src="${first.img}"></a> `;
            strHtml = strHtml + "</div></div>";
            $(".shipin-detail-content-pull").append(strHtml);
        }
    }
}

function hideCouple(id) {
    id.style.display = "none";
}
function setJingCai(data, selector) {
    var jingcai = data;
    var ulHtml = "";
    for (let i = 0; i < jingcai.length; i++) {
        const item = jingcai[i];
        ulHtml += `<li class="item"><a href="${item.url}" target="_blank">${item.name}</a></li>`;
    }
    $(selector).html(ulHtml);
}

function setMMApp() {
    try {
        if (downList) {
            $(".mm_app_down").attr("href", downList['maomiapk']['url']);
        }
    } catch (e) {
        console.log(e.message); //sojson is undefined
    }
}
function setCategoryTese(data) {
    var tese = data;
    var ulHtml = "";
    var liHtml = "";
    for (let i = 0; i < tese.length; i++) {
        const item = tese[i];
        for (let i = 0; i < item.child.length; i++) {
            const child = item.child[i];
            liHtml += `<li class="item"><a href="${child.url}" target="_blank">${child.name}</a></li>`;
        }
        ulHtml += ` <div class="row-item odd" >
                <div class="row-item-title "><a href="${item.url}" class="bg_light_theme" target="_blank">
                        <img class="logo-img" alt="logo" srcset=""
                            src="${item.img}">
                            ${item.name}</a></div>
                <ul class="row-item-content" >
                ${liHtml}
                </ul>
            </div>`;
    }

    $("#category_tese").html(ulHtml);
    $("#category_tese a").on("click", function () {
        let text = $(this).text().replaceAll(' ','').replaceAll('\n','')
        indexTeseClick(text,'tesezhuanqu');
    });
}

let a = 0
function menuClick(){
    $("a.menu-link-item").on('click',function(){
        let text = $(this).text().replaceAll(' ','').replaceAll('\n','')
        if(a==1){
            a=0
        }else{
            indexTeseClick(text,$(this).attr('data-channel'));
            a=1
        }
    })
}

function indexTeseClick(name,category) {
    let params = {
        name: name,
        category:category
    };
    window.postEnterData(
        params,
        "/index/statistics",
        function (code, msg, data) {
            if (code === 0) {
            } else {
            }
        }
    );
}
function setHomeTese(data, selector) {
    var tese = data;
    var ulHtml = "";
    var liHtml = "";
    for (let i = 0; i < tese.length; i++) {
        const item = tese[i];
        for (let i = 0; i < item.child.length; i++) {
            const child = item.child[i];
            liHtml += `<li class="item"><a href="${child.url}" target="_blank">${child.name}</a></li>`;
        }
        ulHtml += ` <div class="row-item even div-menu-tese">
                <div class="row-item-title bg_light_theme" ><a href="${item.url}" class='c_white'target="_blank">${item.name}</a></div>
                <ul class="row-item-content" >
                ${liHtml}
                </ul>
            </div>`;
    }

    $(selector).html(ulHtml);
    $(".div-menu-tese a").on("click", function () {
        let text = $(this).text().replaceAll(' ','').replaceAll('\n','')
        indexTeseClick(text,'tesezhuanqu');
    });
}

function goBtt() {
    window.open(window.btt_url);
}

function setMenuTese() {
    menuClick();
    window.setTTjs("#tpl-user");
    if (typeof livezhuanu !== "undefined" && livezhuanu.length > 0) {
        setJingCai(livezhuanu, "#section-menu-live");
    } else {
        $("#div-menu-live").html("");
    }
    if (typeof tesezhuanqu !== "undefined" && tesezhuanqu.length > 0) {
        setCategoryTese(tesezhuanqu);
        setHomeTese(tesezhuanqu, ".section-menu-tese");
    } else {
        $("#div-menu-tese").html("");
    }
}

function setNewsTopData() {
    if (newsTop && newsTop.length > 0) {
        let strhtml = "";
        for (let i = 0; i < newsTop.length; i++) {
            const item = newsTop[i];

            strhtml += `<a class="item item-${i}" title="${item.title}"
                             href="/news/detail-${item["id"]}.html">
                        <p class="news-title">
                         ${item.title}
                        </p>
                        <span class="txt-zd">置顶</span>
                    </a>`;
        }
        $(".news-top-content").addClass(".border_bottom");
        if (window.isMobile()) {
            $(".mobile_show .news-top-content").append(strhtml);
        } else {
            $(".pc_show .news-top-content").empty();
            $(".pc_show .news-top-content").append(strhtml);
        }
    }
}
