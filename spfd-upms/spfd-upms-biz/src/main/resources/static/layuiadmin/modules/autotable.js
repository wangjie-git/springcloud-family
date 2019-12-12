//layui模块的定义
layui.define(['laytpl','form'], function(exports){
  
    var form = layui.form
    ,layer = layui.layer
    ,$ = layui.$;



	function htmlTpl(data, getid, toid, fun) {

	    var laytpl = layui.laytpl;
	    var getTpl = $(getid).html();
	    laytpl(getTpl).render(data, function(html){
	      $(toid).html(html);
	      if (typeof fun == 'function') {
	        fun();
	      }
	    });

	}
	function ischecked(data,val){
	  return data==val?'checked':'';
	}
	function ischeckbox(data,val){
	  if (data) {
		  var arr=data.split(',');
		  for (var i = 0; i < arr.length; i++) {
		    if(arr[i]==val){
		      return 'checked';
		    }
		  }
	  }  
	  return '';
	}
	function isundefined(val){
	  	if (val) return val;
	  
	  
	    return '';
	}
	function formrender(){
	    form.render(); //更新全部
	}
	// 单选
	function editradio(toid){

	    var url=$(toid).attr("url"); //"./aab.php?code="+code

	    $.ajax({
	      url : url,
	      type : "POST",
	      data : {},
	      dataType : "json",
	      success : function(result) {
	        // 进行处理
	        var data={
	          list:result,
	          value:"conceptCode", //选项的值
	          title:"conceptDesc", //选项说明
	          name:$(toid).attr('name'), //提交的字段名
	          val:$(toid).attr("val") //选中显示的值
	        }
	        htmlTpl(data,'#radioTpl',toid,function(){
	          formrender()
	        })
	      },
	      error:function(msg){
	        layer.msg(code+'未连到服务器')
	      }
	    }) 

	}
	// 多选
	function editcheckbox(toid){

	    var url=$(toid).attr("url"); //"./aab.php?code="+code

	    function oncheckbox(f){
	      function setv(f){

	          var s=''; //[type='checkbox']
	          $("input[name='"+f+"1']").each(function(i){
	              if($(this).is(':checked') == true){
	                var v=$(this).attr('value')
	                if (s=='') {
	                  s=v
	                }else{
	                  s=s+','+v
	                }              
	                $('#'+f).val(s)
	              }
	          });
	      }

	      //监听指定开关
	      form.on('checkbox('+f+')', function(data){
	        setv(f);
	      });

	    }
	    $.ajax({
	      url : url,
	      type : "POST",
	      data : {},
	      dataType : "json",
	      success : function(result) {
	        // 进行处理
	        var data={
	          list:result, //所有选项
	          value:"conceptCode", //选项的值
	          title:"conceptDesc", //选项说明
	          name:$(toid).attr('name'), //提交的字段名
	          val:$(toid).attr("val") //选中显示的值
	        }
	        htmlTpl(data,'#checkboxTpl',toid,function(){
	          formrender()
	          // console.log(toid,toid.substr(1))
	          oncheckbox(data.name)
	        })
	      },
	      error:function(msg){
	        layer.msg(code+'未连到服务器')
	      }
	    }) 

	}
	function editradiobytoid(toid){

	  var etype=$(toid).attr('etype')
	  if (etype=='radio') {
	    editradio(toid);
	  }else{
	    editcheckbox(toid);
	  }
	}



/*
  单选 a==b选中

 */
function showradio(txt,a,b){
  var str='';
  if (a==b) {
    str = '<div class="layui-unselect layui-form-radio layui-form-radioed"><i class="layui-anim layui-icon layui-anim-scaleSpring"></i><div>'+txt+'</div></div>';
  }else{
    str = '<div class="layui-unselect layui-form-radio"><i class="layui-anim layui-icon"></i><div>'+txt+'</div></div>';
  }
  return str;
}
/*
  多选样式，a==b则选中

 */
function showcheckbox(txt,a,b){
  var str='';
  if (a==b) {
    str = '<div class="layui-unselect layui-form-checkbox layui-form-checked" lay-skin="primary"><span>'+txt+'</span><i class="layui-icon"></i></div>';
  }else{
    str = '<div class="layui-unselect layui-form-checkbox" lay-skin="primary"><span>'+txt+'</span><i class="layui-icon"></i></div>';
  }
  return str;
}

  // 单选
  function showradioto(toid){

      var url=$(toid).attr("url"); //"./aab.php?code="+code

      $.ajax({
        url : url,
        type : "POST",
        data : {},
        dataType : "json",
        success : function(result) {
          // 进行处理
          var data={
            list:result,
            value:"conceptCode", //选项的值
            title:"conceptDesc", //选项说明
            val:$(toid).attr("val") //选中显示的值
          }
          var o = $(toid).attr("only");
          var str = '';
          for (var i = 0; i < result.length; i++) {
            if (o==1) {
              if (result[i].conceptCode==data.val) {

                str += showradio(result[i].conceptDesc,result[i].conceptCode,data.val)
              }
            }else{

              str += showradio(result[i].conceptDesc,result[i].conceptCode,data.val)
            }
          }
          $(toid).html(str);
        },
        error:function(msg){
          layer.msg(code+'未连到服务器')
        }
      }) 
  }
  // 多选
  function showcheckboxto(toid){

      var url=$(toid).attr("url"); //"./aab.php?code="+code


      $.ajax({
        url : url,
        type : "POST",
        data : {},
        dataType : "json",
        success : function(result) {
          // 进行处理
          var data={
            list:result, //所有选项
            value:"conceptCode", //选项的值
            title:"conceptDesc", //选项说明
            val:$(toid).attr("val") //选中显示的值
          }
          var o = $(toid).attr("only");
          var str = '';
          for (var i = 0; i < result.length; i++) {
            if (o==1) {
              if (ischeckbox(data.val,result[i].conceptCode)) {

                str += showcheckbox(result[i].conceptDesc,1,1)
              }
            }else{

              if (ischeckbox(data.val,result[i].conceptCode)) {

                str += showcheckbox(result[i].conceptDesc,1,1)
              }else{

                str += showcheckbox(result[i].conceptDesc,1,2)
              }
            }
          }
          $(toid).html(str);
        },
        error:function(msg){
          layer.msg(code+'未连到服务器')
        }
      }) 

  }
  function showradiobytoid(toid){

    var etype=$(toid).attr('etype')
    if (etype=='radio') {
      showradioto(toid);
    }else if (etype=='checkbox'){
      showcheckboxto(toid);
    }else{

    }
  }

  function autoshowtable(){

    console.log('autoshowtable')
    $('.showtable').each(function(){
      var id = $(this).attr('id')
      var etype = $(this).attr('etype')
      if (id && etype) {
        showradiobytoid('#'+id)
        console.log(id,etype)
      }
    })
  }
  function autoedittable(){
    console.log('autoedittable')

    $('.edittable').each(function(){
      var id = $(this).attr('id')
      var etype = $(this).attr('etype')
      if (id && etype) {
        editradiobytoid('#'+id)
        console.log(id,etype)
      }
    })
  } 
	window.autoshowtable=autoshowtable; 
	window.autoedittable=autoedittable; 

/*
	如果修改配合下面使用

<script id="radioTpl" type="text/html">
{{#  layui.each(d.list, function(index, item){ }}
  <input type="radio" name="{{d.name}}" value="{{item[d.value]}}" title="{{item[d.title]}}" {{d.val==item[d.value]? 'checked':''}}>
{{#  }); }}  
</script>
<script id="checkboxTpl" type="text/html">
{{#  layui.each(d.list, function(index, item){ }}
  <input type="checkbox" name="{{d.name}}1" lay-filter="{{d.name}}" value="{{item[d.value]}}" title="{{item[d.title]}}" lay-skin="primary" {{d.val==item[d.value]? 'checked':''}} {{ischeckbox(d.val,item[d.value])}}> 
{{#  }); }} 
  <input type="hidden" name="{{d.name}}" id="{{d.name}}" value="{{d.val}}"> 
</script>
 */



 function autotable(){
 	autoshowtable();
 	autoedittable();
      $(".date").each(function(){
          laydate.render({
            type: 'date',
            elem: this
          });          
      })
      $(".datetime").each(function(){
          laydate.render({
            type: 'datetime',
            elem: this
          });          
      }) 	
 }



  //……
  var obj = {
  	autotable:autotable,
  	autoshowtable:autoshowtable,
  	autoedittable:autoedittable,
  	editradiobytoid:editradiobytoid,
  	showradiobytoid:showradiobytoid
  }
  exports('autotable', obj);
});  