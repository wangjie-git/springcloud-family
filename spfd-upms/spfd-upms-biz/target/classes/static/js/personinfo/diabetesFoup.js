
var healthfileNo = "";
var id = "";
$(function() {
    healthfileNo = getParam("healthfileNo");
    id = getParam("id");
    $(".formDiv").css("height", window.screen.height - 135);
    initLayUi();
    customVerify();
    loadEmployees();
    setTimeout(initData, 2000);
});

function initData() {
    $.post("findDiabeteFulpById", {
        "id" : id
    }, function(data, status) {
        if (status == "success") {
            $("#followUpDoctorCode").val(data.followUpDoctorCode);
           $("div[data-type='EtRADIO']").each(function() {
               var _this = $(this);
               var name = _this.attr('data-name');
               var value = data[name];
               var objs = document.getElementsByName(name);
               if (objs != null && objs.length > 0) {
                   for (var i = 0; i < objs.length; i++) {
                       var _this = $(objs[i]);
                       var v = _this.attr("value");
                       if (v == value) {
                           _this.attr("checked", "checked");
                           break;
                       }
                   }
               }
           });
           layui.use('form', function() {
               var form = layui.form;
               form.render();
           });
        }
    });
}

function initMuCheckbox(name, value) {
    if (value != null && value != "") {
        var obj = document.getElementsByName(name);
        if (obj != null && obj.length > 0) {
            var values = value.split(",");
            for (var i = 0; i < obj.length; i++) {
                var _this = $(obj[i]);
                var v = _this.attr("value");
                if (values != null && values.length > 0) {
                    for (var j = 0; j < values.length; j++) {
                        if (v == values[j]) {
                            _this.attr("checked", "checked");
                            break;
                        }
                    }
                }
            }
        }
    }
}

function loadEmployees() {
    // 加载基本字典
    $.post("../heRecord/queryEmployees", {}, function(data, status) {
        if (status == "success") {
            var option = "<option value=''></option>";
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    option += "<option value=" + data[i].dictionCode + ">"
                            + data[i].dictionName + "</option>";
                }
                $("select[data-type='EMP']").each(function() {
                    var _this = $(this);
                    var id = _this.attr("id");
                    var filter = _this.attr("lay-filter");
                    $("#" + id).html(option);
                    layui.use('form', function() {
                        var form = layui.form;
                        form.render('select', 'employee');
                        var currentEmpId = $("#currentEmpId").val();
                        $("#" + id).val(currentEmpId);
                        form.render();
                    });
                });
            }
        }
    });
}

function customVerify() {
    $("input[type='text']").bind("blur", function() {
        var verify = $(this).attr("verify");
        var title = $(this).attr("title");
        var value = $(this).val();
        if (verify != undefined && verify != null && verify != "") {
            if (verify == "REQUIRED") {
                verifyRequired($(this), value, title);
            }
            if (verify == "NUMBER") {
                verifyNumber($(this), value, title);
            }
            if (verify == "FLOAT") {
                verifyFloat($(this), value, title);
            }
        }
    });
    $("input[type='text']").bind("input propertychange", function() {
        $(this).removeClass("error");
        var verify = $(this).attr("verify");
        var title = $(this).attr("title");
        var value = $(this).val();
        if (verify != undefined && verify != null && verify != "") {
            if (verify == "REQUIRED") {
                verifyRequired($(this), value, title);
            }
        }
    });
}

function submitVeriry(){
      var flag = true;
     $("input[type='text']").each(function() {
            var verify = $(this).attr("verify");
            var title = $(this).attr("title");
            var value = $(this).val();
            if (verify != undefined && verify != null && verify != "") {
                if (verify == "REQUIRED") {
                    var verify = verifyRequired($(this), value, title);
                    if(flag != true || verify != true){
                        flag = false;
                    }
                }
                if (verify == "NUMBER") {
                     var verify = verifyNumber($(this), value, title);
                     if(flag != true || verify != true){
                         flag = false;
                     }
                }
                if (verify == "FLOAT") {
                     var verify = verifyFloat($(this), value, title);
                     if(flag != true || verify != true){
                         flag = false;
                     }
                }
            }
        });
     return flag;
}

function verifyRequired(obj, value, msg) {
    if (value == undefined || value == null || value == "") {
        obj.removeClass("pass");
        obj.addClass("error");
        obj.attr("placeholder", msg + '不能为空!')
        return false;
    } else {
        obj.removeClass("error");
        obj.addClass("pass");
        return true;
    }
}

function verifyNumber(obj, value, msg) {
    if (value != undefined && value != null && value != "") {
        var reg = new RegExp("^[0-9]*$");
        if (!reg.test(value)) {
            obj.removeClass("pass");
            obj.addClass("error");
            obj.val("");
            layer.msg(msg + '只允许输入数字');
            return false;
        }
        if (!/^[0-9]+$/.test(value)) {
            obj.removeClass("pass");
            obj.addClass("error");
            obj.val("");
            layer.msg(msg + '只允许输入数字');
            return false;
        }
        obj.removeClass("error");
        obj.addClass("pass");
        return true;

    } else {
        obj.removeClass("error");
        obj.removeClass("pass");
        return true;
    }
}

function verifyFloat(obj, value, msg) {
    if (value != undefined && value != null && value != "") {
        var reg = new RegExp("^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$");
        if (!reg.test(value)) {
            obj.removeClass("pass");
            obj.addClass("error");
            obj.val("");
            layer.msg(msg + '请输入整数或者带小数点的数字');
            return false;
        }
        if (!/^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/.test(value)) {
            obj.removeClass("pass");
            obj.addClass("error");
            obj.val("");
            layer.msg(msg + '请输入整数或者带小数点的数字');
            return false;
        }
        obj.removeClass("error");
        obj.addClass("pass");
        return true;

    } else {
        obj.removeClass("error");
        obj.removeClass("pass");
        return true;
    }
}

function initLayUi() {
    initLayUiDate();
    layui.use(['form' ], function() {
        var form = layui.form;
        // 监听提交
        form.on('submit(saveExam)', function(data) {
            var param = JSON.stringify(data.field);
            var flag = submitVeriry();
           if(flag){
                var param = JSON.stringify(data.field);
                //var obj = JSON.parse(param);
                $.ajax({
                    url : "saveOrUpdateDiabeteFoUp",
                    type : "POST",
                    contentType : 'application/json;charset=utf-8',
                    dataType : "json",
                    data : param,
                    success : function(data) {
                        layer.alert('保存数据成功', {
                            title : '提示信息'
                        })
                    },
                    error : function(res) {
                        layer.alert("保存失败!", {
                            title : '提示信息'
                        })
                    }
                });
            }
        });
    });
}

/**
 * 初始化日期
 *
 * @returns
 */
function initLayUiDate() {
    layui.use('laydate', function() {
        var laydate = layui.laydate;
        $.each($("input[title='myDate']"), function() {
            var id = this.id;
            var type = this.type;
            laydate.render({
                elem : this,
                type : 'date',
                max : 0,
                value:new Date()
            });
        });
    });
}