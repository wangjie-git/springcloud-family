function loadUserGroupTable() {
    $('#userGroupTable').bootstrapTable({
        method : 'POST',
        url : "findUserGroupCondition",
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

function parseAvailable(value, row, index) {
    if (value == "Y") {
        return "是";
    } else {
        return "<span style='color:red'>否</span>";
    }
}

function createUserGroup() {
    closeUserGroupModal();
    $("#userGroupCode").removeAttr("readonly");
    showModal("userGroupModal");
}

function saveOrUpdateUserGroup() {
    var id = $("#id");
    var userGroupCode = $("#userGroupCode");
    var userGroupName = $("#userGroupName");
    var userGroupDesc = $("#userGroupDesc");
    var available = $("#available");
    if(!checkEmpty(userGroupCode.val(),"编码")){
		return;
	}
    if(!checkEmpty(userGroupName.val(),"名称")){
		return;
	}
    if (!checkForLength(userGroupCode.val(), "用户组编码", 16, 32)) {
        return;
    }
    if (!checkForLength(userGroupName.val(), "用户组名称", 16, 32)) {
        return;
    }
    $.post('../usergroup/saveOrUpdateUserGroup', {
        'id':id.val(),
        'userGroupCode':userGroupCode.val(),
        'userGroupName':userGroupName.val(),
        'userGroupDesc':userGroupDesc.val(),
        'available':available.val()
    },function(data, status) {
        if (status == "success") {
            if (data.msgCode == "10000") {
                msg(data.msgText, "success");
                $('#userGroupTable').bootstrapTable('refresh');
                closeUserGroupModal();
            } else {
                msg(data.msgText, "error");
            }
        } else {
            msg("保存失败,请检查网络", "error");
        }
    });
}

function updateUserGroup() {
    var id = $("#id");
    var userGroupCode = $("#userGroupCode");
    var userGroupName = $("#userGroupName");
    var userGroupDesc = $("#userGroupDesc");
    var available = $("#available");
    var getSelectedValue = $('#userGroupTable').bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {
        var group = getSelectedValue[0];
        id.val(group.id);
        userGroupCode.attr("readonly","readonly");
        userGroupCode.val(group.userGroupCode);
        userGroupName.val(group.userGroupName);
        userGroupDesc.val(group.userGroupDesc);
        available.val(group.available);
        showModal("userGroupModal");
    }
}

function deleteUserGroup() {
    var getSelectedValue = $('#userGroupTable').bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {
        var data = getSelectedValue[0];
        qiao.bs.confirm({
            msg: '确认删除<font style="color:red">' + data.userGroupName + "</font>?"
        },function(){
            $.get('deleteUserGroup',{"id":data.id},function(data, status) {
                if (status == "success") {
                    msg("删除成功!", "success");
                    $('#userGroupTable').bootstrapTable('refresh');
                }
            });
        },function(){
        });
    }
}
function closeUserGroupModal() {
    closeModal("userGroupModal");
    $("#id").val("");
    $("#userGroupCode").val("");
    $("#userGroupName").val("");
    $("#userGroupDesc").val("");
    $("#available").val("Y");
}


function loadUserTable() {
    $('#userTable').bootstrapTable({
        method : 'POST',
        url : "../usergroup/findUserByGroupId",
        striped : true,
        pagination : true,
        pageList : [ 10, 20, 50, 100 ],
        "queryParamsType" : "limit",
        dataType : "json",
        sidePagination : 'server',
        contentType : "application/x-www-form-urlencoded",
        showRefresh : true,
        clickToSelect : true,
        /*onDblClickRow:dblClickUserRow,*/
        queryParams:queryParams
    })
}
function queryParams(params) {
    return {
        groupId:$("#groupId").val(),
        limit:params.limit,
        offset:params.offset
    }
}
function checkusergroup(id, userGroupName) {
    $("#group").html(userGroupName);
    $("#groupId").val(id);
    $('#userTable').bootstrapTable('refresh',{url: '../usergroup/findUserByGroupId'});
}

function addUserGroupConf() {
    if ($("#groupId").val() == "" || $("#groupId").val() == null) {
        msg("请选择用户组", "warning");
        return;
    }
    showModal("userModal");
    $('#searchUserTable').bootstrapTable({
        method : 'POST',
        url : "../user/findAllUser",
        striped : true,
        pagination : true,
        pageList : [ 10, 20, 50, 100 ],
        "queryParamsType" : "limit",
        dataType : "json",
        sidePagination : 'server',
        contentType : "application/x-www-form-urlencoded",
        showRefresh : true,
        clickToSelect : true,
        singleSelect : false,
        search:true
    })
}

function closeChoiceUserModal() {
    closeModal("userModal");
    $('#searchUserTable').bootstrapTable('refresh');
}

function choiceUser() {
    var groupId = $("#groupId").val();
    var selectedValues = $('#searchUserTable').bootstrapTable('getSelections');
    if (selectedValues == null || selectedValues == ""){
        msg("请选择用户", "warning");
        return;
    }
    var userIdStr= '';
    for (var i in selectedValues) {
        userIdStr += selectedValues[i].userId + ",";
    }
    userIdStr = userIdStr.substring(0, userIdStr.length - 1);
    $.post('../usergroup/addUserInGroup',
            {'groupId':groupId,'userIdStr':userIdStr},
            function(data, status){
                if (status == "success") {
                    if (data.msgCode == "10000") {
                        msg(data.msgText, "success");
                        closeChoiceUserModal();
                        $('#userTable').bootstrapTable('refresh',{query: {groupId: $("#groupId").val()}});
                    } else {
                        msg(data.msgText, "error");
                    }
                } else {
                    msg("添加用户失败,请检查网络", "error");
                }
            }
    );
}

function dblClickUserRow(row) {

    var empId= $("#userEmpId");
    var userId = $("#userId");
    var username = $("#username");
    var password = $("#password");
    var useravailable = $("#useravailable");
    empId.val(row.empId);
    userId.val(row.userId);
    username.val(row.userName);
    password.val("*****");
    useravailable.val(row.available);
    showModal("updateUserModal");
}

function closeUserModal() {
    closeModal("updateUserModal");
    $('#searchUserTable').bootstrapTable('refresh');
}
function clearpassword() {
    $("#password").val("");
}

function managerUser() {
    var empId= $("#userEmpId");
    var userId = $("#userId");
    var username = $("#username");
    var password = $("#password");
    var useravailable = $("#useravailable");
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
                $('#userTable').bootstrapTable('refresh',{query: {groupId: $("#groupId").val()}});
                closeModal("updateUserModal");
            } else {
                msg(data.msgText, "error");
            }

        } else {
            msg("分配账号失败", "error");
        }
    });
}

function deleteUserGroupConf() {
    var selectedValues = $('#userTable').bootstrapTable('getSelections');
    if (selectedValues == null || selectedValues == ""){
        msg("请选择用户", "warning");
        return;
    }
    var userArray = [];
    var groupId = $("#groupId").val();
    var userName = "[";
    for (var i=0;i<selectedValues.length;i++) {
        var data = selectedValues[i];
        userArray.push(data.userId);
        userName += data.empName + ",";
    }
    userName = userName.substring(0, userName.length - 1);
    userName += "]"

    var groupName = $("#group").text();
    qiao.bs.confirm({
        msg: '确认删除<font style="color:red">' + groupName + '</font>用户组下的<font style="color:red">'
        + userName + '</font>用户吗?'
    },function(){
        $.get("../usergroup/deleteUserGroupConf",
                {"userId":userArray,
            "groupId":groupId},
                function(data, status){
            if (status == "success") {
                if (data.msgCode == "10000") {
                    msg(data.msgText, "success");
                    $('#userTable').bootstrapTable('refresh');
                } else {
                    msg(data.msgText, "error");
                }
            } else {
                msg("删除用户失败,请检查网络", "error");
            }
                }
        );
    },function(){
    });
}


function resetuserGroupForm() {
    if ($("#id").val() != null && $("#id").val() != "") {
        var userGroupCode = $("#userGroupCode");
        var userGroupName = $("#userGroupName");
        var userGroupDesc = $("#userGroupDesc");
        var available = $("#available");
        var getSelectedValue = $('#userGroupTable').bootstrapTable('getSelections');
        var group = getSelectedValue[0];
        userGroupCode.val(group.userGroupCode);
        userGroupName.val(group.userGroupName);
        userGroupDesc.val(group.userGroupDesc);
        available.val(group.available);
        return;
    }
    $("#userGroupForm")[0].reset();
}
