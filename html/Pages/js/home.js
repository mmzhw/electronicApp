function openImgModule() {
    $('#imgModuleWrap').css('display', 'flex');
}

function backHome() {
    $('#imgModuleWrap').css('display', 'none');
    $('#evaluateModule').css('display', 'none');
}

function openEvaluateModule() {
    $('#evaluateModule').css('display', 'flex');
    $('#selectTeacherWrap').css('display', 'block');
    $('#inputPasswordWrap').css('display', 'none');
}

function chooseTeacher(id) {
    let arr = $('.chooseTeacher');
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].getAttribute('data-teacherId') === id) {
            homeapi.SelectedTeacherGuid = id;
            arr[i].className = arr[i].className.replace('noActive', 'active');
        } else {
            arr[i].className = arr[i].className.replace('active', 'noActive');
        }
    }
}

function evaluateSure() {
    if ($('#selectTeacherWrap')[0].style.display === 'block') {
        //先判断是否选择教师
        if (homeapi.SelectedTeacherGuid === "") {
            layer.alert("请选择教师");
        } else {
            // 选择老师
            $('#selectTeacherWrap').css('display', 'none');
            $('#inputPasswordWrap').css('display', 'flex');
        }
    } else if ($('#inputPasswordWrap')[0].style.display === 'flex') {   
        homeapi.CheckTeacherInfo($('#inputPassword')[0].value);
        //// 输入密码
        //console.log($('#inputPassword')[0].value);
        //window.location.href = window.location.href.replace('home.html', 'evaluate.html');        
    }
}

function changeRank(el, type) {
    el.className = 'divActive';
    if (type === 1) {
        el.nextElementSibling.className = '';
        $('#weekRank').css('display', 'flex');
        $('#monthRank').css('display', 'none');
    } else if (type === 2) {
        el.previousElementSibling.className = '';
        $('#weekRank').css('display', 'none');
        $('#monthRank').css('display', 'flex');
    }
}

var homeapi = {
    apiurl: Util.AjaxRUrl + "Class.ashx",
    ClassGuid: Util.getQueryString("RowGuid"),
    SelectedTeacherGuid: "",
    timer: null,
    weathertimer: null,
    kbjftimer:null,
    GetClassDetail: function () {
        jQuery.support.cors = true;
        $.ajax({
            type: "post",
            url: this.apiurl,
            data: {
                "method": "getclassdetail",
                "rowguid": this.ClassGuid
            },
            dataType: "json",
            success: function (jsondata) {
                if (jsondata.status == "success") {
                    $("#ClassName").text(jsondata.data.ClassName);
                    $("#StudentCount").text(jsondata.data.StudentCount);
                    $("#BZRName").text(jsondata.data.BZRName);
                    $("#FBZRName").text(jsondata.data.FBZRName);
                    $("img[name='PhotoFileName']").attr("src", jsondata.data.PhotoFileName);

                    homeapi.BindTemplate(jsondata.data,
                        $("#rk"),
                        $("#rk-Item"));
                    homeapi.BindTemplate(jsondata.data,
                        $("#selectTeacherWrap"),
                        $("#rk1-Item"));
                } else {
                    layer.alert(jsondata.status);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { layer.alert("getclassdetail=" + errorThrown); }
        });
    },
    //绑定模板
    BindTemplate: function (jsondata, $list, $item) {
        var M = Mustache, activitylistTmpl = $item.html();

        $list.html(M.render(activitylistTmpl, jsondata));
    },
    GetClassKB: function () {
        jQuery.support.cors = true;
        $.ajax({
            type: "post",
            url: this.apiurl,
            data: {
                "method": "getclasskcb",
                "rowguid": this.ClassGuid
            },
            dataType: "json",
            success: function (jsondata) {
                if (jsondata.status == "success") {
                    homeapi.BindTemplate(jsondata.data,
                        $("#kb"),
                        $("#kb-Item"));
                } else {
                    layer.alert(jsondata.status);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { layer.alert("getclasskcb=" + errorThrown); }
        });
    },
    GetNotice: function () {
        jQuery.support.cors = true;
        $.ajax({
            type: "post",
            url: this.apiurl,
            data: {
                "method": "getnotice"
            },
            dataType: "json",
            success: function (jsondata) {
                if (jsondata.status == "success") {
                    $("#Notice").html(jsondata.data.Notice);
                    $("#PublishTime").html(jsondata.data.PublishTime);
                } else {
                    layer.alert(jsondata.status);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { layer.alert("getclassdetail=" + errorThrown); }
        });
    },
    //验证教师密码
    CheckTeacherInfo: function (password) {
        jQuery.support.cors = true;
        $.ajax({
            type: "post",
            url: this.apiurl,
            data: {
                "method": "checkteacherinfo",
                "userguid": this.SelectedTeacherGuid,
                "password": password
            },
            dataType: "json",
            success: function (jsondata) {
                if (jsondata.status == "success") {
                    window.location.href = 'evaluate.html?UserGuid=' + homeapi.SelectedTeacherGuid + '&RowGuid=' + homeapi.ClassGuid;
                } else {
                    layer.alert(jsondata.status);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { layer.alert("checkteacherinfo=" + errorThrown); }
        });
    },
    GetScoreList: function () {
        jQuery.support.cors = true;
        $.ajax({
            type: "post",
            url: this.apiurl,
            data: {
                "method": "getscorelist",
                "rowguid": this.ClassGuid
            },
            dataType: "json",
            success: function (jsondata) {
                if (jsondata.status == "success") {
                    homeapi.BindTemplate(jsondata.data,
                        $("#weekRank"),
                        $("#week-Item"));
                    homeapi.BindTemplate(jsondata.data,
                        $("#monthRank"),
                        $("#month-Item"));
                } else {
                    layer.alert(jsondata.status);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { layer.alert("getscorelist=" + errorThrown); }
        });
    },
    GetLocalTime: function () {
        var mydate = new Date();
        $("#day").text(mydate.toLocaleDateString());
        $("#day1").text(mydate.toLocaleDateString());
        var hour = mydate.getHours();
        var minute = mydate.getMinutes();
        $("#time").text(hour + ":" + minute);
    },
    GetWeatherInfo: function () {
        jQuery.support.cors = true;
        $.ajax({
            type: "get",
            url: "https://www.tianqiapi.com/api/?version=v6&cityid=101290101",
            data: {},
            dataType: "json",
            success: function (jsondata) {
                //layer.alert(JSON.stringify(jsondata));
                $("#tem").text(jsondata.tem);
                $("#weather").html(jsondata.wea + "<span>|</span>" + jsondata.win + jsondata.win_speed + "<span>|</span>" + jsondata.city);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { layer.alert("getweatherinfo=" + errorThrown); }
        });
    }
}

$(function () {
    //获取班级详情
    homeapi.GetClassDetail();
    //获取班级课表
    homeapi.GetClassKB();
    //获取通知
    homeapi.GetNotice();
    //获取积分列表
    homeapi.GetScoreList();
    //设定当前时间
    homeapi.GetLocalTime();
    //获取天气信息
    homeapi.GetWeatherInfo();

    //60s一次，更新时间
    homeapi.timer = setInterval(function () {
        
        homeapi.GetLocalTime();
    }, 60000);
    //30分钟一次，更新天气和积分排名
    homeapi.weathertimer = setInterval(function () {
        homeapi.GetWeatherInfo();
        homeapi.GetScoreList();
    }, 1800000);
    //3小时，更新课表
    homeapi.kbjftimer = setInterval(function () {
        homeapi.GetClassKB();
    }, 10800000);
});
