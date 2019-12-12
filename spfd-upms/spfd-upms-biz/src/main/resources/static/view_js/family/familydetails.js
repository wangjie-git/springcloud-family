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
        var familyId = GetQueryString('familyId');
        if(familyId!=null){
            var index = layer.load();
            $.ajax({
                url : "../../family/familyDetailInfo",
                type : "GET",
                data : {"familyId":familyId},
                dataType : "json",
                success : function(result) {
                    // 进行处理
                    htmlTpl(result, '#addFamily', '#familyTable', function(){
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
            htmlTpl(result, '#addFamily', '#familyTable', function(){
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

function isundefined(val){
	  if ((typeof val == 'undefined') || (val == null)) {
	    return '';
	  }
	  return val;
}
