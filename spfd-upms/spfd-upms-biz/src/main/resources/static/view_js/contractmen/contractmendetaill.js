
layui.use(['layer','form', 'layedit', 'laydate','laytpl','table'], function(){
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
        var personInfoId = GetQueryString('personInfoId');
        if(personInfoId!=null){
            var index = layer.load();
            $.ajax({
                url : "../../contractmen/findDetailByPersonInfoId",
                type : "GET",
                data : {"personInfoId":personInfoId},
                dataType : "json",
                success : function(result) {
                    // 进行处理
                    htmlTpl(result, '#contractmenTpl', '#contractmendetails', function(){
                        layer.close(index);
                        form.render();
                    })

                },
                error:function(msg){
                    layer.msg('未连到服务器')
                    layer.close(index);
                }
            })
        }else{
            var result=[];
            htmlTpl(result, '#contractmenTpl', '#contractmendetails', function(){
                form.render();
            })
        }
    }
    reqdata();

});


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

function isundefined(val){
  if (typeof val == 'undefined' || val == null) {
    return '';
  }
  return val;
}
function serviceTypeChoose(data){
	if(data=="1"){
		data = "测量类"
	}else if(data=="2"){
		data = "标记类"
	}else if(data=="3"){
		data = "公共卫生类"
	}else if(data=="4"){
		data = "指导类"
	}else if(data==null){
		data = ''
	}
    return data;
}
function packCycleUnitChoose(data){
	if(data=="1"){
		data = "年"
	}else if(data=="2"){
		data = "季度"
	}else if(data=="3"){
		data = "月"
	}else if(data=="4"){
		data = "日"
	}else if(data==null){
		data = ''
	}
    return data;
}

function getRowspanNum(data){
	var num = 0;
	if(data != null && data.length > 0){
		$.each(data,function(index,element) {
			  if(element.smallProjectDtos == null){
				  num = num + 1;
			  }else{
				  $.each(element.smallProjectDtos,function(index2,element2) {
					  num = num + 1;
				  });

			  }


		  });
	}

		 return num + "";
}
function getSmallNum(data){
	var num = 0;
	if(data != null && data.length > 0){
		$.each(data,function(index,element) {
			  num = num + 1;
		  });
	}


	 return num + "";

}