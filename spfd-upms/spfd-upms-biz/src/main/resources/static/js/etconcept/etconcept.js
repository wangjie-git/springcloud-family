//加载编码体系数据
function loadEtconcept() {
    $('#schemeTable').bootstrapTable({
        method : 'POST',
        url : "findEtCodingSchemesByCondition",
        striped : true,
        pagination : true,
        pageList : [ 10, 20, 50, 100 ],
        "queryParamsType" : "limit",
        dataType : "json",
        sidePagination : 'server',
        contentType : "application/x-www-form-urlencoded",
        showRefresh : true,
        clickToSelect : true,
        singleSelect : true,
        search : true
    });

    $("#schemeTabBar").bind('click',function(){
        $("#schemeTabBar").addClass('active');
        $("#schemeTab").show();
        $("#etVersionTabBar").removeClass('active');
        $("#etVersionTab").hide();
        $("#etConceptTabBar").removeClass('active');
        $("#etConceptTab").hide();
    })

    $("#etVersionTabBar").bind('click',function(){
        $("#schemeTabBar").removeClass('active');
        $("#schemeTab").hide();
        $("#etVersionTabBar").addClass('active');
        $("#etVersionTab").show();
        $("#etConceptTabBar").removeClass('active');
        $("#etConceptTab").hide();
        $('#etVersionTable').bootstrapTable({
            method : 'POST',
            url : "findEtVersionByCondition",
            striped : true,
            pagination : true,
            pageList : [ 10, 20, 50, 100 ],
            "queryParamsType" : "limit",
            dataType : "json",
            sidePagination : 'server',
            contentType : "application/x-www-form-urlencoded",
            showRefresh : true,
            clickToSelect : true,
            singleSelect : true,
            search : true
        });
        var codingSchemeHTML = "<option value=''>请选择编码体系</value>";
        $.get("findAllCodingSchemes",{},function(data, status){
            if (status == "success") {
                for (var i=0;i<data.length;i++) {
                    codingSchemeHTML += "<option value='" + data[i].id + "'>" + data[i].codingschemeDesc + "</option>"
                }
                $("#v_codingschemeId").html(codingSchemeHTML);
            }
        });
    });
    $("#etConceptTabBar").bind('click', function() {
        $("#schemeTabBar").removeClass('active');
        $("#schemeTab").hide();
        $("#etVersionTabBar").removeClass('active');
        $("#etVersionTab").hide();
        $("#etConceptTabBar").addClass('active');
        $("#etConceptTab").show();
        $('#etConceptTable').bootstrapTable({
            method : 'POST',
            url : "findEtConceptsByCondition",
            striped : true,
            pagination : true,
            pageList : [ 10, 20, 50, 100 ],
            "queryParamsType" : "limit",
            dataType : "json",
            sidePagination : 'server',
            contentType : "application/x-www-form-urlencoded",
            showRefresh : true,
            clickToSelect : true,
            singleSelect : true,
            search : true
        });
        var codingSchemeHTML = "<option value=''>请选择编码体系</value>";
        $.get("findAllCodingSchemes",{},function(data, status){
            if (status == "success") {
                for (var i=0;i<data.length;i++) {
                    codingSchemeHTML += "<option value='" + data[i].id + "'>" + data[i].codingschemeDesc + "</option>"
                }
                $("#et_codingSchemeId").html(codingSchemeHTML);
            }
        });
        var codingSchemeId = $("#et_codingSchemeId").val();
        var versionHTML = "<option value=''>请选择版本</value>";
        if (codingSchemeId == "") {
            $("#et_versionId").html(versionHTML);
        } else {
            $.get("findVersionByCodingSchemeById?codingSchemeId=" + codingSchemeId,{},
                    function(data,status) {
                if (status == "success") {
                    for (var i=0;i<data.length;i++) {
                        versionHTML += "<option value='" + data[i].id + "'>" + data[i].versionName + "</option>";
                    }
                    $("#et_versionId").html(versionHTML);
                }

            });
        }
    });
}

function addCodingScheme() {
    showModal("codingSchemeModal");
}

function updateCodingScheme() {
    var getSelectedValue = $("#schemeTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {
        showModal("codingSchemeModal");
        var codingScheme = getSelectedValue[0];
        $("#codingSchemeId").val(codingScheme.id);
        $("#codingschemeName").val(codingScheme.codingschemeName);
        $("#codingschemeDesc").val(codingScheme.codingschemeDesc);
        $("#editableFlag").val(codingScheme.editableFlag);
    }

}

function closeCodingSchemeModal() {
    closeModal("codingSchemeModal");
    $("#codingSchemeId").val("");
    $("#codingschemeName").val("");
    $("#codingschemeDesc").val("");
    $("#editableFlag").val("Y");
}

/**
 * 保存修改用户信息
 */
function saveOrUpdateCodingScheme() {
    var data = $("#codingSchemeForm").serialize();
    if (!checkForLength($("#codingschemeName").val(), "体系编码", 16, 32)) {
		return;
	}
    $.post("saveOrUpdateCodingScheme", data, function(data, status) {
        if (status == "success") {
            if (data.msgCode == "10000") {
                msg(data.msgText, "success");
                $('#schemeTable').bootstrapTable('refresh');
                closeCodingSchemeModal();
            } else {
                msg(data.msgText, "error");
                return;
            }
        } else {
            msg("保存失败!", "error");
        }
    });
}

function deleteCodingScheme() {
    var getSelectedValue = $("#schemeTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {
        var id = getSelectedValue[0].id;
        qiao.bs.confirm({
            title : '<font color="red">提示</font>',
            type : 'warning',
            msg: '确认删除编号为 <font color="#3C8DBC">' + getSelectedValue[0].codingschemeName + "</font>的编码体系吗?"},
            function () {
                $.post("deleteCodingScheme", {id:id}, function(data, status) {
                    if (status == "success") {
                        msg("删除成功", "success");
                        $('#schemeTable').bootstrapTable('refresh');
                    } else {
                        msg("删除失败", "error");
                    }
                });
            }
        );
    }
}

function addEtVersion() {
    showModal("etVersionModal");
}

function updateEtVersion() {

    var getSelectedValue = $("#etVersionTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {
        showModal("etVersionModal");
        var etVersion = getSelectedValue[0];
        $("#versionId").val(etVersion.id);
        $("#versionName").val(etVersion.versionName);
        $("#versionDesc").val(etVersion.versionDesc);
        $("#statusCode").val(etVersion.statusCode);
        $("#v_codingschemeId").val(etVersion.codingschemeId);
    }
}

/**
 * 保存或者修改版本信息
 */
function saveOrUpdateEtVersion() {
    var data = $("#etVersionForm").serialize();
    $.post("saveOrUpdateEtVersion",data, function(data, status){
        if (status == "success") {
            if (data.msgCode == "10000") {
                msg(data.msgText, "success");
                closeEtVersionModal();
                $('#etVersionTable').bootstrapTable('refresh');
            } else {
                msg(data.msgText, "error");
                return;
            }
        }
        else {
            msg("保存失败", "error");
            return;
        }
    });
}
function closeEtVersionModal() {
    closeModal("etVersionModal");
    $("#versionId").val("");
    $("#versionName").val("");
    $("#versionDesc").val("");
    $("#v_codingschemeId").val("");
    $("#statusCode").val("A");
}

/**
 * 删除版本信息
 */
function deleteEtVersion() {
    var getSelectedValue = $("#etVersionTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {
        var id = getSelectedValue[0].id;
        qiao.bs.confirm({
            title : '<font color="red">提示</font>',
            type : 'warning',
            msg: '确认删除 <font color="#3C8DBC">' + getSelectedValue[0].codingschemeDesc + "</font>的<font color='#3C8DBC'>"
            + getSelectedValue[0].versionName +"</font>版本吗?"},
            function () {
                $.get("deleteEtVersion?id=" + id,function(data, status) {
                    if (status == "success") {
                        msg("删除成功", "success");
                        $('#etVersionTable').bootstrapTable('refresh');
                    } else {
                        msg("删除失败", "error");
                    }
                });
            }
        );
    }
}

function addEtConcept() {
    showModal("etConceptsModal");
}

function findVersion() {
    var codingSchemeId = $("#et_codingSchemeId").val();
    var versionHTML = "<option value=''>请选择版本</value>";;
    if (codingSchemeId == "") {
        $("#et_versionId").html(versionHTML);
    } else {
        $.get("findVersionByCodingSchemeById?codingSchemeId=" + codingSchemeId,{},
                function(data,status) {
            if (status == "success") {
                for (var i=0;i<data.length;i++) {
                    versionHTML += "<option value='" + data[i].id + "'>" + data[i].versionName + "</option>";
                }
                $("#et_versionId").html(versionHTML);
            }
        });
    }
}

function updateEtConcept() {
    var getSelectedValue = $("#etConceptTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {
        showModal("etConceptsModal");
        var data = getSelectedValue[0];
        var versionId = data.versionId;
        $("#etConceptsId").val(data.id);
        $("#et_codingSchemeId").val(data.codingSchemeId);
        var versionHTML = "<option value=''>请选择版本</value>";;
        if (codingSchemeId == "") {
            $("#et_versionId").html(versionHTML);
        } else {
            $.get("findVersionByCodingSchemeById?codingSchemeId=" + data.codingSchemeId,{},
                    function(data,status) {
                if (status == "success") {
                    for (var i=0;i<data.length;i++) {
                        versionHTML += "<option value='" + data[i].id + "'>" + data[i].versionName + "</option>";
                    }
                    $("#et_versionId").html(versionHTML);
                    $("#et_versionId").val(versionId);
                }
            });
        }
        $("#et_versionId").val(data.versionId);
        $("#conceptCode").val(data.conceptCode);
        $("#conceptDesc").val(data.conceptDesc);
        $("#et_statusCode").val(data.statusCode);
    }
}

function closeEtConceptsModal() {
    closeModal("etConceptsModal");
    $("#et_codingSchemeId").val("");
    $("#et_versionId").val("");
    $("#conceptCode").val("");
    $("#conceptDesc").val("");
    $("#et_statusCode").val("A");
}

function saveOrUpdateEtConcetps() {
    var data = $("#etConceptsForm").serialize();
    $.post("saveOrUpdateEtConcetps",data,function(data, status) {
        if (status == "success") {
            if (data.msgCode == "10000") {
                msg(data.msgText, "success");
                $('#etConceptTable').bootstrapTable('refresh');
                closeEtConceptsModal();
            } else {
                msg(data.msgText, "warning");
            }
        } else {
            msg("保存失败!", "warning");
        }
    });
}

function deleteEtConcept() {
    var getSelectedValue = $("#etConceptTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {
        var id = getSelectedValue[0].id;
        qiao.bs.confirm({
            title : '<font color="red">提示</font>',
            type : 'warning',
            msg: '确认删除 <font color="#3C8DBC">' + getSelectedValue[0].conceptDesc + "</font>字典吗?"},
            function () {
                $.get("deleteEtConcepts?id=" + id,function(data, status) {
                    if (status == "success") {
                        msg("删除成功", "success");
                        $('#etConceptTable').bootstrapTable('refresh');
                    } else {
                        msg("删除失败", "error");
                    }
                });
            }
        );
    }
}

function parseStatus(value, row, index) {
    if (value == "A") {
        return "是";
    }
    return "<font style='color:red'>否</font>"
}
