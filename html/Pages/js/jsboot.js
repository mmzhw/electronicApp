SrcBoot.output((function () {
    var arr = ["/JKYForm/Pages/js/mustache.js"];
    return arr;
}()));

function uuid() {

    var s = [];

    var hexDigits = "0123456789abcdef";

    for (var i = 0; i < 36; i++) {

        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);

    }

    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010

    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

    s[8] = s[13] = s[18] = s[23] = "-";



    var uuid = s.join("");

    return uuid;

}


function getCookie(cookie_name) {

    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name);

    if (cookie_pos != -1) {
        cookie_pos += cookie_name.length + 1;

        var cookie_end = allcookies.indexOf(";", cookie_pos);
        if (cookie_end == -1) {

            cookie_end = allcookies.length;

        }
        var value = unescape(allcookies.substring(cookie_pos, cookie_end)); //这里就可以得到你想要的cookie的值了。。。  

    }
    return value;

}

//设置或添加cookie
function setCookie(name, value, time) {
    var str = name + "=" + escape(value);
    if (time > 0) {
        var date = new Date();
        var ms = time * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}
//删除cookie  
function removeCookie(name) {
    document.cookie = name + "=;expires=" + (new Date(0)).toGMTString();
}

//获取地址栏参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}