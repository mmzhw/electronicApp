var blueFlower = 0;
var redFlower = 0;
var evaluateType = 1; // 评价类型 1：行为习惯2：学习习惯

function backHome() {
    window.location.href = 'home.html?RowGuid=' + evaluateApi.ClassGuid;
}

function getBule(num, state) {
    let arr = $('.blueFlower');
    if (num === 1 && blueFlower === 1 && arr[0].src.match('icon_hua_blue.png')) {
        blueFlower = 0;
        arr[0].src = 'assets/icon_hua_gray.png';
    } else {
        for (let i = 0; i < arr.length; i++) {
            if (i <= num - 1) {
                arr[i].src = 'assets/icon_hua_blue.png';
            } else {
                arr[i].src = 'assets/icon_hua_gray.png';
            }
        }
        blueFlower = num;
    }
    if (!state) {
        getRed(0, true);
    }
}

function getRed(num, state) {
    let arr = $('.redFlower');
    if (num === 1 && redFlower === 1 && arr[0].src.match('icon_hua_red.png')) {
        redFlower = 0;
        arr[0].src = 'assets/icon_hua_gray.png';
    } else {
        for (let i = 0; i < arr.length; i++) {
            if (i <= num - 1) {
                arr[i].src = 'assets/icon_hua_red.png';
            } else {
                arr[i].src = 'assets/icon_hua_gray.png';
            }
        }
        redFlower = num;
    }
    if (!state) {
        getBule(0, true);
    }
}

function chooseType(type, evaluateType) {
    evaluateApi.evaluateType = evaluateType;
    if (type === 1) {
        $('.module1')[0].children[0].children[0].src = 'assets/btn_xuanzhong.png';
        $('.module1')[0].children[1].children[0].src = 'assets/icon_quan.png';
    } else if (type === 2) {
        $('.module1')[0].children[1].children[0].src = 'assets/btn_xuanzhong.png';
        $('.module1')[0].children[0].children[0].src = 'assets/icon_quan.png';
    }
}

function addStudent(el, student,rowguid) {
    if (el.className === '') {
        el.className = 'activeLi';
        if ($('#textareaStudent')[0].value) {
            $('#textareaStudent')[0].value = $('#textareaStudent')[0].value + ';' + student;

            evaluateApi.SelectStudent += ';' + rowguid;
        } else {
            $('#textareaStudent')[0].value = student;

            evaluateApi.SelectStudent = rowguid;
        }
    } else {
        el.className = '';
        $('#textareaStudent')[0].value = $('#textareaStudent')[0].value.replace(';' + student, '').replace(student, '').replace(new RegExp('^\\;+', 'g'), '');

        evaluateApi.SelectStudent = evaluateApi.SelectStudent.replace(';' + rowguid, '').replace(rowguid, '');
    }
}

function sure() {
    if (evaluateApi.SelectStudent == "") {
        layer.alert("请选择学生！");
        retrun;
    }
    if (blueFlower == 0 && redFlower == 0) {
        layer.alert("请选择红蓝花！");
        retrun;
    }
    var data = {
        blueFlower: blueFlower,
        redFlower: redFlower,
        evaluateType: evaluateApi.evaluateType,
        student: evaluateApi.SelectStudent.split(';'),
        TeacherGuid: evaluateApi.UserGuid
    };
    evaluateApi.Submit(data);
}

function clearData() {
    getBule(0);
    getRed(0);
    chooseType(1, '行为习惯');
    $("#studentlist li").removeClass("activeLi");
    evaluateApi.SelectStudent = "";
    $('#textareaStudent')[0].value = '';
}

function changeStudentDiv() {
    let el = $('#dropBut').next()[0];
    if (el.style.display === 'block') {
        el.style.display = 'none';
    } else if (el.style.display === 'none') {
        el.style.display = 'block';
    }
}


var evaluateApi = {
    apiurl: Util.AjaxRUrl + "Class.ashx",
    UserGuid: Util.getQueryString("UserGuid"),
    ClassGuid: Util.getQueryString("RowGuid"),
    SelectStudent: "",
    timer:"",
    evaluateType: '行为习惯',
    StudentCode:"",
    GetStudentList: function () {
        jQuery.support.cors = true;
        $.ajax({
            type: "post",
            url: this.apiurl,
            data: {
                "method": "getclassstudent",
                "rowguid": this.ClassGuid
            },
            dataType: "json",
            success: function (jsondata) {
                if (jsondata.status == "success") {
                    evaluateApi.BindTemplate(jsondata.data,
                        $("#studentlist"),
                        $("#studentlist-Item"));
                } else {
                    layer.alert(jsondata.status);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { layer.alert("getclassstudent=" + errorThrown); }
        });
    },
    //绑定模板
    BindTemplate: function (jsondata, $list, $item) {
        var M = Mustache, activitylistTmpl = $item.html();

        $list.html(M.render(activitylistTmpl, jsondata));
    },
    Submit: function (submitdata) {
        jQuery.support.cors = true;
        $.ajax({
            type: "post",
            url: this.apiurl,
            data: {
                "method": "submit",
                "submitdata": JSON.stringify(submitdata)
            },
            dataType: "json",
            success: function (jsondata) {
                if (jsondata.status == "success") {
                    layer.alert('评价成功！', function () {
                        backHome();
                    });
                } else {
                    layer.alert(jsondata.status);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { layer.alert("submit=" + errorThrown); }
        });
    },
    GetStudentInfo: function (code) {
        jQuery.support.cors = true;
        $.ajax({
            type: "post",
            url: this.apiurl,
            data: {
                "method": "getstudentinfo",
                "code": code,
                "classguid": this.ClassGuid
            },
            dataType: "json",
            success: function (jsondata) {
                if (jsondata.status == "success") {
                    //下拉菜单联动
                    $("#" + jsondata.data.RowGuid).click();
                } else {
                    layer.alert(jsondata.status);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { layer.alert("submit=" + errorThrown); }
        });
    },
    GetLocalTime: function () {
        var mydate = new Date();
        $("#day").text(mydate.toLocaleDateString());
        var hour = mydate.getHours();
        var minute = mydate.getMinutes();
        $("#time").text(hour + ":" + minute);
    }
}

$(function () {
    evaluateApi.GetStudentList();
    evaluateApi.GetLocalTime();

    $(document).keydown(function (event) {
        if (event.keyCode == "13") {
            //回车执行查询
            evaluateApi.GetStudentInfo(evaluateApi.StudentCode);
            evaluateApi.StudentCode = "";
            layer.closeAll();
        } else {
            evaluateApi.StudentCode += String.fromCharCode(event.keyCode);
        }
    });
    
    evaluateApi.timer = setInterval(function () {
        evaluateApi.GetLocalTime();
    }, 30000);
});
