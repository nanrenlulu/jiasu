(function ($, window, document, undefined) {
    $.fn.customtoast = function (msg,time=3) {
        var html = $(`<div class="default-dialog toast-dialog">
            <div class="dialog-body">
                <div class="dialog-content">${msg}</div>
            </div>
        </div>`).appendTo(this);
        var t = setTimeout(function () {
            $(".toast-dialog").remove();
            clearTimeout(t);
        }, time*1000);
    };

    let customDialogIndex = 0;
    $.fn.customDialog = function (msg,isOnly=0,hide=false) {
        let key = window.getRandomCode(4);
        if(customDialogIndex==1){
            return;
        }
        if(isOnly==1){
            customDialogIndex = 1;
        }else{
            customDialogIndex = 0;
        }

        var html = $(`<div class="default-dialog custom-dialog" id="custom-dialog-${key}" >
                <div class='dialog-body'>
                    <div class="dialog-content">${msg}</div>
                    <div class="dialog-close bottom" >X</div>
                </div>
            </div>`).appendTo(this);
        $(".dialog-close").on("click", function () {
            if(hide){
                customDialogIndex =0;
            }
            $("#custom-dialog-"+key).remove();
        });
    };

    $.fn.noticeDialog = function (msg) {
        let key = window.getRandomCode(4);
        var html = $(`<div class="default-dialog notice-dialog" id="notice-dialog-${key}">
                <div class='dialog-body'>
                    <div class="dialog-close top" >X</div>
                    <img class='logo-img' src="${img_host}/logo_300x300.png" >
                    <div class="dialog-content">${msg}</div>
                    <div class="dialog-close bottom" >我知道了</div>
                </div>
            </div>`).appendTo(this);
        $(".dialog-close").on("click", function () {
            $("#notice-dialog-"+key).remove();
        });
    };
    $.fn.imgtoast = function (msg) {
        var html = $(`<div class="default-dialog default_imgtoast">
            <div class="dialog-body">
                <div class="dialog-content">${msg}</div>
                <div class="dialog-close">X</div>
            </div>
        </div>`).appendTo(this);
        $(".dialog-close").on("click", function () {
            $(".default_imgtoast").remove();
        });
    };
    $.fn.customloading = function (msg) {
        var html = $(`<div class="default-dialog loading-dialog">
            <div class="dialog-body">${msg}</div>
        </div>`).appendTo(this);
        return $(".loading-dialog");
    };

    $.fn.chargeDialog = function (url, user) {
        let userdata = "";
        if (user) {
            userdata = "?user=" + window.Encrypt(user, "djasjl");
        }
        $(`<div class="default-dialog charge-dialog">
            <div class="dialog-body">
                <div class="dialog-close top" > <a href="/user/info.html" style="
                color: #fff;">X</a></div>
                <div class='dialog-content'>
                    <p class="tip">你的会员已过期</p>
                    <img class="gold" src="${img_host}/gold.png" alt="">
                    <p class="tip2">你将失去VIP会员功能</p>
                    <p style="font-size: 12px">充值之后，请重新登录领取VIP</p>
                    <a class="renewal" href="${url}${userdata}" >续费猫咪VIP</a>
                </div>
            </div>
        </div>`).appendTo(this);
        $(".dialog-close").on("click", function () {
            $(".charge-dialog").remove();
        });
    };

    $.fn.vipDialog = function (
        url,
        url2,
        time,
        user,
        msg = "尊贵的猫咪VIP欢迎您"
    ) {
        let userdata = "";
        if (user) {
            userdata = "?user=" + window.Encrypt(user, "djasjl");
        }
        time = time?`你的VIP将于${time}过期`:"&nbsp;"
        $(`<div class="default-dialog vip-dialog" >
            <div class="dialog-body" style="background-image:url(${img_host}/vipBlue.png)">
                <div class="dialog-close top" >X</div>
                <div class='dialog-content'>
                    <h2 class="tip-title">温馨提示</h2>
                    <p class="tip-hy">${msg}</p>
                    <p class="tip-date">${time}</p>
                    <a href="/user/info.html" style="
                    line-height: 40px;
                    font-size: 14px;
                    color: red;">点击进入用户中心</a>
                </div>
                <div class="dialog-bottom">
                    <a target="_blank" href="${url}${userdata}"><div class="dialog-btn bg1">立即续费</div></a>
                    <a target="_blank" href="${url2}${userdata}"><div class="dialog-btn bg2 ">确认</div></a>
                </div>
            </div>
        </div>`).appendTo(this);
        $(".dialog-close").on("click", function () {
            $(".vip-dialog").remove();
        });
    };

    $.fn.msgDialog = function (msg,url="") {
        let ahtml = `我知道了`;
        if(url){
            ahtml = `<a href='${url}' target='_blank' >立即跳转</a>`;
        }
        var html = $(`<div class="default-dialog msg-dialog" >
                <div class='dialog-body'>
                    <div class="dialog-close top" >X</div>
                    <div class="dialog-content">
                        <h2 class="tip-title">温馨提示</h2>
                        <p class="tip-hy">${msg}</p>
                    </div>
                    <div class="dialog-close bottom" >${ahtml}</div>

                </div>
            </div>`).appendTo(this);
        $(".dialog-close").on("click", function () {
            $(".msg-dialog").remove();
        });

    };
})(jQuery, window, document);

function openToast(msg,time=3) {
    $("body").customtoast(msg,time);
}
function openLoading() {
    return $("body").customloading("正在操作。。。。");
}
function openCustomLoading(msg) {
    return $("body").customloading(msg);
}
function openImgToast(img) {
    return $("body").imgtoast(img);
}
function openCustomDialog(html,isOnly=0,hide=false) {
    return $("body").customDialog(html,isOnly,hide);
}

function openNoticeDialog(html) {
    return $("body").noticeDialog(html);
}

function openChargeDialog(url, user) {
    return $("body").chargeDialog(url, user);
}

function openVipDialog(url, url2, time, user, msg) {
    return $("body").vipDialog(url, url2, time, user, msg);
}

function openMsgDialog(msg,url='') {
    return $("body").msgDialog(msg,url);
}
