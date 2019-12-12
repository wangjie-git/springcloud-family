layui.use(['form', 'layedit', 'laydate','laytpl'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,$ = layui.$
  ,laytpl = layui.laytpl
  ,laydate = layui.laydate;

  form.verify({
	  username: function(value, item){ //value：表单的值、item：表单的DOM对象
	    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
	      return '不能有特殊字符';
	    }
	    if(/(^\_)|(\__)|(\_+$)/.test(value)){
	      return '首尾不能出现下划线\'_\'';
	    }
	    if(/^\d+\d+\d$/.test(value)){
	      return '不能全为数字';
	    }
	  }
  	  ,numberOrEng: function(value, item){ //数字英文验证
	    if(!new RegExp("^[a-zA-Z0-9]+$").test(value)){
	      return '不能有特殊字符';
	    }
	  }
  	  ,numberOrEngORChn: function(value, item){ //数字英文中文验证
	    if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
	      return '不能有特殊字符';
	    }
	  }
  	  ,validateLoc: function(value, item){ //
	    if(!new RegExp("^[\x01-\x7f]*$").test(value)){
	      return '不能有中文';
	    }
	  }
  	  ,length:function(value, item){
  		  //获取需要验证的dom元素的长度属性——自行设置
  		  var len = $(item).attr("length");
  		  if(value.length>Number(len)){
  		      return '长度超出限制！最大长度为'+len;
  		  }
  	  }
  	  ,radio:function(value,item){
  		  var name = $(item).attr("name");
  		  var flag = true;
  		  $("input:radio[name='"+name+"']").each(function(i){
  			  if($(this).is(":checked")) flag=false;
  		  })
  		  var text = $(item).attr("text");
  		  if(flag){
  		      return text+'为必选项！请选择';
  		  }
  	  }
  	  ,checkbox:function(value,item){
  		  var name = $(item).attr("name");
  		  var flag = true;
  		  $("input:checkbox[name='"+name+"']").each(function(i){
  			  if($(this).is(":checked")) flag=false;
  		  })
  		  var text = $(item).attr("text");
  		  if(flag){
  		      return text+'为必选项！请选择';
  		  }
  	  }
  	  ,editor:function(value,item){
  		  if(value==null||value==""||typeof value==='undefined'){
  			  editor.focus();
  			  return "协议内容不能为空！"
  		  }
  	  }
  	  ,areacode:function(value,item){
          if($("#id").val()==""){
              var flag = false;
	  		  $.ajax({
		          url : "../../Area/areaInFo",
		          type : "POST",
		          async: false,
		          dataType : "json",
		          success : function(result) {
		        	  if(result.data!=null&&result.data.length>0){
			        	  for(var i = 0;i<result.data.length;i++){
			        		  var area = result.data[i];
			        		  if(area.areaCode==value){
			        			  flag = true;
			        		  }
			        	  }
		        	  }
		          },
		          error:function(msg){
		              layer.msg('未连到服务器')
		          }
	  		  })
	    	  if(flag){
	    		  return "已有相同的机构编码！请重新填写";
	    	  }
  		  }
  	  }
  	  ,labelcode:function(value,item){
          if($("#labelId").val()==""){
	          var flag = false;
	  		  $.ajax({
		          url : "../../label/labelList",
		          type : "POST",
		          async: false,
		          dataType : "json",
		          success : function(result) {
		        	  if(result.data!=null&&result.data.length>0){
			        	  for(var i = 0;i<result.data.length;i++){
			        		  var label = result.data[i];
			        		  if(label.labelCode==value){
			        			  flag = true;
			        		  }
			        	  }
		        	  }
		          },
		          error:function(msg){
		              layer.msg('未连到服务器')
		          }
	  		  })
	    	  if(flag){
	    		  return "已有相同的标签编码！请重新填写";
	    	  }
  		  }
  	  }
  	  ,verifyNum:function(value,item){ //value：表单的值、item：表单的DOM对象
  		  if(value<0){
    		  return "不能填入负数值!";
  		  }
  	  },
  	  verifyNumSize:function(value,item){ //value：表单的值、item：表单的DOM对象
  		//获取需要验证的dom元素的长度属性——自行设置
  		  var len = $(item).attr("moreLength");
  		  var content = $(item).attr("content");
  		  if((value*100) >= (len*100)){
  		      return content+'超出限制！最大值必须小于：'+len;
  		  }
	  },
  	  limitAgeNum:function(value,item){ //value：表单的值、item：表单的DOM对象
  		var packAgeMin = parseInt($("#packAgeMin").val());
		var packAgeMax = parseInt($("#packAgeMax").val());
  		if(packAgeMax <= packAgeMin ){
  		  return "年龄限制的最大值不能小于等于最小值!";
		  }
	  },
	  limitPriceNum:function(value,item){ //value：表单的值、item：表单的DOM对象
		  var servicePrice = parseFloat($("#servicePrice").val());
		  var discountPrice = parseFloat($("#discountPrice").val());
	  		if(servicePrice < discountPrice){
	    		  return "优惠价格不能大于服务价格!";
	  		  }
		  },

	  pass: [
	    /^[\S]{6,12}$/
	    ,'密码必须6到12位，且不能出现空格'
	  ]
	});

})
