$(function() {
    init();
});

/**
 * 初始化方法
 * @returns
 */
function init() {
    $('input').iCheck({
        checkboxClass : 'icheckbox_flat-green',
        radioClass : 'iradio_flat-green'
    });
    $('#hcheckall').on('ifChecked', function(event) {
        $('.hc').iCheck('check');
    });
    $('#hcheckall').on('ifUnchecked', function(event) {
        $('.hc').iCheck('uncheck');
    });
    $('input[name="isRequired"]').on('ifChecked', function(event){
        $(this).attr("value","Y");
    });
    $(".mr").hide();
    var selects = $(".mySelect");
    if (selects != null && selects.length > 0) {
        for (var i = 0; i < selects.length; i++) {
            var name = selects[i].name;
            $(selects[i]).change(function() {
                changeType(name);
            });
        }
    }
    var inputs = $(".myInput");
    if (inputs != null && inputs.length > 0) {
        for (var i = 0; i < inputs.length; i++) {
            var name = inputs[i].name;
            var title = inputs[i].title;
            $(inputs[i]).blur(function() {
                verified(name, title);
            });
        }
    }
    $.fn.serializeJson = function () {
        var data = {};
        var resultJson = [];
        var obj = {};
        var i= 0;
        var array = this.serializeArray();
        if(array != null && array.length > 0){
            $(array).each(function () {
                if(this.name =="formName" ||this.name =="isAdd"
                     ||this.name =="isEdit" ||this.name =="isDownload"
                         ||this.name =="isClose" ||this.name =="isSelfMotionNew"){
                    data[this.name] = this.value;
                }
                if(this.name=="index"){
                    obj = {};
                    resultJson[i] = obj;
                    i++;
                }
                else{
                    obj[this.name]=this.value;
                }
            });
        }
        data["fields"]=resultJson;
        return data;
    };
}

function saveConfig() {
    var isAdd = $("#hisAdd")[0].checked;
    var hisEdit = $("#hisEdit")[0].checked;
    var hisDownload = $("#hisDownload")[0].checked;
    var hisClose = $("#hisClose")[0].checked;
    var hisSelfMotionNew = $("#hisSelfMotionNew")[0].checked;
    var health = {
        "isAdd" : isAdd == true ? "Y" : "N",
        "isEdit" : hisEdit == true ? "Y" : "N",
        "isDownload" : hisDownload == true ? "Y" : "N",
        "isClose" : hisClose == true ? "Y" : "N",
        "isSelfMotionNew" : hisSelfMotionNew == true ? "Y" : "N"
    };
    var isRequired = $("#HhisRequired")[0].checked;
    var type = $("#Hhtype").val();
    var length = $("#Hhlength").val();
    var radixPoint = $("#HhradixPoint").val();
    var healthfileNo = {
        "isRequired" : isRequired == true ? "Y" : "N",
        "type" : type,
        "length" : length,
        "radixPoint" : radixPoint
    };
    health.healthfileNo = healthfileNo;
    var mainConfigDto = {};
    mainConfigDto.health = health;
    var param = JSON.stringify(mainConfigDto);
    $.ajax({
        url : "saveConfigs",
        type : "POST",
        contentType : 'application/json;charset=utf-8', // 设置请求头信息
        dataType : "json",
        data : param, // 将Json对象序列化成Json字符串，toJSON()需要引用jquery.json.min.js
        success : function(data) {
            // alert(data);
        },
        error : function(res) {
            // alert(res.responseText);
        }
    });
}
function changeType(id) {
    var type = $("#" + id + "type").val();
    if (type == "D") {
        $("#" + id + "length").val("");
        $("#" + id + "radixPoint").val("");
        $("#" + id + "length").attr("disabled", true);
        $("#" + id + "radixPoint").attr("disabled", true);
    } else if (type == "S") {
        $("#" + id + "radixPoint").val("");
        $("#" + id + "length").attr("disabled", false);
        $("#" + id + "radixPoint").attr("disabled", true);
    } else if (type == "I") {
        $("#" + id + "length").attr("disabled", false);
        $("#" + id + "radixPoint").attr("disabled", false);
    }
}

function verified(id, lb) {
    var type = $("#" + id + "type").val();
    if (type == "S") {
        var length = $("#" + id + "length").val();
        if (length > 4000) {
            $("#" + id + "Message1").show();
        } else {
            $("#" + id + "Message1").hide();
        }
    } else if (type == "I") {
        if (lb == "L") {
            var length = $("#" + id + "length").val();
            if (length > 12) {
                $("#" + id + "Message1").show();
            } else {
                $("#" + id + "Message1").hide();
            }
        } else if (lb == "R") {
            var length = $("#" + id + "length").val();
            var radix = $("#" + id + "radixPoint").val();
            if (radix > length) {
                $("#" + id + "Message2").show();
            } else {
                $("#" + id + "Message2").hide();
            }
        }
    }
}

function save(){
    var fields = $("#configForm").serializeJson();
    var param = JSON.stringify(fields);
    $.ajax({
        url : "saveConfigs",
        type : "POST",
        contentType : 'application/json;charset=utf-8', // 设置请求头信息
        dataType : "json",
        data : param, // 将Json对象序列化成Json字符串，toJSON()需要引用jquery.json.min.js
        success : function(data) {
            window.location = xpath + "config/ehrHedrug";
            alert("保存健康档案配置成功!");
        },
        error : function(res) {
            alert("保存健康档案配置失败!");
        }
    });
}

function cutConfigTab(id){
    $("#jkda").removeClass("hcactive");
    $("#jwsxs").removeClass("hcactive");
    $("#jwbs").removeClass("hcactive");
    $("#jwjzs").removeClass("hcactive");
    $("#ss").removeClass("hcactive");
    $("#ws").removeClass("hcactive");
    $("#jktj").removeClass("hcactive");
    $("#ryqk").removeClass("hcactive");
    $("#fjhmyjzs").removeClass("hcactive");
    $("#yyqk").removeClass("hcactive");
    $("#tnbgl").removeClass("hcactive");
    $("#gxygl").removeClass("hcactive");
    $("#tnbsf").removeClass("hcactive");
    $("#gxysf").removeClass("hcactive");
    $("#" + id).addClass("hcactive");
}

function setDefault(){
    showModal("healthConfirm");
}

function cancleEdit(){
    showModal("cancleEditConfirm");
}

function doconfirm(){
    window.location = xpath + "config/loadEhrHedrug";
}

function doEditConfirm(){
    window.location = xpath + "config/ehrHedrug";
}

function closeEditConfirmModal(){
    closeModal("cancleEditConfirm");
}

function closeUrlModal(){
    closeModal("healthConfirm");
}
