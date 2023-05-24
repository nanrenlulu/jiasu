var ishttps = "https:" == document.location.protocol ? "https://" : "http://";
var iswww = window.domain.indexOf("www.") > -1 ? "" : "www.";
var txt = "请复制域名至浏览器打开，勿于微信或者QQ中打开，成人内容将被屏蔽";
var nativeShare = new NativeShare();
let curr_url = ishttps + iswww + window.domain;
var shareData = {
    title: curr_url,
    desc: txt,
    // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
    link: curr_url,
    icon: static_host + "/logo_300x300.png",
    // 不要过于依赖以下两个回调，很多浏览器是不支持的
    success: function () {
        alert("分享成功");
    },
};
nativeShare.setShareData(shareData);

function callShare(command) {
    try {
        nativeShare.call(command);
    } catch (err) {
        var clipboard = new window.ClipboardJS(".scroll-share");
        clipboard.on("success", function (e) {
            e.clearSelection();
            window.openToast("你已成功复制分享链接，快点分享给好友吧。", 1);
        });
        clipboard.on("error", function (e) {
            console.log("复制失败", e);
            clipboard.destroy();
        });
    }
}

function setTitle(title) {
    nativeShare.setShareData({
        title: title,
    });
}
function lazyImg() {
    if ($(".lazy").length > 0) {
        $(".lazy").lazyload({
            effect: "fadeIn",
        });
    }
}

window.tagClick = function (channel) {
    let $tag = $(".tag-item.active");
    let cat = $tag.attr("data-cat");
    let url = $tag
        .attr("data-url")
        .replace("/" + channel + "/list-", "")
        .replace("-1.html", "");
    $(".list-group[data-cat='" + cat + "']").addClass("active");
    $(".list-group[data-cat='" + url + "']").addClass("active");
    $(".tag-item").on("click", function () {
        $(".tag-item").removeClass("active");
        $(this).addClass("active");
        cat = $(this).attr("data-cat");
        url = $(this)
            .attr("data-url")
            .replace("/" + channel + "/list-", "")
            .replace("-1.html", "");
        $(".list-group").removeClass("active");
        $(".list-group[data-cat='" + cat + "']").addClass("active");
        $(".list-group[data-cat='" + url + "']").addClass("active");
        if ($(".list-row .lazy").length > 0) {
            $(".list-row  .lazy").lazyload({
                effect: "fadeIn",
            });
        }
    });
};
function lazyContentImg() {
    if ($(".lazy-content").length > 0) {
        $(".lazy-content img").addClass("lazy");
        $(".lazy-content img").each(function () {
            $(this).attr("data-original", $(this).attr("src") + ".txt");
            $(this).attr("data-aes", "true");
        });
        $(".lazy-content .lazy").lazyload({
            effect: "fadeIn",
        });
    }
}

lazyImg();

var host = window.domain.replace("www.", "");
$(".header_title").html(host);
function close_discor() {
    $(".close_discor").hide();
}

window.onscroll = function () {
    setShowScoll();
};

function totop(i) {
    if (i <= 0) {
        return;
    } else {
        window.scroll(0, i);
        setTimeout(function () {
            totop(i - 40);
        }, 1);
    }
}

function doScroll1() {
    let scrollTop1 =
        document.body.scrollTop || document.documentElement.scrollTop;
    totop(scrollTop1);
}

function setShowScoll() {
    let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
    let clientHeight = 800;
    if (scrollTop >= clientHeight) {
        $(".go-up").show();
    } else {
        $(".go-up").hide();
    }
}
function createTotop() {
    let url = window.location.href;
    if (!url) {
        url = curr_url;
    }
    var toTop_s = ` <div class="scroll-mian" id="scroll-mian">
            <ul class="scroll-content">
                <li class="scroll-list go-up">
                    <a class="scroll-item" title="回到顶部" href="javascript:doScroll1()" target="_self">
                        <img class="icon" alt="" srcset="" src="${img_host}/arrow-up.png" />
                    </a>
                <li class="scroll-list">
                    <a class="scroll-item scroll-share" title="分享页面" href="javascript:callShare()" target="_self" data-clipboard-text="${url} 提示：请复制域名去手机浏览器中打开，请勿在微信和QQ中打开，因为包含成人内容。尽量使用宙斯浏览器，谷歌浏览器，火狐浏览器，或者苹果安卓系统自带浏览器访问～">
                        <img class="icon" alt="" srcset="" src="${img_host}/share_4.png" />
                    </a>
                </li>
                <li class="scroll-list">
                    <a class="scroll-item kf-link custom-url" title="联系客服" target="_blank" href="/user/login.html" target="_self">
                        <img class="icon" alt="" srcset="" src="${img_host}/customer.png" />
                    </a>
                </li>
            </ul>
        </div>`;
    $("body").append(toTop_s);
}

function tiao(type) {
    if (type == "dsp") {
        if (isAnd()) {
            window.location.href = window.dsp_android_url;
        } else if (isIOS()) {
            window.location.href = window.dsp_ios_url;
        } else {
            window.location.href = window.dsp_pc_url;
        }
    }
}

function setImgError() {
    $("img").error(function () {
        window.imgError(0, this);
    });
}


function setAppDownFix() {
    let html = `<div class='body-fix app-down-fix'>
        <div class='app-content'>
            <a href="#" target="_blank" class="mm_app_down"><img class="logo-img" alt="app" srcset="" src="${img_host}/logo.png">
            <span>下载APP，体验精彩视频！</span></a>
            <img class="close-img fix-close" alt="app" srcset="" src="${img_host}/close.png">
        </div>
    </div>`;
    $("body").append(html);
    setMMApp();
    $(".fix-close").on("click", function () {
        $(".app-down-fix").remove();
    });
}

setMMApp();

function allLinkClick(){
    $("a").each((i,item) => {
        let href = item.getAttribute("href");
        if(href && href.indexOf('https://')>-1){
            if(item.getAttribute('data-unext')=="true"){
                return;
            }
            item.setAttribute("href","/external/index.html?gg="+href);
            item.setAttribute("target","_blank");
        }
    });
}

setTimeout(() => {
    allLinkClick()
}, 1000);
