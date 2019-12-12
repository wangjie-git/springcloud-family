
function loadEmpTable() {
	loadEtconcepts();
	initEmpOrgTree();
	$('#empTable').bootstrapTable({
		method : 'POST',
		url:'findEmpCondition',
		striped : true,
		pagination : true,
		pageList : [ 10, 20, 50, 100 ],
		"queryParamsType" : "limit",
		dataType : "json",
		sidePagination : 'server',
		contentType : "application/x-www-form-urlencoded;charset=utf-8",
		clickToSelect : true,
		singleSelect : true,
	//	search:true,
		queryParams:queryParams
	});
}

function queryParams(params) {
	var data = $("#searchEmpForm").serialize();
	var search = "";
	/*var search = params.search;
	if (search == undefined) {
		search = "";
	}*/
	data = data + "&limit=" + params.limit + "&offset=" + params.offset + "&search=" + search;
	return data;
}

function queryEmp() {
	$('#empTable').bootstrapTable('refresh', {url: 'findEmpCondition'});
}

function resetForm() {
	$('#searchEmpForm')[0].reset();
	$('#searchOrg').combotree('setValue', currentOrgId);
	$("#searchOrgId").val(currentOrgId);
}

//加载机构树
function initEmpOrgTree() {
	$("#createOrg").combotree({
		url : "../orgnization/regionList?id=" + currentOrgId + "&type=parent",
		valueField : 'id',
		textField : 'text',
		editable : false,
		onClick: function(node) {
			$("#orgId").val(node.id);
		},
		onBeforeExpand : function(node) {
			$("#createOrg").combotree("tree").tree("options").url = "../orgnization/regionList";
		},
		onLoadSuccess: function(node, data) {
			$('#createOrg').combotree('setValue', currentOrgId);
			$("#orgId").val(currentOrgId);
		}
   });

	$("#searchOrg").combotree({
		url : "../orgnization/regionList?id=" + currentOrgId + "&type=parent",
		valueField : 'id',
		textField : 'text',
		editable : false,
		onClick: function(node) {
			$("#searchOrgId").val(node.id);
		},
		onBeforeExpand : function(node) {
			$("#searchOrg").combotree("tree").tree("options").url = "../orgnization/regionList";
		},
		onLoadSuccess: function(node, data) {
			$('#searchOrg').combotree('setValue', currentOrgId);
			$("#searchOrgId").val(currentOrgId);
		}
   });

}

function createEmp() {
	clearEmpModal();
	$("#empCode").attr('disabled',false);

	$("#createOrg").combotree({
		url : "../orgnization/regionList?id=" + currentOrgId + "&type=parent",
		valueField : 'id',
		textField : 'text',
		editable : false,
		onClick: function(node) {
			$("#orgId").val(node.id);
		},
		onBeforeExpand : function(node) {
			$("#createOrg").combotree("tree").tree("options").url = "../orgnization/regionList";
		},
		onLoadSuccess: function(node, data) {
			$('#createOrg').combotree('setValue', currentOrgId);
			$("#orgId").val(currentOrgId);
		}
   });
	showModal("empModal");
}

function showOrgModal() {
	showModal("orgSearchModal");
	$('#orgModalTable').bootstrapTable({
		method : 'POST',
		url : "../orgnization/findOrgCondition",
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
function updateEmp() {
	clearEmpModal();
	$("#empCode").attr('disabled',true);
	$("#createOrg").combotree({
		url : "../orgnization/regionList?id=" + currentOrgId + "&type=parent",
		valueField : 'id',
		textField : 'text',
		editable : false,
		onClick: function(node) {
			$("#orgId").val(node.id);
		},
		onBeforeExpand : function(node) {
			$("#createOrg").combotree("tree").tree("options").url = "../orgnization/regionList";
		},
		onLoadSuccess: function(node, data) {
			$('#createOrg').combotree('setValue', getSelectedValue[0].orgName);
			//$('#createOrg').combotree('setValue', currentOrgId);
			$("#orgId").val(getSelectedValue[0].orgId);
		}
   });
	var getSelectedValue = $("#empTable").bootstrapTable('getSelections');
	if (getSelectedValue == null || getSelectedValue == "") {
		qiao.bs.msg({
			msg : '请选择一条记录',
			type : 'warning',
			time : 3000
		});
	} else {
		$("#orgId").val(getSelectedValue[0].orgId);
		$("#empId").val(getSelectedValue[0].id);
		$("#empCode").val(getSelectedValue[0].empCode);
		$("#empName").val(getSelectedValue[0].empName);
		$("#createOrg").combotree('setValue',getSelectedValue[0].orgName);
		$("#idNo").val(getSelectedValue[0].idNo);
		$("#sexId").val(getSelectedValue[0].sexId);
		$("#birthdate").val(getSelectedValue[0].birthdate );
		$("#telphone").val(getSelectedValue[0].telphone);
		$("#faxNo").val(getSelectedValue[0].faxNo);
		$("#email").val(getSelectedValue[0].email);
		$("#docType").val(getSelectedValue[0].docType);
		$("#available").val(getSelectedValue[0].available);
		$("#empDesc").val(getSelectedValue[0].empDesc);
		$("#staffId").val(getSelectedValue[0].staffId);
		showModal("empModal");
	}
}


function deleteEmp() {
	var getSelectedValue = $("#empTable").bootstrapTable('getSelections');
	if (getSelectedValue == null || getSelectedValue == "") {
		qiao.bs.msg({
			msg : '请选择一条记录',
			type : 'warning',
			time : 3000
		});
	} else {
		$.get("deleteEmpById?id=" + getSelectedValue[0].id,function(data, status) {
			if (status == "success") {
				msg("删除成功", "success");
				$('#empTable').bootstrapTable('refresh');
			} else {
				msg("删除失败", "error");
			}
		});
	}
}

function saveOrUpdateEmp() {
	var orgId = $("#orgId");
	var empId = $("#empId");
	var empCode = $("#empCode");
	var empName = $("#empName");
	var orgName = $("#orgName");
	var idNo = $("#idNo");
	var sexId = $("#sexId");
	var birthdate = $("#birthdate");
	var telphone = $("#telphone");
	var faxNo = $("#faxNo");
	var email = $("#email");
	var docType = $("#docType");
	var available = $("#available");
	var empDesc = $("#empDesc");
	var staffId= $("#staffId");

	if(!checkEmpty(empCode.val(),"人员编码")){
		return;
	}
	if (!checkForLength(empCode.val(), "人员编码", 16, 32)) {
		return;
	}
	if(!checkEmpty(empName.val(),"人员名称")){
		return;
	}
	if (!checkForLength(empName.val(), "人员名称", 15, 30)) {
		return;
	}
	if(!checkEmpty(orgId.val(),"机构名称")){
		return;
	}
	if (!stripscript(empCode.val()) && isChn(empCode.val())) {
		msg("人员编码只能输入数字或者英文字符", "warning");
		return;
	}
	if (!checkIdNo(idNo.val())) {
		return;
	}
	if (!checkPhone(telphone.val())) {
		msg("手机号码格式错误", "warning");
		return;
	}
	if (!checkMail(email.val())) {
		msg("邮箱格式错误", "warning");
		return;
	}
	$.post('saveOrUpdateEmp',
			{
		      "id":empId.val(),
		      "empCode":empCode.val(),
		      "empName":empName.val(),
		      "orgId":orgId.val(),
		      "orgName":orgName.val(),
		      "idNo":idNo.val(),
		      "sexId":sexId.val(),
		      "birthdate":birthdate.val(),
		      "telphone":telphone.val(),
		      "faxNo":faxNo.val(),
		      "email":email.val(),
		      "docType":docType.val(),
		      "available":available.val(),
		      "empDesc":empDesc.val(),
		      "staffId":staffId.val()
			},function(data,status){
				if (status == "success") {
					if (data.msgCode == "10000") {
						msg("保存成功", "success");
						$('#empTable').bootstrapTable('refresh');
						closeEmpModal();
					} else {
						msg(data.msgText, "error");
					}
				} else {
					msg("保存失败,请检查网络", "error");
				}
			});
}

function choiceOrg() {
	var orgId = $("#orgId");
	var orgName = $("#orgName");
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
}

function closeEmpModal() {
	clearEmpModal();
	closeModal("empModal");
}

function clearEmpModal() {
	$("#empId").val("");
	$("#saveOrUpdateForm")[0].reset();
	$('#createOrg').combotree('setValue', currentOrgId);
	$("#orgId").val(currentOrgId);
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
			username.removeAttr("readonly");
			$("#userForm")[0].reset();
			$("#reLine").show()
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
	var flag = false;
	if (userId.val() == null || userId.val() == "") {
		var flag = checkDetail(username.val(), "帐号", 16, 32);
		if (!flag) {
			return;
		}
		if (password.val() != repassword.val()) {
			msg("两次输入的密码不一致", "info");
			repassword.val("");
			repassword.focus();
			flag = false;
			return;
		}
	} else {
		flag = true;
	}

	if (flag) {
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
		clickToSelect : true,
		singleSelect : true,
		queryParams:queryParams
	});
	loadEtconcepts();
	initEmpOrgTree();
}

function queryEmpExpert() {
	$('#expertEmpTable').bootstrapTable('refresh', {url: 'findEmpExpertCondition'});
}

function clearpassword() {
	$("#password").val("");
}

function parseAvailable(value, row, index) {
	if (value == "Y") {
		return "是";
	}
	return "<span style='color:red'>否</span>";
}

function parseTeaminfo(value, row, index) {
	var teamName = "";
	var teaminfo = row.teaminfo;
	if (typeof teaminfo != 'undefined' && teaminfo != null && teaminfo.length > 0) {
		for (var i = 0; i < teaminfo.length; i++) {
			teamName = teamName + teaminfo[i].teamname+"、";
		}
		if(teamName.length > 0){
			teamName = teamName.substring(0, teamName.length-1);
		}
		//return "<p class='colStyle'>"+teamName+"</p>";
	}
	return teamName;
}

function synchronyEmp() {
	$.post('synchronyEmp', {}, function(data, status) {
		if (status == 'success') {
			msg("同步成功", "success");
			$('#empTable').bootstrapTable('refresh');
		}
	});

}

function restEmpModal() {
	var empId = $("#empId").val();
	if (empId != null && empId!= "" ) {
		var getSelectedValue = $("#empTable").bootstrapTable('getSelections');
		$("#orgId").val(getSelectedValue[0].orgId);
		$("#empId").val(getSelectedValue[0].id);
		$("#empCode").val(getSelectedValue[0].empCode);
		$("#empName").val(getSelectedValue[0].empName);
		$(".orgTree").combotree('setValue',getSelectedValue[0].orgName);
		//$(".orgTree").combotree('select',getSelectedValue[0].orgId);
		$("#idNo").val(getSelectedValue[0].idNo);
		$("#sexId").val(getSelectedValue[0].sexId);
		$("#birthdate").val(getSelectedValue[0].birthdate );
		$("#telphone").val(getSelectedValue[0].telphone);
		$("#faxNo").val(getSelectedValue[0].faxNo);
		$("#email").val(getSelectedValue[0].email);
		$("#docType").val(getSelectedValue[0].docType);
		$("#available").val(getSelectedValue[0].available);
		$("#empDesc").val(getSelectedValue[0].empDesc);
		$("#staffId").val(getSelectedValue[0].staffId);
	}
	else {
		$("#saveOrUpdateForm")[0].reset();
		$('#createOrg').combotree('setValue', currentOrgId);
		$("#orgId").val(currentOrgId);
	}
}


function restForm() {
	$("#excelForm")[0].reset();
}

function optionEmpTarget(value, row, index){
	if(row.available == "N"){
		return "";
	}
	return "<a class=\"btn btn-primary\" href='#' onclick='showEmpData(\""
		+ row.id + "\")'><i class=\"glyphicon glyphicon-wrench\"></i>&nbsp;维护</a>";
}

function showEmpData(empcode){
	$("#empCodeId").val(empcode);
	$.post("../emp/findEmpTargetById", {"empId":empcode}, function (data, status) {
        if (status == "success") {
            $("[type='FWBRS']").remove();
            $("[type='RQRS']").remove();
            $("#targetcontract").val(data.targetcontract);
            $("#targetrate").val(data.targetrate);
            $("#placecontract").val(data.placecontract);
            $("#targetId").val(data.id);

            $("#remarks").val(data.remarks);

            //改成动态添加td
            var allPack = data.allInfo.allPack;
            var allLabel = data.allInfo.allLabel;
            if(allLabel!=null&&allLabel.length>0){
            	var RQRStr = "<tr type='RQRS'></tr>";
            	for(var i = 0 ;i<allLabel.length;i++){
            		var RQRStd = "";
            		var label = allLabel[i];
                	var index = 5;
            		RQRStd = "<td tyle='text-align:right'>"+label.labelName+"</td>"+
                     "<td type='RQRS' id='"+label.packId+"'>"+
                     "<input type='hidden' id='RQRS"+label.labelid+"id' name='RQRS"+label.labelid+"id'/>"+
                     "<input style='width: 130px;float: left;' type='text' maxlength='6' onkeyup='if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,&#39;&#39;)}else{this.value=this.value.replace(/\\D/g,&#39;&#39;)}' onafterpaste='if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,&#39;0&#39;)}else{this.value=this.value.replace(/\\D/g,&#39;&#39;)}' "+
                     "id='RQRS"+label.labelid+"pNum' name='"+label.labelid+"RQRS' placeholder='目标签约人数'/>"+
                     "</td>";
            		RQRStr = $(RQRStr).append(RQRStd);
            		if((i+1)%2==0){
            			$("#targetTable").find("tr").eq(index).after(RQRStr);
            			RQRStr = new String("");
            			RQRStr = "<tr type='RQRS'></tr>";
            			index++;
            		}
            	}
    			$("#targetTable").find("tr").eq(index).after(RQRStr);
            }
            if(allPack!=null&&allPack.length>0){
            	var FWBRStr = "<tr type='FWBRS'></tr>";
            	for(var i = 0 ;i<allPack.length;i++){
            		var FWBRStd = "";
            		var pack = allPack[i];
                	var index = 0;
            		FWBRStd = "<td tyle='text-align:right'>"+pack.packName+"</td>"+
                     "<td type='FWBRS' id='"+pack.packId+"'>"+
                     "<input type='hidden' id='FWBRS"+pack.packId+"id' name='FWBRS"+pack.packId+"id'/>"+
                     "<input style='width: 130px;float: left;' type='text' maxlength='6' onkeyup='if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,&#39;&#39;)}else{this.value=this.value.replace(/\\D/g,&#39;&#39;)}' onafterpaste='if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,&#39;0&#39;)}else{this.value=this.value.replace(/\\D/g,&#39;&#39;)}' "+
                     "id='FWBRS"+pack.packId+"pNum' name='"+pack.packId+"FWBRS' placeholder='目标签约人数'/>"+
                     "</td>";
            		FWBRStr = $(FWBRStr).append(FWBRStd);
            		if((i+1)%2==0){
            			$("#targetTable").find("tr").eq(index).after(FWBRStr);
            			FWBRStr = new String("");
                    	FWBRStr = "<tr type='FWBRS'></tr>";
            			index++;
            		}
            	}
    			$("#targetTable").find("tr").eq(index).after(FWBRStr);

            }


            showData(data.FWBRS);
            showData(data.RQRS);


        }
    });

	$("#empTargetModal").modal("show");
}

function showData(list){
	if(list!=null&&list.length>0){
		for(var i = 0;i<list.length;i++){
			if(list[i].isTrue!=null&&list[i].isTrue!=""){
				if(list[i].isTrue=="Y")$("#is"+list[i].sonId+"y").attr("checked","checked");
				if(list[i].isTrue=="N")$("#is"+list[i].sonId+"n").attr("checked","checked");
			}
			$("#"+list[i].configureCode+list[i].sonId+"pNum").val(list[i].value);
			$("#"+list[i].configureCode+list[i].sonId+"id").val(list[i].id);
		}
	}
}

function closeEmpData(orgcode){
    $("#targetcontract").val("");
    $("#targetrate").val("");
    $("#placecontract").val("");
    $("#remarks").val("");

	$("#empTargetModal").modal("hide");
}

function saveOrUpdateEmpTarget(){
	var params = $("#empTargetForm").serializeArray();
	var values = {};
	for( x in params ){
		values[params[x].name] = params[x].value;
	}
	var base = [];
	jQuery.each(values,function(k,val){
		var demo = new Object();
		demo.baseType = "E";
		demo.baseTargetId = $("#targetId").val();
		if(k.search("FWBRS")==0){
			demo.configureCode = "FWBRS";
			k = k.replace("FWBRS","")
			k = k.substring(0,k.lastIndexOf('id'));
			demo.sonId = k;
			demo.value = values[k+"FWBRS"];
			demo.id = val;
		}
		if(k.search("RQRS")==0){
			demo.configureCode = "RQRS";
			k = k.replace("RQRS","")
			k = k.substring(0,k.lastIndexOf('id'));
			demo.sonId = k;
			demo.value = values[k+"RQRS"];
			demo.id = val;
		}
		base.push(demo);
	})
	values.baseList = base;
	var jsonParam = decodeURIComponent($.param(values))
    .replace(/\[([^ \[\]]*?[^ \[\]\d]+?[^ \[\]]*?)\]/g, ".$1");

    $.post("../emp/saveOrUpdateEmpTarget", jsonParam, function (data, status) {
        if (status == "success") {
            msg("配置成功！", "success");
            $("#targetcontract").val("");
            $("#targetrate").val("");
            $("#placecontract").val("");
            $("#remarks").val("");

        	$("#empTargetModal").modal("hide");
        }
    });
}
function limitInputNum(obj){
	var id = obj.id;
	if($("#"+id).val()<0){
		$("#"+id).val(0);
	}

}
