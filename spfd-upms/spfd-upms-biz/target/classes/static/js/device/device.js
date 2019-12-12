
function loadDeviceTable() {
    $('#deviceTable').bootstrapTable({
        method : 'POST',
        url : "findDeviceCondition",
        striped : true,
        pagination : true,
        pageList : [ 10, 20, 50, 100 ],
        "queryParamsType" : "limit",
        dataType : "json",
        sidePagination : 'server',
        contentType : "application/x-www-form-urlencoded",
        showRefresh : false,
        clickToSelect : true,
        singleSelect : true,
         showColumns: true,

       // search : true
    });

    initDeviceOrgTree();
}

//加载机构树
function initDeviceOrgTree() {
	$("#createOrg").combotree({
		url : "../orgnization/regionList?id=" + currentOrgId + "&type=parent",
		valueField : 'id',
		textField : 'text',
		editable : false,
		onClick: function(node) {
			$("#deviceOrgId").val(node.id);
		},
		onBeforeExpand : function(node) {
			$("#createOrg").combotree("tree").tree("options").url = "../orgnization/regionList";
		},
		onLoadSuccess: function(node, data) {
			$('#createOrg').combotree('setValue', currentOrgId);
			$("#deviceOrgId").val(currentOrgId);
		}
   });

}

function parseAvailable(value, row, index) {
    if ("Y" == value) {
        return ISYES;
    }
    return "<font style='color:red'>" + ISNOT + "</font>"
}


function createDevice() {
    $("#deviceCode").removeAttr("readonly");
    initDeviceOrgTree();
    showModal("deviceModal");
}

function showOrgModal() {
    showModal("orgSearchModal");
    closeModal("deviceModal");
    $('#orgModalTable').bootstrapTable({
        method : 'POST',
        url : "findOrgCondition",
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
    })
}

function updateDevice() {
    $("#deviceCode").attr("readonly", "readonly");
    var getSelectedValue = $("#deviceTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {
        $("#id").val(getSelectedValue[0].id);
        $("#appArea").val(getSelectedValue[0].appArea);
        /*var t = $('#orgSelect').combotree('tree');
        var node = t.tree('find', getSelectedValue[0].appArea);
        t.tree('select', node.target);
        $('#orgSelect').combotree("setValue", getSelectedValue[0].appArea);*/
        $("#appAreaName").val(getSelectedValue[0].appAreaName);
        $("#deviceOrgId").val(getSelectedValue[0].deviceOrgId);
        $("#deviceCode").val(getSelectedValue[0].deviceCode);
        $("#deviceOrgName").val(getSelectedValue[0].deviceOrgName);
        $("#createTime").val(getSelectedValue[0].createTime);
        $("#distributeTime").val(getSelectedValue[0].distributeTime);
        $("#userName").val(getSelectedValue[0].userName);
        $("#userNumber").val(getSelectedValue[0].userNumber);
        $("#softwareVersion").val(getSelectedValue[0].softwareVersion);
        $("#hardwareVersion").val(getSelectedValue[0].hardwareVersion);
        $("#available").val(getSelectedValue[0].available);
        $("#appVersion").val(getSelectedValue[0].appVersion);
        $("#appName").val(getSelectedValue[0].appName);
        $("#deviceVersion").val(getSelectedValue[0].deviceVersion);
        $("#deviceName").val(getSelectedValue[0].deviceName);
        $("#desc").val(getSelectedValue[0].desc);
        showModal("deviceModal");
    }
}


function deleteDevice() {
    var getSelectedValue = $("#deviceTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {
        qiao.bs.confirm({
            title : '<font color="red">提示</font>',
            type : 'warning',
            msg: '确认删除编号为 <font color="#3C8DBC">' + getSelectedValue[0].deviceCode + "</font>的一体机吗?"},
            function () {
                $.get("deleteDeviceById?id=" + getSelectedValue[0].id,function(data, status) {
                    if (status == "success") {
                        msg("删除成功", "success");
                        $('#deviceTable').bootstrapTable('refresh');
                    } else {
                        msg("删除失败", "error");
                    }
                });
            }
        );

    }
}

function saveOrUpdateDevice() {
	var deviceCode = $("#deviceCode");
	if (!stripscript(deviceCode.val()) || isChn(deviceCode.val())) {
		msg("设备编码只能输入数字或者英文字符", "warning");
		return;
	}
	if (!checkForLength(deviceCode.val(), "编码", 25, 50)) {
		return;
	}
	var userNumber = $("#userNumber");
	if (!checkIdNo(userNumber.val())) {
		return;
	}
    $.post('saveOrUpdateDevice',
        $('#deviceForm').serialize()
            ,function(data,status){
                if (status == "success") {
                    if (data.msgCode == "10000") {
                        msg("保存成功", "success");
                        $('#deviceTable').bootstrapTable('refresh');
                        closeDeviceModal();
                    } else {
                        msg(data.msgText, "error");
                    }
                } else {
                    msg("保存失败,请检查网络", "error");
                }
            });
}

function choiceOrg() {
    showModal("deviceModal");
    var orgId = $("#deviceOrgId");
    var orgName = $("#deviceOrgName");
    var getSelectedValue = $("#orgModalTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {
        orgId.val(getSelectedValue[0].orgId);
        orgName.val(getSelectedValue[0].orgName);
        closeModal("orgSearchModal");
    }

}

function closeOrgSearchModal() {
    closeModal("orgSearchModal");
    showModal("deviceModal");

}

function closeDeviceModal() {
    $("#id").val("");
    $("#appArea").val("");
    $("#appAreaName").val("");
    $("#deviceOrgId").val("");
    $("#deviceCode").val("");
    $("#deviceOrgName").val("");
    $("#createTime").val("");
    $("#distributeTime").val("");
    $("#userName").val("");
    $("#userNumber").val("");
    $("#softwareVersion").val("");
    $("#hardwareVersion").val("");
    $("#available").val("Y");
    $("#appVersion").val("");
    $("#appName").val("");
    $("#deviceVersion").val("");
    $("#deviceName").val("");
    $("#desc").val("");
    closeModal("deviceModal");
}

function userManager() {
    var getSelectedValue = $("#empTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {
        var empId= $("#userEmpId");
        var userId = $("#userId");
        var username = $("#username");
        var password = $("#password");
        var repassword = $("#repassword");
        var useravailable = $("#useravailable");
        empId.val(getSelectedValue[0].id);
        if (getSelectedValue[0].user != null && getSelectedValue[0].user != "") {
            var user = getSelectedValue[0].user;
            username.attr("readonly","readonly");
            username.val(user.userName);
            password.val("*****");
            useravailable.val(user.available);
            userId.val(user.userId);
            $("#reLine").hide()
        } else {
            $("#reLine").show()
            username.val(getSelectedValue[0].staffId);
        }
        showModal("userModal");
    }
}

function closeUserModal() {
    closeModal("userModal");
    $("#userEmpId").val("");
    $("#userId").val("");
    $("#username").val("");
    $("#password").val("");
    $("#repassword").val("");
    $("#useravailable").val("Y");
    $("#username").removeAttr("readonly");
    $("#repassword").show();

}

function managerUser() {
    var empId= $("#userEmpId");
    var userId = $("#userId");
    var username = $("#username");
    var password = $("#password");
    var repassword = $("#repassword");
    var useravailable = $("#useravailable");
    if (userId.val() == null || userId.val() == "") {
        if (password.val() != repassword.val()) {
            msg("两次输入的密码不一致", "info");
            repassword.val("");
            repassword.focus();
            return;
        }
    }
    $.post('../user/managerUser',{
        "userId":userId.val(),
        "empId":empId.val(),
        "userName":username.val(),
        "available":useravailable.val(),
        "password":password.val()
    },function(data,status){
        if (status == "success") {
            if (data.msgCode == "10000") {
                msg(data.msgText, "success");
                $('#empTable').bootstrapTable('refresh');
                closeModal("userModal");
            } else {
                msg(data.msgText, "error");
            }

        } else {
            msg("分配账号失败", "error");
        }
    });
}

function loadEmpExpertTable() {
    $('#expertEmpTable').bootstrapTable({
        method : 'POST',
        url : "findEmpExpertCondition",
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

function clearpassword() {
    $("#password").val("");
}

