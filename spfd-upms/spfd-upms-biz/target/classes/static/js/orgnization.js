var addOrUpdateFlog = "add";
var areaCodeInfo = "";
function loadAdTable() {
   $('#regionTable').bootstrapTable({
        method : 'POST',
        url : "findAllRegionCondition",
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



   $("#parentRegionName").bind('click', function() {
       $('#regionModalTable').bootstrapTable({
            method : 'POST',
            url : "findAllRegionCondition",
            striped : true,
            pagination : true,
            pageList : [ 10, 20],
            "queryParamsType" : "limit",
            dataType : "json",
            sidePagination : 'server',
            contentType : "application/x-www-form-urlencoded",
            showRefresh : true,
            clickToSelect : true,
            singleSelect : true,
            search : true
        });
       $("#regionModel").modal('show');

   });

}

function loadOrgTable() {
    $('#orgTable').bootstrapTable({
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
        showRefresh : false,
        //search : true,
        queryParams:queryParams
    });

    $("#orgTabBar").addClass("active");

    $("#situationTabBar").bind('click', function() {
        $("#orgTabBar").removeClass("active");
        $("#situationTabBar").addClass("active");
        $("#situationTab").show();
        $("#orgTab").hide();
        $('#orgSituationTable').bootstrapTable({
            method : 'POST',
            url : "findOrgSituationCondition",
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
    });

    $("#orgTabBar").bind('click', function() {
        $("#situationTabBar").removeClass("active");
        $("#orgTabBar").addClass("active");
        $("#orgTab").show();
        $("#situationTab").hide();
    });

    //加载日期控件
      /*qiao.bs.bsdate('.qdate',{
          autoclose: true,
          language : 'zh-CN',
          format: "yyyy",
          startView: 2,
          maxViewMode: 2,
          minViewMode:2
      });*/

    //initOrgTree();
    queryAreaInfo();
}

function queryParams(params) {
    var data = $("#searchOrgForm").serialize();
    var search = params.search;
    if (search == undefined) {
        search = "";
    }
    data = data + "&limit=" + params.limit + "&offset=" + params.offset + "&search=" + search;
    return data;
}

function resetForm() {
    $("#searchOrgForm")[0].reset();
}

function queryOrg() {
    $('#orgTable').bootstrapTable('refresh', {url: 'findOrgCondition'});
}


function addRegion() {
    $("#divisionId").val("");
    $("#parentCode").val("");
    $("#parentLeavel").val("");
    $("#parentRegionName").val("");
    $("#divisionCode").val("");
    $("#divisionName").val("");
    $("#divisionCode").removeAttr('readonly');
    $("#exampleModal").modal('show');
}

function choiceRegion() {
    var parentCode = $("#parentCode");
    var parentLeavel = $("#parentLeavel");
    var parentRegionName = $("#parentRegionName");
    var getSelectedValue = $("#regionModalTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : RECORD,
            type : 'warning',
            time : 3000
        });
    } else {
        parentCode.val(getSelectedValue[0].divisionId);
        parentLeavel.val(getSelectedValue[0].divisionLevel);
        parentRegionName.val(getSelectedValue[0].divisionName);
        $("#regionModel").modal('hide');
    }
}

function updateRegion() {
    var getSelectedValue = $('#regionTable').bootstrapTable('getSelections');
    var parentCode = $("#parentCode");
    var parentLeavel = $("#parentLeavel");
    var parentRegionName = $("#parentRegionName");
    var divisionId = $("#divisionId");
    var divisionCode = $("#divisionCode");
    var divisionName = $("#divisionName");
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : RECORD,
            type : 'warning',
            time : 3000
        });
    } else {
        var id = getSelectedValue[0].divisionId;
        divisionCode.attr('readonly', 'readonly');
        $.post(
                "findRegionById?divisionId=" + id,
                function(data, status) {
                    if (status == "success") {
                        $("#exampleModal").modal('show');
                        parentCode.val(data.parentCode);
                        parentLeavel.val(data.parentLeavel);
                        parentRegionName.val(data.parentRegionName);
                        divisionId.val(data.divisionId);
                        divisionCode.val(data.divisionCode);
                        divisionName.val(data.divisionName);
                    }
                }
        );
    }

}

function deleteRegion() {
    var getSelectedValue = $('#regionTable').bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : RECORD,
            type : 'warning',
            time : 3000
        });
    } else {
        var id = getSelectedValue[0].divisionId;
        $.get("deleteRegion?id=" + id, function(data, status) {
            if (status == "success") {
                if (data.msgCode == "10000") {
                    msg(DELSUCCESS, 'success');
                    $('#regionTable').bootstrapTable('refresh');

                } else {
                    msg(data.msgText, 'error');
                }

            } else {
                msg(DELFAIL, 'error');
            }
        })
    }
}
//保存或修改行政区域
function saveOrUpdate() {
    var parentCode = $("#parentCode");
    var parentLeavel = $("#parentLeavel");
    var parentRegionName = $("#parentRegionName");
    var divisionId = $("#divisionId");
    var divisionCode = $("#divisionCode");
    var divisionName = $("#divisionName");
    qmask.show();
    $.post("saveOrUpdateDivisions", {
        "divisionId" : divisionId.val(),
        "divisionCode" : divisionCode.val(),
        "divisionName" : divisionName.val(),
        "parentCode" : parentCode.val(),
        "parentLeavel" : parentLeavel.val(),
        "parentRegionName" : parentRegionName.val()
    }, function(data, status) {
        if (status == "success") {
            if (data.msgCode == "10000") {
                qiao.bs.msg({
                    msg : SAVESUCCESS,
                    type : 'success',
                    time : 3000
                });
                $("#exampleModal").modal('hide');
                divisionId.val("");
                parentCode.val("");
                parentLeavel.val("");
                parentRegionName.val("");
                divisionCode.val("");
                divisionName.val("");
                $('#regionTable').bootstrapTable('refresh');
            } else {
                qiao.bs.msg({
                    msg : data.msgText,
                    type : 'error',
                    time : 3000
                });
            }
            qmask.hide();
        } else {
            qiao.bs.msg({
                msg : SAVEFAIL,
                type : 'error',
                time : 3000
            });
        }
    })

}



function saveOrUpdateOrg() {
    var orgAreaCode = $("#orgAreaCode").val();
    var rsName = $("#rsName").val();
    var orgId = $("#orgId").val();
    var orgCode = $("#orgCode");
    var orgName = $("#orgName");
    var orgClass = $("#orgClass");
    var orgAddr = $("#orgAddr");
    var orgContacts = $("#orgContacts");
    var orgTelephone = $("#orgTelephone");
    var available = $("#available");
    var orgDesc = $("#orgDesc");
    var parentId = $("#parentId");
    var parentOrgName = $("#parentOrgName");
    var rsId = $("#rsId").val();
    if(orgAreaCode==null||orgAreaCode==""){
    	qiao.bs.msg({
            msg : "所属区域不能为空",
            type : 'error',
            time : 2000
        });
    	return;
    }
    if(orgCode.val()==null||orgCode.val()==""){
    	qiao.bs.msg({
            msg : "机构编码不能为空",
            type : 'error',
            time : 2000
        });
    	return;
    }
    if(orgName.val()!=null&&orgName.val()!=""){
    	if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(orgName.val())){
    		qiao.bs.msg({
                msg : "不能有特殊字符",
                type : 'error',
                time : 2000
            });
    		return;
  	    }
    }else{
    	qiao.bs.msg({
            msg : "机构名不能为空",
            type : 'error',
            time : 2000
        });
    	return;
    }
    if(addOrUpdateFlog == "update"){
    	var getSelectedValue = $("#orgTable").bootstrapTable('getSelections');
		var org = getSelectedValue[0];
    	if(orgAreaCode!=org.orgAreaCode){
    		qiao.bs.msg({
                msg : "当前机构区域发生改变，不允许修改",
                type : 'error',
                time : 3000
            });
    		return;
    	}
    }
    if(areaCodeInfo!=''&&areaCodeInfo!=$("#orgAreaCode").val()){
    	var text= $("#orgAreaCode").find("option[value='"+areaCodeInfo+"']").text();
    	qiao.bs.msg({
            msg : "当前选定机构只能选择区域【"+text+"】",
            type : 'error',
            time : 3000
        });
    	$("#orgAreaCode").val(areaCodeInfo);
    	return;
    }
    if (!checkForLength(orgCode.val(), INSCODE, 16, 32)) {
        return;
    }
    if (!checkForLength(orgName.val(), INSNAME, 16, 32)) {
        return;
    }
    $.post("../orgnization/saveOrUpdateOrg", {
        "orgId" : orgId,
        "rsId"  : rsId,
        "orgCode" : orgCode.val(),
        "orgName" : orgName.val(),
        "orgAreaCode" : orgAreaCode,
        "rsName" : rsName,
        "orgClass" : orgClass.val(),
        "orgAddr" : orgAddr.val(),
        "orgContacts" : orgContacts.val(),
        "orgTelephone" : orgTelephone.val(),
        "available" : available.val(),
        "orgDesc" : orgDesc.val(),
        "parentId" : parentId.val(),
        "parentOrgName": parentOrgName.val()
    }, function(data, status) {
        if (status == "success") {
            if (data.msgCode == "10000") {
                qiao.bs.msg({
                    msg : SAVESUCCESS,
                    type : 'success',
                    time : 3000
                });
                $('#orgTable').bootstrapTable('refresh');
                initOrgTree();
                closeOrgModal();
            } else {
                qiao.bs.msg({
                    msg : data.msgText,
                    type : 'error',
                    time : 3000
                });
            }
        } else {
            qiao.bs.msg({
                msg : SAVEFAIL,
                type : 'error',
                time : 3000
            });
        }
    }

    )
}

function addOrg() {
	$.get("../orgnization/findOrgById", {"orgId":currentOrgId}, function (data, status) {
    	$("#orgAreaCode").val(data.orgAreaCode);
    	areaCodeInfo = data.orgAreaCode;
    });
    closeOrgModal();
    addOrgTree();
    if(currentOrgId=="konsung"){
        $("#orgAreaCode").prop("disabled", false);
    }else{
        $("#orgAreaCode").prop("disabled", true);
    }
    $("#orgModal").modal("show");
    $("#orgCode").removeAttr('readonly');
    $('#orgParentSelect').combotree('setValue', "");
}

function updateOrg() {
    var orgAreaCode = $("#orgAreaCode");
    var rsName = $("#rsName");
    var orgId = $("#orgId");
    var orgCode = $("#orgCode");
    var orgName = $("#orgName");
    var orgClass = $("#orgClass");
    var orgAddr = $("#orgAddr");
    var orgContacts = $("#orgContacts");
    var orgTelephone = $("#orgTelephone");
    var available = $("#available");
    var orgDesc = $("#orgDesc");
    var parentId = $("#parentId");
    var parentOrgName = $("#parentOrgName");
    var getSelectedValue = $("#orgTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : RECORD,
            type : 'warning',
            time : 3000
        });
    } else {
    	var org = getSelectedValue[0];
    	updateOrgTree();
    	$("#orgAreaCode").prop("disabled", true);
        $("#orgModal").modal("show");
        orgAreaCode.val(org.orgAreaCode);
        orgId.val(org.orgId);
        orgCode.attr('readonly',true);
        orgCode.val(org.orgCode);
        orgName.val(org.orgName);
        orgClass.val(org.orgClass);
        orgAddr.val(org.orgAddr);
        orgContacts.val(org.orgContacts);
        orgTelephone.val(org.orgTelephone);
        available.val(org.available);
        orgDesc.val(org.orgDesc);
        $(".orgTree").combotree('setValue', org.parentOrgName);
        parentId.val(org.parentId);
    }
}

function showParentOrgModal() {
    if ($("#orgId").val() != null && $("#orgId").val() != "") {
        return;
    }
    $("#orgSearchModal").modal('show');
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


function deleteOrg() {
    var getSelectedValue = $("#orgTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : RECORD,
            type : 'warning',
            time : 3000
        });
    } else {
        var orgId = getSelectedValue[0].orgId;
        qiao.bs.confirm({
            msg : DELRELIVE,
            okbtn : "确定"
        }, function() {
            $.get("../orgnization/deleteOrgById?orgId=" + orgId, function(data,
                    status) {
                if (status == "success") {
                    if (data.msgCode == "10000") {
                        qiao.bs.msg({
                            msg : '删除成功',
                            type : 'success',
                            time : 3000
                        });
                        $('#orgTable').bootstrapTable('refresh');
                    } else {
                        qiao.bs.msg({
                            msg : data.msgText,
                            type : 'warning',
                            time : 3000
                        });
                    }
                } else {
                    qiao.bs.msg({
                        msg : '删除失败',
                        type : 'warning',
                        time : 3000
                    });
                }
            });
        });
    }
}

function closeOrgModal() {
    $("#orgModal").modal('hide');
    $("#orgId").val("");
    $("#orgCode").val("");
    $("#orgName").val("");
    $("#orgClass").val("1");
    $("#orgAddr").val("");
    $("#orgContacts").val("");
    $("#orgTelephone").val("");
    $("#available").val("Y");
    $("#orgDesc").val("");
    $("#rsId").val("");
    $("#rsName").val("");
    $("#parentId").val("");
    $("#parentOrgName").val("");

    //初始化树结构下拉框
    /*$('#orgSelect').combotree("setValue", "");
    var t = $('#orgSelect').combotree('tree'); // get the tree object
    t.tree('select', "");
    $('#orgSelect').combotree('tree').tree("collapseAll");*/
}

function closeOrgSearchModal() {
    closeModal("orgSearchModal");
}

function initOrgTree(url) {
    $("#orgParentSelect").combotree({
        url : url,
        valueField : 'id',
        textField : 'text',
        editable : false,
        onClick: function(node) {
            $("#parentId").val(node.id);
            if(node.id==null||node.id==""){
            	areaCodeInfo = "";
            	return;
            }
            //$.ajaxSettings.async = false;
            $.get("../orgnization/findOrgById", {"orgId":node.id}, function (data, status) {
            	$("#orgAreaCode").val(data.orgAreaCode);
            	areaCodeInfo = data.orgAreaCode;
            });
        },
        onBeforeExpand : function(node) {
        	if(addOrUpdateFlog == "add"){
        		$("#orgParentSelect").combotree("tree").tree("options").url = "../orgnization/regionList?getType=add";
        	}else{
        		var getSelectedValue = $("#orgTable").bootstrapTable('getSelections');
        		var org = getSelectedValue[0];
        		if(org.rsId.length!=node.orgRsId.length){
        			$("#orgParentSelect").combotree("tree").tree("options").url = "../orgnization/regionList?getType=update_"+org.rsId;
        		}else{
        			return false;
        		}
        	}
        },
        onLoadSuccess: function(node, data) {
            //$('#orgParentSelect').combotree('setValue', currentOrgId);
        	if(addOrUpdateFlog == "add"){
        		$('#orgParentSelect').combotree('setValue', "----请选择机构----");
          		$('#orgParentSelect').combobox({disabled: false});
                $("#parentId").val("");

        	}else{
        		var getSelectedValue = $("#orgTable").bootstrapTable('getSelections');
        		var org = getSelectedValue[0];
        		$('#orgParentSelect').combobox({disabled: true});
        		$('#orgParentSelect').combotree('setValue', org.parentOrgName);
                $("#parentId").val(org.parentId);
                $("#rsId").val(org.rsId);


        	}
        }
   });
}

//新增机构时创建机构树
function addOrgTree(){
	addOrUpdateFlog = "add";
/*	var getSelectedValue = $("#orgTable").bootstrapTable('getSelections');
	var org = getSelectedValue[0];*/
	var url = "../orgnization/regionList?id=" + currentOrgId+"&getType=init";
	initOrgTree(url);
}

//修改机构时创建机构树
function updateOrgTree(){
	addOrUpdateFlog = "update";
	var getSelectedValue = $("#orgTable").bootstrapTable('getSelections');
	var org = getSelectedValue[0];
	var url = "../orgnization/regionList?id=" + currentOrgId+"&getType=init_";
	initOrgTree(url);
}

function choiceParentOrg() {
    var parentId = $("#parentId");
    var parentOrgName = $("#parentOrgName");
    var getSelectedValue = $("#orgModalTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        msg("请选择一条记录", "warning")
    } else {
        parentId.val(getSelectedValue[0].orgId);
        parentOrgName.val(getSelectedValue[0].orgName);
        closeOrgSearchModal();
    }
}

function addOrgSituation() {
    $("#orgSituationModal").modal('show');
}

function showSituationOrgModal() {
    $("#orgSituationSearchModal").modal('show');

    $('#orgSituationModalTable').bootstrapTable({
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

function choiceSituationOrg() {
    var situationOrgName = $("#situationOrgName");
    var orgId = $("#situationOrgId");
    var getSelectedValue = $("#orgSituationModalTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        msg("请选择一条记录", "warning")
    } else {
        orgId.val(getSelectedValue[0].orgId);
        situationOrgName.val(getSelectedValue[0].orgName);
        closeModal("orgSituationSearchModal");
    }
}

function closeOrgSituationSearchModal() {
    closeModal("orgSituationSearchModal");
}

function saveOrUpdateOrgSituation() {
    var orgName = $("#situationOrgName");
    var orgId = $("#situationOrgId");
    var totalArea = $("#totalArea");
    var totalBirth = $("#totalBirth");
    var totalDeath = $("#totalDeath");
    var totalToilet = $("#totalToilet");
    var totalTapWatel = $("#totalTapWatel");
    var dataYear = new Date($('.qdate').datepicker('getDate')).getFullYear();
    var situationId = $("#situationId");
    $.post("../orgnization/saveOrUpdateOrgSituation", {
        "orgId" : orgId.val(),
        "orgName" : orgName.val(),
        "totalArea" : totalArea.val(),
        "totalBirth" : totalBirth.val(),
        "totalDeath" : totalDeath.val(),
        "totalToilet" : totalToilet.val(),
        "totalTapWatel" : totalTapWatel.val(),
        "dataYear": dataYear,
        "situationId":situationId.val()
    }, function(data, status) {
        if (status == "success") {
            if (data.msgCode == "10000") {
                msg("保存成功", "success")
                $('#orgSituationTable').bootstrapTable('refresh');
                closeOrgSituationModal();
            } else {
                msg(data.msgText, "error")
            }
        } else {
            msg("保存失败", "error")
        }
    });

}

function updateOrgSituation() {
    var orgName = $("#situationOrgName");
    var orgId = $("#situationOrgId");
    var totalArea = $("#totalArea");
    var totalBirth = $("#totalBirth");
    var totalDeath = $("#totalDeath");
    var totalToilet = $("#totalToilet");
    var totalTapWatel = $("#totalTapWatel");
    var situationId = $("#situationId");
    var getSelectedValue = $("#orgSituationTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        msg("请选择一条记录", "warning")
    } else {
        orgId.val(getSelectedValue[0].orgId);
        orgName.val(getSelectedValue[0].orgName);
        totalArea.val(getSelectedValue[0].totalArea);
        totalBirth.val(getSelectedValue[0].totalBirth);
        totalDeath.val(getSelectedValue[0].totalDeath);
        totalToilet.val(getSelectedValue[0].totalToilet);
        totalTapWatel.val(getSelectedValue[0].totalTapWatel);
        $('.qdate').datepicker('update', getSelectedValue[0].dataYear);
        situationId.val(getSelectedValue[0].situationId);
        showModal("orgSituationModal");
        $('#orgSituationTable').bootstrapTable('refresh');
    }
}

function deleteOrgSituation() {
	var getSelectedValue = $("#orgTable").bootstrapTable('getSelections');
	var dataInfo = getSelectedValue[0];
	if(dataInfo.available=="N"){
		msg("当前机构不可再禁用", "error")
		return;
	}
    if (getSelectedValue == null || getSelectedValue == "") {
        msg("请选择一条记录", "warning")
    } else {
    	$.post("../orgnization/updateOrgAvailable", {"orgId":getSelectedValue[0].orgId}, function (data, status) {
            if (status == "success") {
            	if(data.msgCode == "00000"){
            		msg(data.msgText, "error")
            	} else {
            		msg(data.msgText, "success")
            		queryOrg();
            	}
            }
        });

    }
}

function closeOrgSituationModal() {
    closeModal("orgSituationModal");
    $("#situationOrgId").val("");
    $("#situationOrgName").val("");
    $("#totalArea").val("");
    $("#totalBirth").val("");
    $("#totalDeath").val("");
    $("#totalToilet").val("");
    $("#totalTapWatel").val("");
    $("#situationId").val("");
    $('.qdate').datepicker('update', '');
}

function parseAvailable(value, row, index) {
    if ("Y" == value) {
        return "是";
    }
    return "<font style='color:red'>否</font>"
}

function synchronyOrg() {
    $.post('synchronyOrg',{}, function(data, status) {
        if (status == "success") {
            msg("同步成功", "success");
            $('#orgTable').bootstrapTable('refresh');
        }
    });
}

function queryAreaInfo(){
    $.post("../Area/findAllAreaInfo", {}, function(data, status) {
        if (status == "success") {
            if(data != null && data.length > 0){
                $("#orgAreaCode").html("");
                var html = '';
                for(var i = 0;i <data.length;i++){
                    var obj = data[i];
                    html += '<option value="' + obj.areaCode + '">'+ obj.areaName +'</option>';
                }
                $("#orgAreaCode").html(html);
            }
        }
    }
    );
}


function optionOrgTarget(value, row, index){
	if(row.available == "N"){
		return "";
	}
	return "<a class=\"btn btn-primary\" href='#' onclick='showTargetData(\""
		+ row.orgId + "\",\"" + row.parentId + "\")'><i class=\"glyphicon glyphicon-wrench\"></i>&nbsp;维护</a>";
}


function showTargetData(orgcode,parentid){
	$("#orgCodeId").val(orgcode);
	$("#parorgId").val(parentid);
	$.post("../orgnization/findOrgTargetById", {"orgId":orgcode}, function (data, status) {
        if (status == "success") {
            $("[type='FWBRS']").remove();
            $("[type='FWBSX']").remove();
            $("[type='RQRS']").remove();
            $("#xqresidentcount").val(data.xqresidentcount);
            $("#fxqresidentcount").val(data.fxqresidentcount);
            $("#inhabitantscount").val(data.inhabitantscount);
            $("#targetcontract").val(data.targetcontract);
            if(data.targetcontract && data.inhabitantscount){
                var appointRate  = (data.targetcontract/data.inhabitantscount)*100;
                $("#targetrate").val(appointRate.toFixed(2));
            }else{
            	 $("#targetrate").val("");
            }
            $("#appointtrate").val(data.appointtrate);
            $("#placecontract").val(data.placecontract);
            $("#targetId").val(data.id);

            $("#remarks").val(data.remarks);

            //改成动态添加td
            var allPack = data.allInfo.allPack;
            var allLabel = data.allInfo.allLabel;
            if(allLabel!=null&&allLabel.length>0){
            	var RQRStr = "<tr type='RQRS'></tr>";
            	var index = 10;
            	for(var i = 0 ;i<allLabel.length;i++){
            		var RQRStd = "";
            		var label = allLabel[i];

            		RQRStd = "<td align=right>"+label.labelName+"</td>"+
                     "<td type='RQRS' id='"+label.packId+"'>"+
                     "<input type='hidden' id='RQRS"+label.labelid+"id' name='RQRS"+label.labelid+"id'/>"+
                     "<input style='width: 120px;float: left;' type='text' maxlength='6' onkeyup='if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,&#39;&#39;)}else{this.value=this.value.replace(/\\D/g,&#39;&#39;)}' onafterpaste='if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,&#39;0&#39;)}else{this.value=this.value.replace(/\\D/g,&#39;&#39;)}' "+
                     "id='RQRS"+label.labelid+"pNum' name='"+label.labelid+"RQRS' placeholder='目标签约人数'/>"+
                     "</td>";
            		RQRStr = $(RQRStr).append(RQRStd);
            		if((i+1)%2==0){
            			$("#rqmbsz").after(RQRStr);
            			//$("#targetTable").find("tr").eq(index).after(RQRStr);
            			RQRStr = new String("");
            			RQRStr = "<tr type='RQRS'></tr>";
            			index++;
            		}
            	}
            	$("#rqmbsz").after(RQRStr);
    			//$("#targetTable").find("tr").eq(index).after(RQRStr);
            }
            if(allPack!=null&&allPack.length>0){
            	var FWBSXtr = "<tr type='FWBSX'></tr>";
            	var FWBRStr = "<tr type='FWBRS'></tr>";
            	var index = 3;
            	for(var i = 0 ;i<allPack.length;i++){
            		var FWBSXtd = "";
            		var FWBRStd = "";
            		var pack = allPack[i];

            		var isCheckedY = "";
            		var isCheckedN = "";
            		if(pack.packStatus){
            			if(pack.packStatus=="是")isCheckedY="checked";
                		if(pack.packStatus=="否")isCheckedN="checked";
            		}else{
            			isCheckedN="checked";
            		}

            		FWBSXtd = "<td align=right>"+pack.packName+"</td>"+
                     "<td type='FWBSX' id='"+pack.packId+"'>"+
                     "<div class='radio' style='float: left;'>"+
                     "<label><input  type='radio' value='Y' id='is"+pack.packId+"y' name='check"+pack.packId+"' "+isCheckedY+" />是</label>"+
                     "<label style='margin-left:3px'><input  type='radio' value='N' id='is"+pack.packId+"n' name='check"+pack.packId+"' "+isCheckedN+" />否</label>"+
                     "</div>"+
                     "<input type='hidden' id='FWBSX"+pack.packId+"id' name='FWBSX"+pack.packId+"id'/>"+
                     "<input style='width: 110px;float: right;' type='text' maxlength='6' onkeyup='if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,&#39;&#39;)}else{this.value=this.value.replace(/\\D/g,&#39;&#39;)}' onafterpaste='if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,&#39;0&#39;)}else{this.value=this.value.replace(/\\D/g,&#39;&#39;)}' "+
                     "id='FWBSX"+pack.packId+"pNum' name='"+pack.packId+"FWBSX' placeholder='上限包个数'/>"+
                     "</td>";

            		FWBRStd = "<td align=right>"+pack.packName+"</td>"+
                     "<td type='FWBRS' id='"+pack.packId+"'>"+
                     "<input type='hidden' id='FWBRS"
                     +pack.packId+"id' name='FWBRS"+pack.packId+"id'/>"+
                     "<input style='width: 120px;float: left;' type='text' maxlength='6' onkeyup='if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,&#39;&#39;)}else{this.value=this.value.replace(/\\D/g,&#39;&#39;)}' onafterpaste='if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,&#39;0&#39;)}else{this.value=this.value.replace(/\\D/g,&#39;&#39;)}' "+
                     "id='FWBRS"+pack.packId+"pNum' name='"+pack.packId+"FWBRS' placeholder='目标签约人数'/>"+
                     "</td>";

            		FWBSXtr = $(FWBSXtr).append(FWBSXtd);
            		FWBRStr = $(FWBRStr).append(FWBRStd);

            		if((i+1)%2==0){
            			//$("#targetTable").find("tr").eq(index).after(FWBSXtr);
            			//$("#targetTable").find("tr").eq(index+5).after(FWBRStr);
            			$("#fwbxzsx").after(FWBSXtr);
            			$("#fwbrssz").after(FWBRStr);
            			FWBRStr = new String("");
            			FWBSXtr = new String("");
                    	FWBRStr = "<tr type='FWBRS'></tr>";
                    	FWBSXtr = "<tr type='FWBSX'></tr>";
            			index++;
            		}
            	}
            	//$("#targetTable").find("tr").eq(index).after(FWBSXtr);
    			//$("#targetTable").find("tr").eq(index+5).after(FWBRStr);
            	$("#fwbxzsx").after(FWBSXtr);
    			$("#fwbrssz").after(FWBRStr);
            }

            var allPack = data.allInfo.allPack;
        	for(var i = 0 ;i<allPack.length;i++){
        		var FWBSXtd = "";
        		var FWBRStd = "";
        		var pack = allPack[i];

        		var isCheckedY = "";
        		var isCheckedN = "";
        		if(pack.packStatus){
        			if(pack.packStatus=="是")isCheckedY="checked";
            		if(pack.packStatus=="否")isCheckedN="checked";
        		}else{
        			isCheckedN="checked";
        		}

        		if(isCheckedN=="checked"){
        			$("#FWBSX"+pack.packId+"pNum").attr("disabled","disabled");
       		  	}

        	}

            showData(data.FWBSX);
            showData(data.FWBRS);
            showData(data.RQRS);

            clickRadio();

        }
    });

	$("#orgTargetModal").modal("show");
}

function changeAllcount(numStr){
	var targetcontractStr = $("#targetcontract").val();
	if(numStr && targetcontractStr){
		var num = parseInt(numStr);
		var targetcontractNum = parseInt(targetcontractStr);
		if(targetcontractNum>num){
			$("#targetrate").val("");
			return;
		}
		var targetrate = (targetcontractNum/num)*100;
		$("#targetrate").val(targetrate.toFixed(2));
	}else{
		$("#targetrate").val("");
	}
}
function changeTargetCount(numStr){
	var inhabitantscountStr = $("#inhabitantscount").val();
	if(numStr && inhabitantscountStr){
		var num = parseInt(numStr);
		var inhabitantscountNum = parseInt(inhabitantscountStr);
		if(num>inhabitantscountNum){
			$("#targetrate").val("");
			return;
		}
		var targetrate = (num/inhabitantscountNum)*100;
		$("#targetrate").val(targetrate.toFixed(2));
	}else{
		$("#targetrate").val("");
	}
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

function closeTargetData(orgcode){
    $("#xqresidentcount").val("");
    $("#fxqresidentcount").val("");
    $("#inhabitantscount").val("");
    $("#targetcontract").val("");
    $("#targetrate").val("");
    $("#placecontract").val("");
    $("#remarks").val("");

	$("#orgTargetModal").modal("hide");
}

function saveOrUpdateOrgTarget(){
	var targetcontractStr = $("#targetcontract").val();
	var inhabitantscountStr = $("#inhabitantscount").val();
	if(targetcontractStr && inhabitantscountStr){
		var targetcontractNum = parseInt(targetcontractStr);
		var inhabitantscountNum = parseInt(inhabitantscountStr);
		if(targetcontractNum>inhabitantscountNum){
			 msg("无法保存,目标签约人数不能大于总居民数!", "warning");
			 return;
		}
	}

	var params = $("#orgTargetForm").serializeArray();
	var values = {};
	for( x in params ){
		values[params[x].name] = params[x].value;
	}
	if(values.xqresidentcount == "" || values.xqresidentcount == null
			|| values.fxqresidentcount == "" || values.fxqresidentcount == null
			|| values.inhabitantscount == "" || values.inhabitantscount == null){
		 msg("无法保存,必填项不能为空!", "warning");
		 return;
	}
	 var targetrateNum = parseFloat($("#targetrate").val());
	 var appointtrateNum = parseFloat(values.appointtrate);
	 //履约率可以大于签约率，则给用户提示
	if(appointtrateNum>targetrateNum){
		 msg("无法保存,履约率不可以大于签约率!", "warning");
		 return;
	}
	var base = [];
	jQuery.each(values,function(k,val){
		var demo = new Object();
		demo.baseType = "O";
		demo.baseTargetId = $("#targetId").val();
		if(k.search("FWBSX")==0){
			demo.configureCode = "FWBSX";
			k = k.replace("FWBSX","");
			k = k.substring(0,k.lastIndexOf('id'));
			demo.sonId = k;
			demo.isTrue = values["check"+k];
			demo.value = values[k+"FWBSX"];
			demo.id = val;
		}
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
    $.post("../orgnization/saveOrUpdateOrgTarget", jsonParam, function (data, status) {
        if (status == "success") {
            msg("配置成功！", "success");
            $("#xqresidentcount").val("");
            $("#fxqresidentcount").val("");
            $("#inhabitantscount").val("");
            $("#targetcontract").val("");
            $("#targetrate").val("");
            $("#placecontract").val("");
            $("#remarks").val("");

        	$("#orgTargetModal").modal("hide");
        }
    });
}

function onlyNonNegative(obj) {
	 var inputChar = event.keyCode;
	 //alert(event.keyCode);

	 //1.判断是否有多于一个小数点
	 if(inputChar==190 ) {//输入的是否为.
	  var index1 = obj.value.indexOf(".") + 1;//取第一次出现.的后一个位置
	  var index2 = obj.value.indexOf(".",index1);
	  while(index2!=-1) {
	   //alert("有多个.");

	   obj.value = obj.value.substring(0,index2);
	   index2 = obj.value.indexOf(".",index1);
	  }
	 }
	 //2.如果输入的不是.或者不是数字，替换 g:全局替换
	 obj.value = obj.value.replace(/[^(\d|.)]/g,"");
	 var num = parseFloat(obj.value);
	 var reg = new RegExp("/^((?!0)\d{1,2}|100)$/");
	 if(num>100) {
		 obj.value = "100";
	 }

	}

function clickRadio(){
	$("input[type='radio']").bind('click',function(){
		var name = this.name;
		var subStringName=name.substring(5);
		if(this.value=="N"){
			$("input[name='"+subStringName+"FWBSX']").attr("disabled","disabled");
		}else if(this.value=="Y"){
			$("input[name='"+subStringName+"FWBSX']").removeAttr("disabled");
		}
	});
}
