jQuery.support.cors = true;

//loading加载-start3
(function (win, $) {
    function loadTimeout() {
        var
            //超时秒数
            second = 10,
            //计时器
            timer = setInterval(function () {
                if (--second < 1) {
                    document.getElementById('preview').innerHTML = '您当前的网络连接过慢！';
                    clearInterval(timer);
                }
            }, 1000);
        //注册事件
        document.attachEvent ? document.attachEvent('onreadystatechange', CtrlLoad) : document.onreadystatechange = CtrlLoad;
        //控制加载
        function CtrlLoad() {
            if (document.readyState && ('complete' == document.readyState)) {
                var pre = document.getElementById('preview');
                if (pre != null)
                {
                    document.getElementById('preview').style.display = 'none';
                }
                clearInterval(timer);
            }
        }
    }
    //调用
    loadTimeout();
}(this, jQuery));
//loading加载-end3

(function ($) {
    if (!window.Util) {
        window.Util = {};
    }

    $.extend(Util, {
        VPath: "/JKYForm/", //virtual path
        AjaxRUrl: "/JKYForm/Ashx/",
        /* 获取URL地址参数
         * prop:参数名
         */
        getUrlParams: function (prop) {
            var params = {},
                query = location.search.substring(1),
                arr = query.split('&'),
                rt;
            $.each(arr, function (i, item) {
                var tmp = item.split('='),
                    key = tmp[0],
                    val = tmp[1];

                if (typeof params[key] == 'undefined') {
                    params[key] = val;
                } else if (typeof params[key] == 'string') {
                    params[key] = [params[key], val];
                } else {
                    params[key].push(val);
                }
            });
            rt = prop ? params[prop] : params;
            return rt;
        },
        //获取url中参数值【推荐：参数名不区分大小写】
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return null;
        },
        GetFormatDateStr: function (myDate) {
            var str = "";
            try {
                if (myDate != "") {
                    var dd = new Date(myDate);
                    var y = dd.getFullYear();
                    var m = dd.getMonth() + 1;//获取当前月份的日期   
                    var d = dd.getDate();

                    if (m.toString().length == 1) { m = "0" + m; }
                    if (d.toString().length == 1) { d = "0" + d; }
                    str = y + "-" + m + "-" + d;
                }
            }
            catch (e) {
                str = e.message;
            }
            return str;
        },
        GetFormatDateStr_ToSS: function (myDate) {
            var str = "";
            try {
                if (myDate != "") {
                    var dd = new Date(myDate);
                    var y = dd.getFullYear();
                    var m = dd.getMonth() + 1;//获取当前月份的日期   
                    var d = dd.getDate();
                    var h = dd.getHours();
                    var M = dd.getMinutes();
                    var s = dd.getSeconds();

                    if (m.toString().length == 1) { m = "0" + m; }
                    if (d.toString().length == 1) { d = "0" + d; }
                    if (h.toString().length == 1) { h = "0" + h; }
                    if (M.toString().length == 1) { M = "0" + M; }
                    if (s.toString().length == 1) { s = "0" + s; }
                    str = y + "-" + m + "-" + d + " " + h + ":" + M + ":" + s;
                }
            }
            catch (e) {
                str = e.message;
            }
            return str;
        },
        ClickLogin: function () {
            //提交登录身份认证
            $(".loginbtn").click(function (event) {
                if ($("#user").val().trim() == "") {
                    layer.alert("请输入身份证号！");
                } else if ($("#pwd").val().trim() == "") {
                    layer.alert("请输入密码！");
                } else {
                    event.preventDefault();
                    CommonSubjectapi.login($("#user").val(), $("#pwd").val(), function (flag) {
                        if (flag == "1") {
                            layer.alert("登录成功！", function () {
                                //CommonSubjectapi.CheckLogin();
                                layer.closeAll();
                                if (Util.getQueryString("callbackurl") == null) {
                                    location.href = Util.VPath + "Pages/mycourses/MyCourses.aspx";
                                } else {
                                    location.href = unescape(Util.getQueryString("callbackurl"));
                                }
                            });

                        }
                    });
                }
            });
            $("#pwd").keyup(function () {
                if (event.keyCode == 13) {
                    //这里写你要执行的事件;
                    $(".loginbtn").click();
                }
            });
        },
        //这个可以验证15位和18位的身份证，并且包含生日和校验位的验证。  
        //如果有兴趣，还可以加上身份证所在地的验证，就是前6位有些数字合法有些数字不合法。  
        CheckID: function isIdCardNo(num) {
            num = num.toUpperCase();
            //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。            
            if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
                layer.alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
                return false;
            }
            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
            //下面分别分析出生日期和校验位 
            var len, re;
            len = num.length;
            if (len == 15) {
                re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
                var arrSplit = num.match(re);
                //检查生日日期是否正确
                var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
                var bGoodDay;
                bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2]))
                    && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
                    && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay) {
                    layer.alert('输入的身份证号里出生日期不对！');
                    return false;
                } else {
                    //将15位身份证转成18位 
                    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。          
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var nTemp = 0, i;
                    num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                    for (i = 0; i < 17; i++) {
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }
                    num += arrCh[nTemp % 11];
                    return num;
                }
            }
            if (len == 18) {
                re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
                var arrSplit = num.match(re);
                //检查生日日期是否正确 
                var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
                var bGoodDay;
                bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2]))
                    && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
                    && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay) {
                    layer.alert(dtmBirth.getYear());
                    layer.alert(arrSplit[2]);
                    layer.alert('输入的身份证号里出生日期不对！');
                    return false;
                } else {
                    //检验18位身份证的校验码是否正确。 
                    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
                    var valnum;
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                    var nTemp = 0, i;
                    for (i = 0; i < 17; i++) {
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }
                    valnum = arrCh[nTemp % 11];
                    if (valnum != num.substr(17, 1)) {
                        layer.alert('18位身份证的校验码不正确！应该为：' + valnum);
                        return false;
                    }
                    return num;
                }
            }
            return false;
        },
        //获取验证码
        GetYZM: function (phoneno) {
            jQuery.support.cors = true;
            $.ajax({
                type: "post",
                url: Util.AjaxRUrl + "Common.ashx",
                data: { "method": "getyzm", "phoneno": phoneno },
                dataType: "json",
                success: function (jsondata) {
                    if (jsondata.status == "success") {
                        layer.alert("验证码发送成功！");
                        //测试使用，弹出验证码
                        //layer.alert(jsondata.data);
                    }
                    else {
                        layer.alert(jsondata.status);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { layer.alert("getyzm=" + errorThrown); }
            });
        },
        isInArray: function(arr, value){
            for(var i = 0; i<arr.length; i++){
                if (value === arr[i]) {
                    return true;
                }
            }
            return false;
        }
    });
}(jQuery));

