var editor1='';
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
                url : "../../protocol/protocolDetailInfo",
                type : "GET",
                data : {"id":id},
                dataType : "json",
                success : function(result) {
                    // 进行处理
                    htmlTpl(result, '#addProtocol', '#protocalTable', function(){
                        layer.close(index);
                        $('#content').html(result.protocoltext);
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
            htmlTpl(result, '#addProtocol', '#protocalTable', function(){
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
function create_editor(){
    KindEditor.ready(function(K){
      //  editor1 = K.create('#content',{width:"100%",height:"300px"});
    	  editor = K.create('textarea[name="protocoltext"]', {
    	        cssPath : '../kindeditor/plugins/code/prettify.css',
    	        uploadJson : '../Kindeditor/KEupload',
    	        fileManagerJson : '../kindeditor/php/file_manager_json.php',
    	        allowFileManager : true,
    	        afterCreate : function() {
    	         this.sync();
    	        },
    	        afterBlur:function(){
    	            this.sync();
    	        },
    	        width:"100%",
    	        height:"300px"
    	    });
    });
}
 //create_editor();
