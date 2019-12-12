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
        var id = GetQueryString('id');
        if(id!=null){
            var index = layer.load();
            $.ajax({
                url : "../../label/labelDetailInfo",
                type : "GET",
                data : {"labelid":id},
                dataType : "json",
                success : function(result) {
                    // 进行处理
                    htmlTpl(result, '#demoTpl', '#tablehtml', function(){
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
            htmlTpl(result, '#demoTpl', '#tablehtml', function(){
                form.render();
            })
        }
    }
    reqdata();

    //监听提交 提交data.field即可
    form.on('submit(formDemo)', function(data){
        // todo 提交数据
        $.ajax({
            url : "../../label/labelAddOrUpdate",
            type : "POST",
            data : data.field,
            dataType : "json",
            success : function(result) {
                // todo 提示 & 重新显示表格数据
                layer.msg('添加/修改成功');
                //设置延迟1.2秒钟加载
                setTimeout("window.location.href='../label/index.html'",1200);
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
function isdisabled(val){
    return isundefined(val)!=''?'layui-disabled':'';
}

function isreadonly(val){
	return isundefined(val)!=''?'readonly=readonly':'';
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