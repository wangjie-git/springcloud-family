var heAdmissions = [];
var heAdmissionJts = [];
var heDrugs = [];
var heNpimmunizations = [];
var id = "";
$(function() {
    id = getParam("id");
    initArrayRemove();
    heAdmissions = [];
    heAdmissionJts = [];
    heDrugs = [];
    heNpimmunizations = [];
    $(".formDiv").css("height", window.screen.height - 30);
    initLayUi();
    customVerify();
    loadEmployees();
    setTimeout(initData, 2000);
});

function initData() {
    $.post("findById", {
        "id" : id
    }, function(data, status) {
        if (status == "success") {
            $("div[data-type='etconcept']").each(function() {
                var _this = $(this);
                var name = _this.attr('data-name');
                initMuCheckbox(name, data[name])
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

function removeAddmisson(id) {
    heAdmissions.removeId(id);
}

function removeAddmissionJt(id) {
    heAdmissionJts.removeId(id);
}

function removeDrug(id) {
    heDrugs.removeId(id);
}

function removeNpimmunization(id) {
    heNpimmunizations.removeId(id);
}

/**
 * 初始化数组删除方法
 *
 * @returns
 */
function initArrayRemove() {
    Array.prototype.removeId = function(id) {
        for (var i = 0; i < this.length; i++) {
            var obj = this[i];
            if (obj.id == id) {
                var j = 1;
                if (i != 0) {
                    j = i;
                }
                this.splice(i, j);
                break;
            }
        }
    }
}

/**
 * 修改入住院日期
 *
 * @param id
 * @param date
 * @param type
 * @returns
 */
function editHeAddDate(id, date, type) {
    if (heAdmissions != null && heAdmissions.length > 0) {
        for (var i = 0; i < heAdmissions.length; i++) {
            if (id == heAdmissions[i].id) {
                if (type == 'ADMISSION') {
                    heAdmissions[i].dateOfAdmission = date;
                }
                if (type == 'DISCHARGE') {
                    heAdmissions[i].dateOfDischarge = date;
                }
                break;
            }
        }
    }
}

/**
 * 编辑家庭病床日期
 *
 * @param id
 * @param date
 * @param type
 * @returns
 */
function editAdmiJtDate(id, date, type) {
    if (heAdmissionJts != null && heAdmissionJts.length > 0) {
        for (var i = 0; i < heAdmissionJts.length; i++) {
            if (id == heAdmissionJts[i].id) {
                if (type == 'ADMISSION') {
                    heAdmissionJts[i].dateOfAdmission = date;
                }
                if (type == 'DISCHARGE') {
                    heAdmissionJts[i].dateOfDischarge = date;
                }
                break;
            }
        }
    }
}

/**
 * 编辑对象
 *
 * @param obj
 * @returns
 */
function initObj(obj) {
    if (heAdmissions != null && heAdmissions.length > 0) {
        for (var i = 0; i < heAdmissions.length; i++) {
            if (obj.id == heAdmissions[i].id) {
                heAdmissions[i] = obj;
                break;
            }
        }
    }
}

/**
 * 编辑家庭病床
 *
 * @param obj
 * @returns
 */
function initAdmissionJt(obj) {
    if (heAdmissionJts != null && heAdmissionJts.length > 0) {
        for (var i = 0; i < heAdmissionJts.length; i++) {
            if (obj.id == heAdmissionJts[i].id) {
                heAdmissionJts[i] = obj;
                break;
            }
        }
    }
}

/**
 * 编辑用药
 *
 * @param obj
 * @returns
 */
function initHeDrug(obj) {
    if (heDrugs != null && heDrugs.length > 0) {
        for (var i = 0; i < heDrugs.length; i++) {
            if (obj.id == heDrugs[i].id) {
                heDrugs[i] = obj;
                break;
            }
        }
    }
}

/**
 * 编辑非计划预防接种
 *
 * @param obj
 * @returns
 */
function initHeNpimmunization(obj) {
    if (heNpimmunizations != null && heNpimmunizations.length > 0) {
        for (var i = 0; i < heNpimmunizations.length; i++) {
            if (obj.id == heNpimmunizations[i].id) {
                heNpimmunizations[i] = obj;
                break;
            }
        }
    }
}

/**
 * 添加对象
 *
 * @returns
 */
function addObj() {
    var index = 1;
    if (heAdmissions != null) {
        if (heAdmissions.length > 0) {
            index = heAdmissions.length + 1;
        }
        var myDate = new Date();
        var date = myDate.getFullYear() + "-" + myDate.getMonth() + "-"
                + myDate.getDate();
        ;
        var obj = {
            id : index,
            dateOfAdmission : date,
            dateOfDischarge : date,
            admissionCause : "",
            orgName : "",
            baNo : ""
        };
        heAdmissions.push(obj);
    }
    layui.use('table', function() {
        var table = layui.table;
        table.reload('demo', {
            data : heAdmissions
        });
    });
    initLayUiDate();
}

/**
 * 添加家庭病床对象
 *
 * @returns
 */
function addAdmissionJtObj() {
    var index = 1;
    if (heAdmissionJts != null) {
        if (heAdmissionJts.length > 0) {
            index = heAdmissionJts.length + 1;
        }
        var myDate = new Date();
        var date = myDate.getFullYear() + "-" + myDate.getMonth() + "-"
                + myDate.getDate();
        ;
        var obj = {
            id : index,
            dateOfAdmission : date,
            dateOfDischarge : date,
            admissionCause : "",
            orgName : "",
            baNo : ""
        };
        heAdmissionJts.push(obj);
    }
    layui.use('table', function() {
        var table = layui.table;
        table.reload('admissionJtTable', {
            data : heAdmissionJts
        });
    });
    initLayUiDate();
}

/**
 * 添加健康体检用药对象
 *
 * @returns
 */
function addHeDrugObj() {
    var index = 1;
    if (heDrugs != null) {
        if (heDrugs.length > 0) {
            index = heDrugs.length + 1;
        }
        var obj = {
            id : index,
            drugName : "",
            drugUseMeansCode : "",
            singleDose : "",
            drugUseTime : "",
            drugUseLaw : ""
        };
        heDrugs.push(obj);
    }
    layui.use('table', function() {
        var table = layui.table;
        table.reload('ehrHeDrugTable', {
            data : heDrugs
        });
    });
}

function addHeNpimmunizationObj() {
    var index = 1;
    if (heNpimmunizations != null) {
        if (heNpimmunizations.length > 0) {
            index = heNpimmunizations.length + 1;
        }
        var obj = {
            id : index,
            npimmunizationName : "",
            vaccinationDate : "",
            orgName : "",
        };
        heNpimmunizations.push(obj);
    }
    layui.use('table', function() {
        var table = layui.table;
        table.reload('ehrHeNpimmunization', {
            data : heNpimmunizations
        });
    });
}

function initLayUi() {
    initLayUiTab();
    initLayUiDate();
    initLayUiTable();
    layui.use([ 'form' ], function() {
        var form = layui.form;
        // 监听提交
        form.on('submit(saveExam)', function(data) {
            var flag = submitVeriry();
            if(flag){
                var sym = "";
                var param = JSON.stringify(data.field);
                var obj = JSON.parse(param);
                $("div[data-type='etconcept']").each(
                        function() {
                            var _this = $(this);
                            var name = _this.attr('data-name');
                            var codes = "";
                            $("input:checkbox[name='" + name + "']:checked").each(
                                    function() {
                                        codes += $(this).val() + ",";
                                    });
                            if (codes != null && codes != "") {
                                codes = codes.substring(0, codes.length - 1);
                            }
                            obj[name] = codes;
                        });
                obj["heAdmissions"] = heAdmissions;
                obj["heAdmissionJts"] = heAdmissionJts;
                obj["heDrugs"] = heDrugs;
                obj["heNpimmunizations"] = heNpimmunizations;
                var params2 = JSON.stringify(obj);
                $.ajax({
                    url : "saveOrUpdateExam",
                    type : "POST",
                    contentType : 'application/json;charset=utf-8',
                    dataType : "json",
                    data : params2,
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
 * 初始化表格
 *
 * @returns
 */
function initLayUiTable() {
    layui.use('table', function() {
        var table = layui.table;
        // 展示已知数据
        table.render({
            elem : '#demo',
            height : 150,
            cols : [ [ // 标题栏
                    {
                        field : 'id',
                        title : '序号',
                        width : 70,
                        edit : 'text'
                    },
                    {
                        field : 'dateOfAdmission',
                        title : '住院日期',
                        width : 120,
                        templet : function(d) {
                            return '<a title="myDate" type="ADMISSION" id="'
                                    + d.id + '">' + d.dateOfAdmission + '</a>'
                        }
                    },
                    {
                        field : 'dateOfDischarge',
                        title : '出院日期',
                        width : 120,
                        templet : function(d) {
                            return '<a title="myDate" type="DISCHARGE" id="'
                                    + d.id + '">' + d.dateOfDischarge + '</a>'
                        }
                    }, {
                        field : 'admissionCause',
                        title : '原因',
                        width : 180,
                        edit : 'text'
                    }, {
                        field : 'orgName',
                        title : '医疗机构名称',
                        width : 180,
                        edit : 'text'
                    }, {
                        field : 'baNo',
                        title : '病案号',
                        width : 150,
                        edit : 'text'
                    }, {
                        fixed : 'right',
                        title : '操作',
                        width : 87,
                        align : 'center',
                        toolbar : '#barDemo'
                    } ] ],
            data : heAdmissions
            // ,skin: 'line' //表格风格
            ,
            even : true
        // ,page: true //是否显示分页
        // ,limits: [5, 7, 10]
        // ,limit: 5 //每页默认显示的数量
        });
        table.on('edit(heAdmissionTable)', function(obj) {
            initObj(obj.data);
        });
        // 监听单元格编辑
        table.on('edit(heAdmissionTable)', function(obj) {
            var value = obj.value // 得到修改后的值
            , data = obj.data // 得到所在行所有键值
            , field = obj.field; // 得到字段
        });
        table.on('tool(heAdmissionTable)', function(obj) {
            var data = obj.data;
            if (obj.event === 'del') {
                layer.confirm('真的删除行么', function(index) {
                    removeAddmisson(data.id);
                    obj.del();
                    layer.close(index);
                });
            }
        });
        initAdmissionJtTable(table);
        initHeDrug(table);
        initHeNpimmunization(table);
    });
}

/**
 * 初始化家庭病床表格
 *
 * @param table
 * @returns
 */
function initAdmissionJtTable(table) {
    // 展示已知数据
    table.render({
        elem : '#admissionJtTable',
        height : 150,
        cols : [ [ // 标题栏
                {
                    field : 'id',
                    title : '序号',
                    width : 70,
                    edit : 'text'
                },
                {
                    field : 'dateOfAdmission',
                    title : '住院日期',
                    width : 120,
                    templet : function(d) {
                        return '<a title="admiJtDate" type="ADMISSION" id="'
                                + d.id + '">' + d.dateOfAdmission + '</a>'
                    }
                },
                {
                    field : 'dateOfDischarge',
                    title : '出院日期',
                    width : 120,
                    templet : function(d) {
                        return '<a title="admiJtDate" type="DISCHARGE" id="'
                                + d.id + '">' + d.dateOfDischarge + '</a>'
                    }
                }, {
                    field : 'admissionCause',
                    title : '原因',
                    width : 180,
                    edit : 'text'
                }, {
                    field : 'orgName',
                    title : '医疗机构名称',
                    width : 180,
                    edit : 'text'
                }, {
                    field : 'baNo',
                    title : '病案号',
                    width : 150,
                    edit : 'text'
                }, {
                    fixed : 'right',
                    title : '操作',
                    width : 87,
                    align : 'center',
                    toolbar : '#admissionJtBar'
                } ] ],
        data : heAdmissions
        // ,skin: 'line' //表格风格
        ,
        even : true
    // ,page: true //是否显示分页
    // ,limits: [5, 7, 10]
    // ,limit: 5 //每页默认显示的数量
    });
    table.on('edit(heAdmissionJtTable)', function(obj) {
        initAdmissionJt(obj.data);
    });
    table.on('tool(heAdmissionJtTable)', function(obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('真的删除行么', function(index) {
                removeAddmissionJt(data.id);
                obj.del();
                layer.close(index);
            });
        }
    });
}

/**
 * 初始化体检用药表格
 *
 * @param table
 * @returns
 */
function initHeDrug(table) {
    // 展示已知数据
    table.render({
        elem : '#ehrHeDrugTable',
        height : 150,
        cols : [ [ // 标题栏
        {
            field : 'id',
            title : '序号',
            width : 70,
            edit : 'text'
        }, {
            field : 'drugName',
            title : '药品名称',
            width : 240,
            edit : 'text'
        }, {
            field : 'drugUseMeansCode',
            title : '用法',
            width : 120,
            edit : 'text'
        }, {
            field : 'singleDose',
            title : '用量',
            width : 120,
            edit : 'text'
        }, {
            field : 'drugUseTime',
            title : '用药时间',
            width : 120,
            edit : 'text'
        }, {
            field : 'drugUseLaw',
            title : '服药依从性',
            width : 120,
            edit : 'text'
        }, {
            fixed : 'right',
            title : '操作',
            width : 100,
            align : 'center',
            toolbar : '#heDrugBar'
        } ] ],
        data : []
        // ,skin: 'line' //表格风格
        ,
        even : true
    // ,page: true //是否显示分页
    // ,limits: [5, 7, 10]
    // ,limit: 5 //每页默认显示的数量
    });
    table.on('edit(heDrugTable)', function(obj) {
        initHeDrug(obj.data);
    });
    table.on('tool(heDrugTable)', function(obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('真的删除行么', function(index) {
                removeDrug(data.id);
                obj.del();
                layer.close(index);
            });
        }
    });
}

/**
 * 初始化非计划疫苗接种表格
 *
 * @param table
 * @returns
 */
function initHeNpimmunization(table) {
    // 展示已知数据
    table.render({
        elem : '#ehrHeNpimmunization',
        height : 150,
        cols : [ [ // 标题栏
        {
            field : 'id',
            title : '序号',
            width : 70,
            edit : 'text'
        }, {
            field : 'npimmunizationName',
            title : '名称',
            width : 240,
            edit : 'text'
        }, {
            field : 'vaccinationDate',
            title : '日期',
            width : 120,
            edit : 'text'
        }, {
            field : 'orgName',
            title : '接种机构',
            width : 240,
            edit : 'text'
        }, {
            fixed : 'right',
            title : '操作',
            width : 100,
            align : 'center',
            toolbar : '#heNpimmunizationBar'
        } ] ],
        data : []
        // ,skin: 'line' //表格风格
        ,
        even : true
    // ,page: true //是否显示分页
    // ,limits: [5, 7, 10]
    // ,limit: 5 //每页默认显示的数量
    });
    table.on('edit(heNpimmunizationTable)', function(obj) {
        initHeNpimmunization(obj.data);
    });
    table.on('tool(heNpimmunizationTable)', function(obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('真的删除行么', function(index) {
                removeNpimmunization(data.id);
                obj.del();
                layer.close(index);
            });
        }
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
        laydate.render({
            elem : '#visitingTime', // 指定元素
            type : 'date',
            max : 0
        });
        $.each($("a[title='myDate']"), function() {
            var id = this.id;
            var type = this.type;
            laydate.render({
                elem : this,
                type : 'date',
                max : 0,
                done : function(value, date) {
                    editHeAddDate(id, value, type);
                }
            });
        });
        $.each($("a[title='admiJtDate']"), function() {
            var id = this.id;
            var type = this.type;
            laydate.render({
                elem : this,
                type : 'date',
                max : 0,
                done : function(value, date) {
                    editHeAddDate(id, value, type);
                }
            });
        });
    });
}
/**
 * 初始化tab页
 *
 * @returns
 */
function initLayUiTab() {
    layui.use('element', function() {
        var element = layui.element;
        // 监听Tab切换，以改变地址hash值
        element.on('tab(examTab)', function() {
            $.each($(".layui-tab-title li"), function() {
                $(this).removeClass("epd");
            })
            $.each($(".layui-tab-title li"), function() {
                $(this).addClass("ep");
            })
            $(this).addClass("epd");
        });
    });
}