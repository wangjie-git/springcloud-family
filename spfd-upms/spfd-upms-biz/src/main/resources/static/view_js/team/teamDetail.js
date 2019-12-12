layui.use(['form', 'layedit', 'laydate','laytpl','table'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,laytpl = layui.laytpl
  ,table = layui.table
  ,$ = layui.$;

  var id = GetQueryString("teamId");
  var member = [];
  // 页面初始化需要用到 请求数据
  function reqdata(){
      if(id!=null){
          var index = layer.load();
          $.ajax({
              url : "../../Team/teamInfoById",
              type : "GET",
              data : {"teamid":id},
              dataType : "json",
              success : function(result) {
                  // 进行处理
                  htmlTpl(result, '#demoTpl', '#tablehtml', function(){
                      layer.close(index);
                      form.render();
                  })
                  if(result.teamMember){
                	  var str = result.teamMember.split(";");
                      for(var i=0;i<str.length;i++){
                        var data = new Object();
                      	var str1 = str[i].split("|");
                      	data.id = str1[0];
                      	data.job = str1[1];
                      	member.push(data);
                      	data.empName = str1[2];
                      	data.jobName = getFunction(str1[1]);
        				htmlTpl1(data,"#personTrTpl","#emp",function(){});
                      }
                  }

              },
              error:function(msg){
                  layer.msg('未连到服务器')
                  layer.close(index);
              }
          })
      }else{
          var result=[];
          htmlTpl(result, '#demoTpl', '#tablehtml', function(){
              form.render();
          })
      }
  }
  function getFunction(param){

	if(typeof param == 'undefined' || param==null || param==""){
		  return "";
	  }
  	var str = param.split(",");
  	var span = "";
  	if(str!=null && str.length>0){
  		for(var i = 0;i<str.length;i++){
  			if(i==0){
  				span="<span name='"+str[i]+"'>"+checkFunction(str[i])+"</span>"
  			}else{
  				span+="<span name='"+str[i]+"'>,"+checkFunction(str[i])+"</span>"
  			}
  		}
  	}
  	return span;
  }
  function checkFunction(str){
  	if(str=="1")return "签约";
  	if(str=="2")return "履约";
  	if(str=="3")return "专项";
  }
  //加载员工列表
    function personinfo(data){
    	$.ajax({
            url : "../../emp/findEmpCondition",
            type : "POST",
            data : data,
            dataType : "json",
            success : function(result) {
            	  table.render({
            	  	    elem: "#person"
            	  	    ,data : result.rows
            	  	    ,cols: [[ //标题栏
            	  	      {type:'checkbox'},
            	  	      {field:'empName', title: '名字',width:145},
            	  	      {field:'sex', title: '性别',width:134},
            	  	      {field:'idNo', title: '身份证 ',width:220},
            	  	      {field: 'id', width:500, title:"职位", align:'center', toolbar: '#checkboxTpl'}
            	  	    ]]
            	  		,id: 'personReload'
            	  	    ,skin: 'line' //表格风格
            	  	    ,even: true
            	  	    ,page: true //是否显示分页
            	  	    ,limits: [5, 10, 20]
            	  	    ,limit: 5 //每页默认显示的数量
            	  	  });
            	  for(var i= 0;i<member.length;i++){
                	$("td[data-field='id']").each(function(e,n){
                		var empid = $(this).find("input:checkbox").attr("empid");
                		if(empid==member[i].id){
                			$("input[name='layTableCheckbox']").eq(e+1).attr("checked","");
        					form.render();
                			$("input[empid='"+member[i].id+"']").each(function(){
                				if(","+member[i].job.search($(this).val())){
                					$(this).attr("checked","");
                					form.render();
                				}
                			})
                		}
                	})
            	  }
            },
            error:function(msg){
                layer.msg('未连到服务器');
            }
    	})

    }

    personinfo(null);
    reqdata();
    //监听提交 提交data.field即可
    function member(){
    	var member = "";
    	$("#emp").find("tr").each(function(e){
    		member += ";"+$(this).attr("type")+"|"+$(this).find("input:hidden").val();
    	})
    	member = member.replace(/^;+/,"");
    	return member;
    }
    form.on('submit(formDemo)', function(data){
        // todo 提交数据
    	data.field.teamMember = member();

        $.ajax({
            url : "../../Team/saveorupdate",
            type : "POST",
            data : data.field,
            dataType : "json",
            success : function(result) {
                // todo 提示 & 重新显示表格数据
                layer.msg('添加/修改成功');
            },
            error:function(msg){
                layer.msg('未连到服务器')
            }
        })

        // layer.alert(JSON.stringify(data.field), {
        //     title: '最终的提交信息'
        // })
        // return false;
    });

    form.on('submit(searchForm)', function(data){
        personinfo(data.field);
    });

});

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
  if (typeof val == 'undefined') {
    return '';
  }
  return val;
}