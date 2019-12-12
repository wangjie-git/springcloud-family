
function loadRemoteTable() {
    $('#remoteTable').bootstrapTable({
        method : 'POST',
        url : "initData",
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
         showColumns: true,
        search : true
    });
    loadOrg();
}

var orgExpert = null;

function loadOrg() {
    //请求数据
    $.post('loadOrg', {},
            function(data,status){
                if (status == "success") {
                    orgExpert = data;
                    initData();
                }
            });
}

function initData() {
    $("#zdorgId").empty();
    $("#zdorgDoctorId").empty();
    var expertsList = orgExpert.expertsList;
    var option = $("<option>").val("").text("请选择机构");
    $("#zdorgId").append(option);
    var optiond = $("<option>").val("").text("请选择人员");
    $("#zdorgDoctorId").append(optiond);
    for (var i = 0; i < expertsList.length; i ++) {
        var options = $("<option>").val(expertsList[i].orgId).text(expertsList[i].orgName);
        $("#zdorgId").append(options);
    }
}

function selectOrgDoctor(){
    $("#zdorgDoctorId").empty();
	var orgId = $("#zdorgId").val();
    var expertsList = orgExpert.expertsList;
	for (var i = 0; i < expertsList.length; i ++) {
        if (orgId == expertsList[i].orgId) {
            var myExpertsList = expertsList[i].expertsList;
            var option = $("<option>").val("").text("请选择人员");
            $("#zdorgDoctorId").append(option);
            for (var j = 0; j < myExpertsList.length; j ++) {
                var options = $("<option>").val(myExpertsList[j].key).text(myExpertsList[j].value);
                $("#zdorgDoctorId").append(options);
            }
        }
    }
}

function selectOrgExpert(orgId, expertId) {
    if (orgExpert != null) {
        var expertsList = orgExpert.expertsList;
        //机构为空就不变机构
        if (orgId != null) {

            $("#orgId").val(orgId);
        }
        if (expertId != null) {
            $("#orgDoctorId").val(expertId);
        }
    }
}

function remoteDoctor() {
    var getSelectedValue = $("#remoteTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {
        showModal("remoteModal");
    }
}

function operateFormatter(value, row, index) {
	var isArrange = row.isArrange;
	var isDiagnosis = row.isDiagnosis;
	var back = "";
	if (!isArrange) {
		back = "<a href='#' onclick=\"selectDoctor('" + value + "')\">分配专家</a>&nbsp;&nbsp;";
	}
	else if(!isDiagnosis) {
		back = "<a href='#' onclick=\"selectDoctor('" + value + "')\">分配专家</a>&nbsp;&nbsp;";
	}
	back = back + "<a href='../heartImage/jumpRemoteDiagnosis?role=gly&id=" + value + "' target='_blank'>查看详情</a>";
	return back;
}


function selectDoctor(rowId, doctorId){
	showModal("remoteModal");
	$("#applyId").val(rowId);
	var rows = $('#remoteTable').bootstrapTable('getData');
    var row;
    for(var i=0;i<rows.length;i++) {
        if (rows[i].remoteId == rowId) {
            row = rows[i];
            break;
        }
    }
	var arrageOrgId = row.arrageOrgId;
	var arrageDoctorId = row.arrageDoctorId;
	if (arrageOrgId == null) {
		arrageOrgId = "";
		arrageDoctorId = "";
	}
	$('#aapplyDate').html(row.applyDate);
	$('#aapplyOrgName').html(row.applyOrgName);
	$('#aapplyDoctorName').html(row.applyDoctorName);
	$('#zdorgId').val(arrageOrgId);
	selectOrgDoctor();
	$('#zdorgDoctorId').val(arrageDoctorId);
}

function closeUserModal(){
    closeModal("remoteModal");
}


function loadEcgRecordTable() {
    $('#ecgRecordTable').bootstrapTable({
        method : 'POST',
        url : "findEcgRecordList",
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
}

function ecgOperateFormatter(value, row, index) {
	if (!row.isDiagnosis) {
		return '<a href="#" onclick="openEcgDia(\'' + row.remoteId + '\')">诊断</a>';
	}
	return '<a href="#" class="m_l_10" onclick="openEcgDia(\'' + row.remoteId + '\')">查看详情</a>';

}

function openEcgDia(remoteId) {
	openWindow('../heartImage/jumpRemoteDiagnosis?id=' + remoteId + '&role=zj', '', '');
}

function canSub() {
	var zdorgId = $("#zdorgId").val();
	var zdorgDoctorId = $("#zdorgDoctorId").val();
	if (zdorgId == null || zdorgId == "") {
		alert("请选择诊断机构");
		return false;
	}
	if (zdorgDoctorId == null || zdorgDoctorId == "") {
		alert("请选择诊断医生");
		return false;
	}
	return true;
}
