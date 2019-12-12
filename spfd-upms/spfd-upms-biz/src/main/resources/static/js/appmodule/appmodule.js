function loadAppModule() {
	$('#treediv').bstree({url:'../appmodule/findAllAppModule?groupId=', edit:true,open:true});
}

function checkusergroup(id, userGroupName) {
	$("#group").html(userGroupName);
	$("#groupId").val(id);
	$('#treediv').bstree({url:'../appmodule/findAllAppModule?groupId=' + $("#groupId").val(), edit:true,open:true});
}

function addUserAppModule() {
	var groupId = $("#groupId");
	if (groupId.val() == "" || groupId.val() == null) {
		msg("请先选择用户组", "info");
		return;
	}

	var moduleIds = "";
	$("input[type='checkbox']").each(function(){
		var $this = $(this);
		var type = $this.attr("data-type");
		if ($this.prop('checked') == true && type=="module") {
			moduleIds += $this.val() + ",";
		}
	});
	moduleIds = moduleIds.substring(0, moduleIds.length - 1);
	$.post("../usergroup/addUserAppModule",
			{"groupId":groupId.val(),"moduleIds":moduleIds},
			function(data, status){
				if (status == "success") {
					if (data.msgCode == "10000") {
						msg(data.msgText, "success");
					} else {
						msg(data.msgText, "error");
					}
				} else {
					msg("用户组分配菜单失败,请检查网络", "error");
				}
	        }
	);

}