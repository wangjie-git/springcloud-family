layui.use(['form', 'layedit', 'laydate','laytpl','table','tree', 'element'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,laytpl = layui.laytpl
  ,table = layui.table
  ,$ = layui.$
  ,element = layui.element;
  var tree = layui.tree;
    //监听提交 提交data.field即可
    form.on('submit(formDemo)', function(data){
        // todo 提交数据
    	var targetIds = "";
    	var type=$("#updateTargetType").val();
    	if(typeof type == 'undefined' || type==null){
    		return layer.msg("请选择目标类型");
    	}
    	if(type=="2"){
    		targetIds = getTargetIds('areaTable_id', "areaCode");

    	}else if(type=="3"){
    		targetIds = getTargetIds('orgTable_id', "orgId");
    	}else if(type=="4"){
    		targetIds = getTargetIds('empTable_id', "id");
    	}
    	data.field.targetIds = targetIds;
    	//data.field.teamMember = getMember();
        $.ajax({
            url : "../../phone/saveAppversion",
            type : "POST",
            data : data.field,
            dataType : "json",
            success : function(result) {
                // todo 提示 & 重新显示表格数据
            	if(result.code=="0000"){
            		layer.msg(result.msg);
            	}else{
            		layer.msg('添加/修改成功');
                    //设置延迟1.2秒钟加载
                    setTimeout("location.reload();",1200);
            	}

            },
            error:function(msg){
                layer.msg('未连到服务器')
            }
        })

    });
  	function getTargetIds(tableId, param){
  		var ids = "";
  		var data = layui.table.checkStatus(tableId).data;
  		for (var i = 0; i < data.length; i++) {
			ids += eval("data[i]."+param)+",";
		}
  		ids = ids.substring(0, ids.length-1);
  		if(ids == ""){
  			return layer.msg("请选择目标");
  		}
  		return ids;
  	}
    //监听目标类型
    form.on('select(selectType)', function(data){
    	$("#target").empty();
    	var val=data.value;
    	$("#form").next().remove();
    	form.render();
    	creatTable(val);
    	table.on('checkbox(area-table)', function(obj){
    		$("#target").find("span[idvalue='']").remove();
    		obj.data.name = obj.data.areaName;
  		  	if(obj.checked){
  		  		var flag = true;
    	  		$("#target").find("span[idvalue='"+obj.data.id+"']").each(function(e){
    	  			 flag = false;
    	  		})
    	  		if(flag){
    	  			htmlTpl2(obj.data,"#targetHtml","#target",function(){});
    	  		}
  		  	}else{
  		  		$("#target").find("span[idvalue='"+obj.data.id+"']").remove();
  		  	}
    	});
    	table.on('checkbox(org-table)', function(obj2){
    		$("#target").find("span[idvalue='']").remove();
    		obj2.data.name = obj2.data.orgName;
    		obj2.data.id = obj2.data.orgId;
  		  	if(obj2.checked){
  		  		var flag = true;
    	  		$("#target").find("span[idvalue='"+obj2.data.id+"']").each(function(e){
    	  			 flag = false;
    	  		})
    	  		if(flag){
    	  			htmlTpl2(obj2.data,"#targetHtml","#target",function(){});
    	  		}
  		  	}else{
  		  		$("#target").find("span[idvalue='"+obj2.data.id+"']").remove();
  		  	}
    	});
    	table.on('checkbox(emp-table)', function(obj3){
    		$("#target").find("span[idvalue='']").remove();
    		obj3.data.name = obj3.data.empName;
  		  	if(obj3.checked){
  		  		var flag = true;
    	  		$("#target").find("span[idvalue='"+obj3.data.id+"']").each(function(e){
    	  			 flag = false;
    	  		})
    	  		if(flag){
    	  			htmlTpl2(obj3.data,"#targetHtml","#target",function(){});
    	  		}
  		  	}else{
  		  		$("#target").find("span[idvalue='"+obj3.data.id+"']").remove();
  		  	}
    	});
    });

    //初始化创建表单
    function creatTable(type){
    	var val =  type;
    	if(val=="2" || val=="3" || val=="4"){
    		var areaType = 'radio';
    		var areaWidth = "270";
    		if(val=="2" || val=="3"){
    			if(val=="2"){
    				areaType = "checkbox";
    			}
    			areaWidth = "500";
    		}
    		//$(".areaTable").remove();
    		$("#form").after("<table border='0' cellpadding='0' cellspacing='0'><tr><td id='areatableTd'></td><td hidden id='orgtableTd'></td><td hidden id='emptableTd'></td></tr></table>");

    		if($("#areaTable").length == 0){
    			$("#areatableTd").append("<table style='float:float' class='areaTable' id='areaTable' lay-filter='area-table'>");
    		}
    		/*$("[lay-filter='area-table']").remove();
    		$("[lay-filter='org-table']").remove();
    		$("[lay-filter='emp-table']").remove();*/
    		var length1=$("#areaTable");
   		 	table.render({
   		 		id : "areaTable_id"
    		    ,elem: "#areaTable"
    		    ,url : "../../Area/areaInFo"
    		    ,width : areaWidth
    		    ,where : {isAvailable: 'Y'}
    		    ,cols: [[ //标题栏
    		       {type:areaType},
    		      {field:'areaName', title: '区域名称'},
    		      {field:'areaCode', title: '区域编码'},
    		    ]]
    		    ,skin: 'line' //表格风格
    		    ,even: true
    		    ,page: true //是否显示分页
    		    ,limits: [10]
    		    ,limit: 10 //每页默认显示的数量,
    		    ,done : function(){
    		    	if(val=="3" || val=="4"){
    		    		table.on('radio(area-table)', function(obj){
    		    			var areaCode = obj.data.areaCode;
    		    			var orgType = 'radio';
    		    			var orgWidth = "270";
    		        		if(val=="3"){
    		        			orgType = "checkbox";
    		        			orgWidth = "500";
    		        		}
    		    			if(obj.checked){
    		    				/*$(".orgTable").remove();
    		    				$(".empTable").remove();*/
    		    	    		if($("#orgTable").length == 0){
    		    	    			$("#orgtableTd").append("<table style='float:float' class='orgTable' id='orgTable' lay-filter='org-table'>");
    		    	    		}
    		    	    		$("#emptableTd").attr("hidden","hidden");
    		    	    		$("#orgtableTd").removeAttr("hidden");
    		    	    		 table.render({
    		    	     		    elem: "#orgTable"
    		    	     		    ,id : "orgTable_id"
    		    	     		    ,url : "../../orgnization/findOrgByAreaCode"
    		    	     		    ,method :'post'
    		    	     		    ,width : orgWidth
    		    	     		    ,where : {areaCode: areaCode}
    		    	     		    ,cols: [[ //标题栏
    		    	     		       {type:orgType},
    		    	     		      {field:'orgName', title: '机构名称'},
    		    	     		      {field:'orgCode', title: '机构编码'},
    		    	     		    ]]
    		    	     		    ,skin: 'line' //表格风格
    		    	     		    ,even: true
    		    	     		    ,page: true //是否显示分页
    		    	     		    ,limits: [10]
    		    	     		    ,limit: 10 //每页默认显示的数量,
    		    	     		    ,done : function(){
    		    	     		    	if(val=="4"){
    		    	     		    		table.on('radio(org-table)', function(obj){
    		    	     		    			if(obj.checked){
    		    	     		    				/*$(".empTable").remove();*/
    		    	     		    				if($("#empTable").length == 0){
    		    	    		    	    			$("#emptableTd").append("<table style='float:float' class='empTable' id='empTable' lay-filter='emp-table'>");
    		    	    		    	    		}
    		    	     		    				$("#emptableTd").removeAttr("hidden");
    		    	    		    	    		 table.render({
    		    	    		    	     		    elem: "#empTable"
    		    	    		    	     		    ,id : "empTable_id"
    		    	    		    	     		    ,url : "../../emp/getEmpDatas"
    		    	    		    	     		    ,width : "400"
    		    	    		    	     		    ,where : {orgId: obj.data.orgId}
    		    	    		    	     		    ,cols: [[ //标题栏
    		    	    		    	     		       {type:'checkbox'},
    		    	    		    	     		      {field:'empName', title: '姓名', width: "20%"},
    		    	    		    	     		      {field:'sex', title: '性别', width: "20%"},
    		    	    		    	     		     {field:'idNo', title: '身份证号'},
    		    	    		    	     		    ]]
    		    	    		    	     		    ,skin: 'line' //表格风格
    		    	    		    	     		    ,even: true
    		    	    		    	     		    ,page: true //是否显示分页
    		    	    		    	     		    ,limits: [10]
    		    	    		    	     		    ,limit: 10 //每页默认显示的数量,
    		    	    		    	     		    ,done : function(){
    		    	    		    	    		    	$('input[lay-filter="layTableAllChoose"]').attr({name:"layTableCheckbox_disabled",disabled:"disabled", hidden:"hidden"});
    		    	    		    	     		    }
    		    	    		    	    		 });
    		    	     		    			}
    		    	     		    		});
    		    	     		    	}
    		    	     		    	$('input[lay-filter="layTableAllChoose"]').attr({name:"layTableCheckbox_disabled",disabled:"disabled", hidden:"hidden"});
    		    	     		    }
    		    	     		  });
        			  	  	}

    		    		});
    		    	}
    		    	$('input[lay-filter="layTableAllChoose"]').attr({name:"layTableCheckbox_disabled",disabled:"disabled", hidden:"hidden"});
    		    }
    		  });
    	}
    }

    //搜索
	$('#searchForm').on('click',function(){
		var type=$("#updateTargetType").val();
		var searchType=$("#searchType").val();
		var searchname=$("#searchname").val();
		if(type=="1" || type==""){
			return;
		}
		if(searchType=="99"){
			table.reload('areaTable_id', {url : "../../Area/areaInFo", where: {isAvailable: 'Y',areaname: searchname} //设定异步数据接口的额外参数
			});
			var areaCode = layui.table.checkStatus("areaTable_id").data.areaCode;
			table.reload('orgTable_id', {url : "../../orgnization/findOrgByAreaCode", where: {areaCode: areaCode,orgName: searchname} //设定异步数据接口的额外参数
			});
			table.reload('empTable_id', {url : "../../emp/getEmpDatas", where: {orgId: orgId,empName: searchname} //设定异步数据接口的额外参数
			});
		}
		else if(type=="2"){
			table.reload('areaTable_id', {url : "../../Area/areaInFo", where: {isAvailable: 'Y',areaname: searchname} //设定异步数据接口的额外参数
				});
		}else if(type=="3"){
			if(searchType=="1"){
				table.reload('areaTable_id', {url : "../../Area/areaInFo", where: {isAvailable: 'Y',areaname: searchname} //设定异步数据接口的额外参数
				});
			}else if(searchType=="2"){
				var areaCode = layui.table.checkStatus("areaTable_id").data.areaCode;
				table.reload('orgTable_id', {url : "../../orgnization/findOrgByAreaCode", where: {areaCode: areaCode,orgName: searchname} //设定异步数据接口的额外参数
				});
			}
		}else if(type=="4"){
			if(searchType=="1"){
				table.reload('areaTable_id', {url : "../../Area/areaInFo", where: {isAvailable: 'Y',areaname: searchname} //设定异步数据接口的额外参数
				});
			}else if(searchType=="2"){
				var areaCode = layui.table.checkStatus("areaTable_id").data.areaCode;
				table.reload('orgTable_id', {url : "../../orgnization/findOrgByAreaCode", where: {areaCode: areaCode,orgName: searchname} //设定异步数据接口的额外参数
				});
			}else if(searchType=="3"){
				var orgId = layui.table.checkStatus("orgTable_id").data.orgId;
				table.reload('empTable_id', {url : "../../emp/getEmpDatas", where: {orgId: orgId,empName: searchname} //设定异步数据接口的额外参数
				});
			}
		}
    });

	table.render({
	    elem: "#packList_table"
	    ,id : "packList_table"
	    ,url : "../../phone/getAppversion"
	    ,cols: [[ //标题栏
	      //{type:'radio'},
	      {field:'appVersionCode', title: '版本号', align: "center"},
	      {field:'packName', title: '更新包名', align: "center"},
	      {field:'updateUrl',title:'更新地址', align: "center"},
	      {field:'updateTargetType', title: '更新目标类型', align: "center"},
	      {field:'creatDate', title: '创建时间', align: "center"},
          //{title: '操作',align:'center', fixed: 'right',  toolbar: '#test-table-team-barDemo'}
	    ]]
	    ,skin: 'line' //表格风格
	    ,even: true
	    ,page: true //是否显示分页
	    ,limits: [10, 20, 50]
	    ,limit: 10 //每页默认显示的数量
	});
	//------------------------------------更新包历史记录----------
	//Hash地址的定位
	var layid = location.hash.replace(/^#test=/, '');
	element.tabChange('test', layid);
	element.on('tab(test)', function(elem){
	    location.hash = 'test='+ $(this).attr('lay-id');
	    if($(this).attr('lay-id') == '22'){
	    	table.reload('packList_table', {url : "../../phone/getAppversion" //设定异步数据接口的额外参数
			});
	    }
	});
});
function htmlTpl2(data, getid, toid, fun) {
	  layui.use('laytpl', function(){
	    var $=layui.$;
	    var laytpl = layui.laytpl;
	    var getTpl = $(getid).html();
	    laytpl(getTpl).render(data, function(html){
	      var table = $(toid).html();
	      $(toid).html(table+html);
	      if (typeof fun == 'function') {
	        fun();
	      }
	    });
	  });
	}

function htmlTpl1(data, getid, toid, fun) {
  layui.use('laytpl', function(){
    var $=layui.$;
    var laytpl = layui.laytpl;
    var getTpl = $(getid).html();
    laytpl(getTpl).render(data, function(html){
      var table = $(toid).html();
      $(toid).html(html+table);
      if (typeof fun == 'function') {
        fun();
      }
    });
  });
}
function htmlTpl(data, getid, toid, fun) {
  layui.use('laytpl', function(){
    var $=layui.$;
    var laytpl = layui.laytpl;
    var getTpl = $(getid).html();
    laytpl(getTpl).render(data, function(html){
      $(toid).html(html);
      if (typeof fun == 'function') {
        fun();
      }
    });
  });
}
function ischecked(data,val){
    return data==val?'checked':'';
}

function isSelected(data,val){
    return data==val?'selected=""':'';
}
function ischeckbox(data,val){
    var arr=data.split(',');
    for (var i = 0; i < arr.length; i++) {
        if(arr[i]==val){
            return 'checked';
        }
    }
    return '';
}
function isundefined(val){
  if (typeof val == 'undefined' || val==null) {
    return '';
  }
  return val;
}

function ischeckedToAvailable(data,val){
	if(typeof data == 'undefined' && val=="是"){
		return 'checked';
	}
    return data==val?'checked':'';
}