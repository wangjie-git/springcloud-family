layui.use(['form', 'layedit', 'laydate','laytpl','table'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,laytpl = layui.laytpl
  ,table = layui.table
  ,$ = layui.$;

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
  var id = GetQueryString("teamId");
  $("#teamId").val(id);
  // 页面初始化需要用到 请求数据
  function reqdata(){
          var index = layer.load();
          $.ajax({
              url : "../../Team/findTeamTargetById",
              type : "POST",
              data : {"teamId":id},
              dataType : "json",
              success : function(result) {
                  // 进行处理
                  htmlTpl(result, '#demoTpl', '#tablehtml', function(){
                      layer.close(index);

                      showData(result.FWBRS);
                      showData(result.RQRS);

                      form.render();
                  })
              },
              error:function(msg){
                  layer.msg('未连到服务器')
                  layer.close(index);
              }
          })
  }

    reqdata();

    form.on('submit(formDemo)', function(data){
		var base = [];
		jQuery.each(data.field,function(k,val){
			var demo = new Object();
			demo.baseType = "T";
			demo.baseTargetId = $("#targetId").val();
			if(k.search("FWBRS")==0){
				demo.configureCode = "FWBRS";
				k = k.replace("FWBRS","")
				k = k.substring(0,k.lastIndexOf('id'));
				demo.sonId = k;
				demo.value = data.field[k+"FWBRS"];
				demo.id = val;
			}
			if(k.search("RQRS")==0){
				demo.configureCode = "RQRS";
				k = k.replace("RQRS","")
				k = k.substring(0,k.lastIndexOf('id'));
				demo.sonId = k;
				demo.value = data.field[k+"RQRS"];
				demo.id = val;
			}
			base.push(demo);
		})
		data.field.baseList = base;
		var jsonParam = decodeURIComponent($.param(data.field))
	    .replace(/\[([^ \[\]]*?[^ \[\]\d]+?[^ \[\]]*?)\]/g, ".$1");
        // todo 提交数据
		$.post("../../Team/saveOrUpdateTeamTarget", jsonParam, function (data, status) {
    		if (status == "success") {
        		layer.msg('添加/修改成功');
                setTimeout(function() {
                	  history.go(-1);
                	}, 1000);
   		 	}
		});
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
  if (typeof val == 'undefined' || val==null) {
    return '';
  }
  return val;
}