
layui.use(['form', 'layedit', 'laydate','laytpl','table'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,laytpl = layui.laytpl
  ,table = layui.table
  ,$ = layui.$;
  var result=[];

    // 获取url指定参数值
    function GetQueryString(name) {
        var reg = new RegExp(("(^|&)"+name+"=([^&]*)(&|$)"));
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);return null;
    }

    // 页面初始化需要用到 请求数据
    function reqdata(){
        var packId = GetQueryString('packId');
        if(packId!=null){
            var index = layer.load();
            $.ajax({
                url : "../../packmanage/packDetailInfo",
                type : "GET",
                data : {"packId":packId},
                dataType : "json",
                success : function(result) {
                    // 进行处理
                    htmlTpl(result, '#demoTpl', '#packManageTable', function(){
                        layer.close(index);
                        if(result){
                        	var packTypeValue = result.packType;
                       	 if(packTypeValue=="2"){
                           	 $("#viewPriceTr").show();
                       	 }else{
                       		 $("#viewPriceTr").hide();
                       	 }
                    	}

                        form.render();
                    })
                },
                error:function(msg){
                    layer.msg('未连到服务器')
                    layer.close(index);
                }
            })
        }else{
            htmlTpl(result, '#demoTpl', '#packManageTable', function(){
                form.render();
            })
        }
    }
    reqdata();

    var $ = layui.$, active = {
        add: function(){
            $(this).parents("tr").before($('#demoTpl2').html());
            form.render();
        },
        add2: function(){
            $(this).parents("tr").nextAll(".tr1").eq(0).before($('#demoTpl3').html());
            form.render();
        },
        delete2: function(){
          $(this).parents("tr").remove();
        },
        load:function () {
            layer.tips('在上面<br>123',this,{
                tips:  [1, '#aaa'],time:5000,shadeClose:true,shade: [0.01, '#ffffff']
            });
        }
    };

    // $('.layui-btn').on('click', function(){
    //     alert(1);
    //     var type = $(this).data('type');
    //     active[type] ? active[type].call(this) : '';
    // });

    $("body").delegate(".layui-btn","click",function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    $('.search-info-btn').on('click', function(){
          var type ="load";
          active[type] ? active[type].call(this) : '';
      });


    form.on('select(select1)', function(data){
        if(data.value==1){
            $(this).parents('tr').find('.add-item-btn').show();
        }else{
            $(this).parents('tr').find('.add-item-btn').hide();
        }
    });
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
  }if (val == null) {
    return '';
  }
  return val;
}
function isSelected(data,val){
    return data==val?'selected=""':'';
}
function isFlag(data){
	if(data=="BQ001"){
		data = "高血压"
	}else if(data=="BQ002"){
		data = "糖尿病"
	}else if(data=="BQ003"){
		data = "精神病"
	}
    return data;
}
function packTypeChoose(data){
	if(data=="1"){
		data = "免费"
	}else if(data=="2"){
		data = "收费"
	}else if(data=="9"){
		data = "其它"
	}else if(data==null){
		data = ''
	}
    return data;
}
function packSexLimitChoose(data){
	if(data=="0"){
		data = "不限制"
	}else if(data=="1"){
		data = "男"
	}else if(data=="2"){
		data = "女"
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
function packStatusChoose(data){
	if(data=="Y"){
		data = "启用"
	}else if(data=="N"){
		data = "禁用"
	}else if(data==null){
		data = ''
	}
    return data;
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
	}else if(data=="9"){
		data = "组合类"
	}
	else if(data==null){
		data = ''
	}
    return data;
}
function serviceContentChoose(data){
	if(data=="11"){
		data = "血压"
	}else if(data=="12"){
		data = "血糖"
	}else if(data=="13"){
		data = "尿常规"
	}else if(data=="14"){
		data = "心电"
	}else if(data=="15"){
		data = "血氧"
	}else if(data=="16"){
		data = "体温"
	}else if(data=="17"){
		data = "血红蛋白"
	}else if(data=="18"){
		data = "糖化血红蛋白"
	}else if(data=="19"){
		data = "血脂"
	}else if(data=="20"){
		data = "白细胞"
	}else if(data=="21"){
		data = "身高"
	}else if(data=="22"){
		data = "体重"
	}else if(data=="30"){
		data = "健康档案"
	}else if(data=="31"){
		data = "健康体检"
	}else if(data=="32"){
		data = "预防接种"
	}else if(data=="33"){
		data = "儿童"
	}else if(data=="34"){
		data = "孕产妇"
	}else if(data=="35"){
		data = "老年人"
	}else if(data=="36"){
		data = "高血压"
	}else if(data=="37"){
		data = "糖尿病"
	}else if(data=="38"){
		data = "严重精神障碍"
	}else if(data=="39"){
		data = "肺结核"
	}else if(data==null){
		data = ''
	}
    return data;
}
function projectStatusChoose(data){
	if(data=="Y"){
		data = "是"
	}else if(data=="N"){
		data = "否"
	}else if(data==null){
		data = ''
	}
    return data;
}


