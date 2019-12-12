layui.use(['form', 'layedit', 'laydate','laytpl','table','tree'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,laytpl = layui.laytpl
  ,table = layui.table
  ,$ = layui.$;
  var tree = layui.tree;
  //监听复选框事件
  table.on('checkbox(person-table)', function(obj){
	  if(obj.type=="one"){
		  $("#emp").find("tr[type='']").remove();
		  if(obj.checked){
		  		  $("input[empid='"+obj.data.id+"']").each(function(){
		  			  $(this).removeAttr("disabled");
		  			  form.render();
		  		  })
	    		var flag = true;
  	  		  	$("#emp").find("tr[type='"+obj.data.id+"']").each(function(e){
  	  		  		flag = false;
  	  		  	})
  	  		  	if(flag){
  					htmlTpl1(obj.data,"#personTrTpl","#emp",function(){});
  	  		  	}
	  	  }else{
	  		  /*$("#emp").find("tr[type='"+obj.data.id+"']").each(function(e){
	  			  $(this).remove();
	  		  })*/
	  		  $("#emp").find("tr[type='"+obj.data.id+"']").remove();
	  		  $("input[empid='"+obj.data.id+"']").each(function(){
	  			  $(this).removeAttr("checked");
	  			  $(this).attr("disabled","disabled");
	  			  form.render();
	  		  })

	  	  }
	  }else{
		  if(obj.checked){
	  		  $("input[empid]").each(function(){
	  			  $(this).removeAttr("disabled");
	  			  form.render();
	  		  })
			  var checkStatus = table.checkStatus('personReload')
	  	      ,data = checkStatus.data;
			  var Tpl = $('#personTrTpl').html();
			  var trs = "";
	  	      for(var i =0 ;i<data.length;i++){
	  	    	laytpl(Tpl).render(data[i],function(html){
	  	    		var flag = true;
	  	  		  	$("#emp").find("tr[type='"+data[i].id+"']").each(function(e){
	  	  		  		flag = false;
	  	  		  	})
	  	  		  	if(flag){
		  	    		trs+=html;
	  	  		  	}
	  	    	});
	  	      }
	  	      $("#emp").html($("#emp").html()+trs);
	  	  }else{
	  		  $("input[empid]").each(function(){
	  			  $(this).removeAttr("checked");
	  			  $(this).attr("disabled","disabled");
	  			  form.render();
	  		  })

			  var data = table.cache.personReload;
			  var Tpl = $('#personTrTpl').html();
			  var trs = "";
	  	      for(var i =0 ;i<data.length;i++){
		  		  /*$("#emp").find("tr[type='"+data[i].id+"']").each(function(e){
		  			  $(this).remove();
		  		  })*/
		  		  $("#emp").find("tr[type='"+data[i].id+"']").remove();
	  	      }
	  	  }
  	      /**/
	  }
//	  console.log(obj.checked); //当前是否选中状态
//	  console.log(obj.data); //选中行的相关数据
//	  console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
	});
  //监听职位复选框事件
  form.on('checkbox(lockDemo)',function(obj){
	  if(obj.elem.checked){
		  var flag = true;
		  $("#emp").find("tr[type='"+$(this).attr("empId")+"']").find("span").each(function(e){
			  flag = false;
	  	  })
	  	  if(flag){
	  		var span = "<span name='"+obj.elem.value+"'>"+obj.elem.title+"</span>";
	  	  }else{
		  	var span = "<span name='"+obj.elem.value+"'>,"+obj.elem.title+"</span>";
	  	  }
		  var str = $("tr[type='"+$(this).attr("empId")+"']").find("#job").val()+","+obj.elem.value;
		  str = str.replace(/^,+/,"");
	  	  $("tr[type='"+$(this).attr("empId")+"']").find("#job").val(str);
	  	  var html = $("tr[type='"+$(this).attr("empId")+"']").find("#jobTd").html();
	  	  $("tr[type='"+$(this).attr("empId")+"']").find("#jobTd").html(html+span);
	  }else{
		  $("#emp").find("tr[type='"+$(this).attr("empId")+"']").find("span[name='"+obj.elem.value+"']").remove();
		  var text = $("#emp").find("tr[type='"+$(this).attr("empId")+"']").children('td').eq(1).children('span').eq(0).text();
		  if (text.substr(0,1)==','){
			  text=text.substr(1);
		  }
		  $("#emp").find("tr[type='"+$(this).attr("empId")+"']").children('td').eq(1).children('span').eq(0).text(text);
		  //.find("tr:last span:first").text();

		  var val = $("tr[type='"+$(this).attr("empId")+"']").find("#job").val();
		  var str = val.replace(","+obj.elem.value,"");
		  str = str.replace(obj.elem.value,"");
		  str = str.replace(/^,+/,"").replace(/,+$/,"");
		  $("tr[type='"+$(this).attr("empId")+"']").find("#job").val(str);

  	  }
  })

    form.on('switch(isAvailableFilter)', function(data){
   	 var alert_value =this.checked ? '1' : '0';   //1代表开启 0代表关闭
	 if(alert_value == "1"){
		 $("#available").val("Y");
	 }else{
		 $("#available").val("N");
	 }


      });
    // 获取url指定参数值
    function GetQueryString(name) {
        var reg = new RegExp(("(^|&)"+name+"=([^&]*)(&|$)"));
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);return null;
    }


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
                            if (typeof str1[1] == 'undefined' || str1[1]==null) data.job = '';
                            else data.job=str1[1]
                          	data.jobName = getFunction(data.job);
                          	data.empName = str1[2];
                          	member.push(data);
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
				/*$('#orgName').val(data[0].text);
	            $('#teamorgid').val(data[0].id);*/
				data = orgName(data);
				tree({
			        elem: '#demo' //传入元素选择器
			        ,nodes: data
			        ,click: function(item){ //点击节点回调
			            $('#tree_select').toggleClass('layui-form-selected');
			            $('#open_select').children("input").first().val(item.name);
			            $('#open_select').children("input").last().val(item.id);
			            $("#empName").val("");
			            var dataObj = {
			            		orgId : $("#teamorgid").val()
			            }
			            personinfo(dataObj);
			            var elem = document.getElementById("emp");
			            elem.innerHTML = "";

			        }
					,skin:"shihuang"
			    });
				var dataObj = {
	            		orgId : $("#teamorgid").val()
	            }
	            personinfo(dataObj);

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

  //加载员工列表
  function personinfo(data){


	var orgId = "";
	var available =  $("#available").val();
	var empName = "";

	if(data.orgId){
		orgId = data.orgId;
	}
	if(data.teamorgid){
		orgId = data.teamorgid;
	}

/*	if(data.available){
		available = data.available;
	}*/
	if(data.empName){
		empName = data.empName;
	}
	  table.render({
		    elem: "#person"
		    ,url : "../../emp/getEmpDatas"
		    ,where: {
		    	orgId: orgId,
		    	//available: available,
		    	empName: empName,
            }
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
	  	    ,done: function(){
          	  if(member.length<=0){
        	  		  $("input[empid]").each(function(){
        	  			  $(this).removeAttr("checked");
        	  			  $(this).attr("disabled","disabled");
        	  			  form.render();
        	  		  })
            	  }
          		//遍历职位列
              	$("td[data-field='id']").each(function(e,n){
            		//获取当前行的员工id
            		var empid = $(this).find("input:checkbox").attr("empid");
            		var flag = true;
              		for(var i= 0;i<member.length;i++){
              			if(flag){
  	                		//如果加载过来的员工与当前列相等
  	                		if(empid==member[i].id){
  	                			flag = false;
  	                			//选中当前行的复选框
  	                			$("input[name='layTableCheckbox']").eq(e+1).attr("checked","");
  	                			//重新渲染表单元素
  	        					form.render();
  	        					//遍历当前员工的职位复选框——也就是每行后面三个复选框
  	                			$("input[empid='"+member[i].id+"']").each(function(){
  	                				//如果当前员工的职位中包含当前复选框的value值则选中复选框并重新渲染表单元素
  	                				if(member[i].job.search($(this).val())>=0){
  	                					$(this).attr("checked","");
  	                					form.render();
  	                				}
  	                			})
  	                		}else{
  	                			flag = true;
  	                		}
              			}
            	  	}
              	if(flag){
              		$("input[empid='"+empid+"']").attr("disabled","disabled");
    					form.render();
              	}
            	})
      			$('input[lay-filter="layTableAllChoose"]').attr({name:"layTableCheckbox_disabled",disabled:"disabled", hidden:"hidden"});
	  	    }
	  	  });

  }
    reqdata();
    setTimeout(function(){
    	var dataObj = {orgId : $('#teamorgid').val()};personinfo(dataObj);
    },200);
    if(isundefined(id) == ''){
    	getOrg();//加载机构树                        禁止修改机构无需加载
    }
    //监听提交 提交data.field即可
    form.on('submit(formDemo)', function(data){
        // todo 提交数据
    	data.field.teamMember = getMember();
        $.ajax({
            url : "../../Team/saveorupdate",
            type : "POST",
            data : data.field,
            dataType : "json",
            success : function(result) {
                // todo 提示 & 重新显示表格数据
            	if(result.msgCode=="00000"){
            		layer.msg(result.msgText);
            	}else{
            		layer.msg('添加/修改成功');
                    //设置延迟1.2秒钟加载
                    setTimeout("window.location.href='../team/TeamInFo.html'",1200);
            	}

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

    function getMember(){
    	var member = "";
    	$("#emp").find("tr").each(function(e){
    		member += ";"+$(this).attr("type")+"|"+$(this).find("input:hidden").val();
    	})
    	member = member.replace(/^;+/,"");
    	return member;
    }
    form.on('submit(searchForm)', function(data){
    	data.orgId = $("#teamorgid").val();
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