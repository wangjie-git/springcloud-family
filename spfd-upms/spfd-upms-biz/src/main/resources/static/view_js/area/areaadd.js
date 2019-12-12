layui.use(['form', 'layedit', 'laydate','laytpl','table'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,laytpl = layui.laytpl
  ,table = layui.table
  ,$ = layui.$;

    // 获取url指定参数值
    function GetQueryString(name) {
        var reg = new RegExp(("(^|&)"+name+"=([^&]*)(&|$)"));
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);return null;
    }

    // 页面初始化需要用到 请求数据
    function reqdata(){

        var id = GetQueryString('id').split("_")[0];
        if(id!=null){
        	var redonly = GetQueryString('id').split("_")[1];
            var index = layer.load();
            $.ajax({
                url : "../../Area/areaInfoByid",
                type : "GET",
                data : {"ids":id},
                dataType : "json",
                success : function(result) {
                    // 进行处理
                    htmlTpl(result, '#demoTpl', '#tablehtml', function(){

                    	var groupCheckbox = $("input:checkbox[name='dhyggwsval']");
                    	for (i = 0; i < groupCheckbox.length; i++) {
                    	      var val =groupCheckbox[i].value;
                    	      if(result.dhyggwsval != null){
	                    	      if(result.dhyggwsval.split(',').indexOf(val)!=-1){
	                    	    	  groupCheckbox[i].checked=true;
	                    	      }
                    	      }
                    	}

                    	var staticsproject = $("input:checkbox[name='staticsproject']");
                    	for (i = 0; i < staticsproject.length; i++) {
                  	      var val =staticsproject[i].value;
                  	      if(result.staticsproject != null){
	                    	      if(result.staticsproject.split(',').indexOf(val)!=-1){
	                    	    	  staticsproject[i].checked=true;
	                    	      }
                  	      }else{
                  	    	  if(i < 4){
                  	    		staticsproject[i].checked=true;
                  	    	  }
                  	      }
                    	}
                    	layer.close(index);
                    	if(redonly=='Y'){
                    		$("table input").attr("readonly","readonly");
                    		$("table input[type='radio']:not(:checked)").attr("disabled", true);
                    		$("table input[type='checkbox']").attr("disabled", true);
                    		$("a[lay-filter='formDemo']").hide();
                        }else{
	                        var ishouseholdNot = $("input:radio[name='ishousehold']")[1].checked;
	                    	if(ishouseholdNot==true){
	                    		  $("#hjmffwbsl").addClass("layui-btn-disabled");
	                    		  document.getElementById("hjmffwbsl").disabled="disabled";
	                    		  $("#hjmffwbsl").val("");
	                    	}
	                    	 var isresidentNot = $("input:radio[name='isresident']")[1].checked;
	                     	if(isresidentNot==true){
	                     		  $("#hjfffwbsl").addClass("layui-btn-disabled");
	                     		  document.getElementById("hjfffwbsl").disabled="disabled";
	                    		  $("#hjfffwbsl").val("");
	                     	}
	                    	var ispayNot = $("input:radio[name='ispay']")[1].checked;
	                    	if(ispayNot==true){
	                    		  $("#czmffwbsl").addClass("layui-btn-disabled");
	                    		  document.getElementById("czmffwbsl").disabled="disabled";
	                    		  $("#czmffwbsl").val("");
	                    	}
	                    	var iskedNot = $("input:radio[name='isked']")[1].checked;
	                    	if(iskedNot==true){
	                    		  $("#czfffwbsl").addClass("layui-btn-disabled");
	                    		  document.getElementById("czfffwbsl").disabled="disabled";
	                    		  $("#czfffwbsl").val("");
	                    	}
	                    	var areaCode = $("#areaCode").val();
	                    	if(areaCode){
	                    		document.getElementById("areaCode").disabled="disabled";
	            				$("#areaCode").addClass("layui-btn-disabled");
	                    	}
                        }
                    })
                    var check=$("input[name='staticsproject']:checked");
                    if(check.length >= 4){
                    	$("input[name='staticsproject']:not(:checked)").each(function() {
      	  					$(this).attr("disabled","disabled");
      	  					form.render();
      	  				});
                    }
                    form.render();
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
    reqdata();

    //监听提交 提交data.field即可
    form.on('submit(formDemo)', function(data){
        // todo 提交数据
    	data.field.dhyggwsval = getdhyggwsval();
    	data.field.staticsproject = getStaticsproject();
    	if(data.field.staticsproject == ""){
    		return;
    	}
        $.ajax({
            url : "../../Area/areaAddOrUpdate",
            type : "POST",
            data : data.field,
            dataType : "json",
            success : function(result) {
                // todo 提示 & 重新显示表格数据
                layer.msg('添加/修改成功');
                //设置延迟两秒钟加载
                setTimeout("window.location.href='../area/AreaInFo.html'",1200);
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
  //监听职位复选框事件
    form.on('checkbox(phoneLockDemo)',function(obj){
    	var check=$("input[name='staticsproject']:checked");
    	var notcheck=$("input[name='staticsproject']:not(:checked)");
  	  	if(obj.elem.checked){
  	  		if(check.length==4){
  	  			$("input[name='staticsproject']:not(:checked)").each(function() {
  	  				$(this).attr("disabled","disabled");
  	  				form.render();
  	  			});
  	  		}
  	  	}else{
  	  		if(check.length<=3){
	  			$("input[name='staticsproject']:not(:checked)").each(function() {
	  				$(this).removeAttr("disabled");
	  				form.render();
	  			});
	  		}
  	  	}
    })
    form.on('radio(ishouseholdFilter)', function(data){
    	 // console.log(data.elem); //得到radio原始DOM对象
    	  //console.log(data.value); //被点击的radio的value值
    	  if(data.value == "Y"){
    		  $("#hjmffwbsl").removeClass("layui-btn-disabled");
    		  document.getElementById("hjmffwbsl").removeAttribute("disabled");
    	  }else if(data.value == "N"){
    		  document.getElementById("hjmffwbsl").disabled="disabled";
    		  $("#hjmffwbsl").addClass("layui-btn-disabled");
    		  $("#hjmffwbsl").val("");
    	  }
    	});
    form.on('radio(isresidentFilter)', function(data){
   	 // console.log(data.elem); //得到radio原始DOM对象
   	  //console.log(data.value); //被点击的radio的value值
   	  if(data.value == "Y"){
   		  $("#hjfffwbsl").removeClass("layui-btn-disabled");
		  document.getElementById("hjfffwbsl").removeAttribute("disabled");
   	  }else if(data.value == "N"){
		  document.getElementById("hjfffwbsl").disabled="disabled";
   		  $("#hjfffwbsl").addClass("layui-btn-disabled");
		  $("#hjfffwbsl").val("");

   	  }
   	});
    form.on('radio(ispayFilter)', function(data){
      	 // console.log(data.elem); //得到radio原始DOM对象
      	  //console.log(data.value); //被点击的radio的value值
      	  if(data.value == "Y"){
    		  document.getElementById("czmffwbsl").removeAttribute("disabled");
      		  $("#czmffwbsl").removeClass("layui-btn-disabled");
      	  }else if(data.value == "N"){
    		  document.getElementById("czmffwbsl").disabled="disabled";
      		  $("#czmffwbsl").addClass("layui-btn-disabled");
    		  $("#czmffwbsl").val("");
      	  }
      	});
    form.on('switch(isNeedPositionFilter)', function(data){

    	 var alert_value =this.checked ? '1' : '0';   //1代表开启 0代表关闭
    	 if(alert_value == "1"){
     		  $("#ggwsuploadUrl").removeClass("layui-btn-disabled");
      		  $("#ggwsdownloadUrl").removeClass("layui-btn-disabled");
      		  $("#ggwsuploadUrl").removeAttr("disabled");
      		  $("#ggwsdownloadUrl").removeAttr("disabled");

    		  $("#noNeedJD").removeAttr("disabled");
    		  $("#needJD").removeAttr("disabled");

    		  $("#noNeedIshyper").removeAttr("disabled");
    		  $("#needIshyper").removeAttr("disabled");

    		  $("#noNeedIsdiabetes").removeAttr("disabled");
    		  $("#needIsdiabetes").removeAttr("disabled");

    		  $("#noNeedIswoman").removeAttr("disabled");
    		  $("#needIswoman").removeAttr("disabled");

    		  $("#noNeedIshyper").removeAttr("disabled");
    		  $("#needIshyper").removeAttr("disabled");

    		  $("#noNeedIschild").removeAttr("disabled");
    		  $("#needIschild").removeAttr("disabled");

    		  $("#noNeedIsSold").removeAttr("disabled");
    		  $("#needIsSold").removeAttr("disabled");

    		  $("#noNeedIspulmonary").removeAttr("disabled");
    		  $("#needIspulmonary").removeAttr("disabled");

    		  $("#noNeedIsmind").removeAttr("disabled");
    		  $("#needIsmind").removeAttr("disabled");

    		  form.render();
     	  }else if(alert_value == "0"){

     		  document.getElementById("ggwsuploadUrl").disabled="disabled";
     		  $("#ggwsuploadUrl").addClass("layui-btn-disabled");
     		  $("#ggwsuploadUrl").attr("disabled");

     		  document.getElementById("ggwsdownloadUrl").disabled="disabled";
    		  $("#ggwsdownloadUrl").addClass("layui-btn-disabled");
    		  $("#ggwsdownloadUrl").attr("disabled");


    		  $("#noNeedJD").prop("checked",true);
    		  $("#needJD").prop("checked",false);
     		  document.getElementById("noNeedJD").disabled="disabled";
     		  document.getElementById("needJD").disabled="disabled";

     		  $("#noNeedIshyper").prop("checked",true);
     		  $("#needIshyper").prop("checked",false);
    		  document.getElementById("noNeedIshyper").disabled="disabled";
    		  document.getElementById("needIshyper").disabled="disabled";

    		  $("#noNeedIsdiabetes").prop("checked",true);
    		  $("#needIsdiabetes").prop("checked",false);
     		  document.getElementById("noNeedIsdiabetes").disabled="disabled";
     		  document.getElementById("needIsdiabetes").disabled="disabled";

    		  $("#noNeedIswoman").prop("checked",true);
    		  $("#needIswoman").prop("checked",false);
     		  document.getElementById("noNeedIswoman").disabled="disabled";
     		  document.getElementById("needIswoman").disabled="disabled";

    		  $("#noNeedIschild").prop("checked",true);
    		  $("#needIschild").prop("checked",false);
     		  document.getElementById("noNeedIschild").disabled="disabled";
     		  document.getElementById("needIschild").disabled="disabled";

     		  $("#noNeedIsSold").prop("checked",true);
    		  $("#needIsSold").prop("checked",false);
     		  document.getElementById("noNeedIsSold").disabled="disabled";
     		  document.getElementById("needIsSold").disabled="disabled";

     		  $("#noNeedIspulmonary").prop("checked",true);
    		  $("#needIspulmonary").prop("checked",false);
     		  document.getElementById("noNeedIspulmonary").disabled="disabled";
     		  document.getElementById("needIspulmonary").disabled="disabled";

     		  $("#noNeedIsmind").prop("checked",true);
    		  $("#needIsmind").prop("checked",false);
     		  document.getElementById("noNeedIsmind").disabled="disabled";
     		  document.getElementById("needIsmind").disabled="disabled";

     		  form.render();

     	  }
     	});
});

function getdhyggwsval(){
	var dhyggwsval = "";
	$("input:checkbox[name='dhyggwsval']:checked").each(function() { // 遍历name=standard的多选框
		dhyggwsval +=  $(this).val() + ',';
	});
	return dhyggwsval;
}

/**
 * 获取统计项
 * @returns {String}
 */
function getStaticsproject(){
	var check=$("input[name='staticsproject']:checked");
	if(check.length != 4){
		layer.msg('【统计项】必须选四项');
		return "";
	}
	var staticsproject = "";
	$("input:checkbox[name='staticsproject']:checked").each(function() { // 遍历name=staticsproject的多选框
		staticsproject +=  $(this).val() + ',';
	});
	return staticsproject;
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

/*function isdisabled(val){
	if(isundefined(val)!=''){
		debugger;
		document.getElementById("areaCode").disabled="disabled";
		return 'layui-disabled';
	}else{
		return '';
	}
}*/
function isundefined(val){
  if (typeof val == 'undefined' || val == 'null' || val == null) {
    return '';
  }
  return val;
}


