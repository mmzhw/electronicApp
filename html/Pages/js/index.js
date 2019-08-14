function chooseYear (rowguid) {
    window.location.href ='home.html?RowGuid='+rowguid;
}

var indexapi = {
    apiurl: Util.AjaxRUrl + "Class.ashx",
    GetClassList: function () {
        jQuery.support.cors = true;
        $.ajax({
            type: "post",
            url: this.apiurl,
            data: {
                "method": "getallclass"
            },
            dataType: "json",
            success: function (jsondata) {
                if (jsondata.status == "success") {
                    indexapi.BindClassList(jsondata.data,
                        $("#class"),
                        $("#class-Item"));
                } else {
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) { layer.alert("getallclass=" + errorThrown); }
        });
    },
    //�󶨰༶�б�
    BindClassList: function (jsondata,$list, $item) {
        var M = Mustache, activitylistTmpl = $item.html();
        
        $list.html(M.render(activitylistTmpl, jsondata));
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
    indexapi.GetClassList();
    indexapi.GetLocalTime();

    //30sһ�Σ�����ʱ��
    homeapi.timer = setInterval(function () {
        indexapi.GetLocalTime();
    }, 30000);
});
