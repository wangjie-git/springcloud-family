layui.use(['form','laydate','rate','table','tree'], function(){
    var tree = layui.tree;
    var $ = layui.$;
    function orgName(data){
    	for(var i =0;i<data.length;i++){
    		data[i].name = data[i].text;
    		if(data[i].children!=null&&data[i].children.length>0){
    			data[i].children = orgName(data[i].children);
    		}
    	}
    	return data;
    }
	function getOrg(){
		$.ajax({
			url:"../../orgnization/findOrgList",
			type:"post",
			dataType:"json",
			success: function(data){
				data = orgName(data);
				tree({
			        elem: '#demo' //传入元素选择器
			        ,nodes: data
			        ,click: function(item){ //点击节点回调
			            $('#tree_select').toggleClass('layui-form-selected');
			            $('#open_select').children("input").first().val(item.name);
			            $('#open_select').children("input").last().val(item.id);
			            loadTeams(item.id);
			        }
					,skin:"shihuang"
			    });

			    $('#open_select').click(function(){
			        $('#tree_select').toggleClass('layui-form-selected');
			    });

			    $('dl .layui-tree-spread').click(function(e){
			        layui.stope(e)
			    });
			},
			error: function(error){
                layer.msg('未连到服务器')
			}
		})
	}
	getOrg();
})

function loadTeams(orgId) {
    // 加载基本字典
    $.post("../../Team/queryTeamsByOrgId", {"orgId":orgId}, function(data, status) {
        if (status == "success") {
            var option = "<option value=''></option>";
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    option += "<option value=" + data[i].id + ">"
                            + data[i].teamname + "</option>";
                }
            }
            $("#teamId").html(option);
            layui.use('form', function() {
                var form = layui.form;
                form.render();
            });
        }
    });
}