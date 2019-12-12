var editor='';
layui.use(['form', 'layedit', 'laydate','laytpl','table','tree'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,laytpl = layui.laytpl
  ,table = layui.table
  ,$ = layui.$;
  var tree = layui.tree;

  function orgName(data){
  	for(var i =0;i<data.length;i++){
  		data[i].name = data[i].text;
  		if(data[i].children!=null&&data[i].children.length>0){
  			data[i].children = orgName(data[i].children);
  		}
  	}
  	return data;
  }
  function orgList(){
		$.ajax({
			url:"../../orgnization/findOrgList",
			type:"post",
			dataType:"json",
			async:false,
			success: function(data){
				data = orgName(data);
				tree({
			        elem: '#demo' //传入元素选择器
			        ,nodes: data
			        ,click: function(item){ //点击节点回调
			            $('#tree_select').toggleClass('layui-form-selected');
			            $('#open_select').children("input").first().val(item.name);
			            $('#open_select').children("input").eq(1).val(item.id);
			            $('#open_select').children("input").last().val(item.orgRsId);
			        }
			    });

			    $('#open_select').click(function(){
			        $('#tree_select').toggleClass('layui-form-selected');
			    });

			    $('dl .layui-tree-spread').click(function(e){
			        layui.stope(e)
			    });
				form.render();
			},
			error: function(error){

              layer.msg('未连到服务器')
			}
		})
  }
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
                	console.log(result.protocoltext);
                    // 进行处理
                    htmlTpl(result, '#addProtocol', '#protocalTable', function(){
                        layer.close(index);
                        create_editor();
                        editor.html(result.protocoltext);
                        $("#content").val(result.protocoltext);
        				$("#protocoltitle").addClass("layui-btn-disabled");
        				document.getElementById("protocoltype").disabled="disabled";

                        //$('#content').html(result.protocoltext);
                        form.render();
                    })
                    /*if(isundefined(id) == ''){
                    	orgList();
                    }*/
                },
                error:function(msg){
                    layer.msg('未连到服务器')
                    layer.close(index);
                }
            })
        }else{
            var result=[];
            htmlTpl(result, '#addProtocol', '#protocalTable', function(){
            	create_editor();
                form.render();
            })
            orgList();
        }
    }
    reqdata();
    //监听提交 提交data.field即可
    form.on('submit(formDemo)', function(data){
         // todo 提交数据
        var id = GetQueryString('id');
        data.field.id=id;
        var textContent = $('#content').val();
        data.field.protocoltext=textContent;
        $.ajax({
            url : "../../protocol/protocolAddOrUpdate",
            type : "POST",
            data : data.field,
            dataType : "json",
            success : function(result) {
                // todo 提示 & 重新显示表格数据
            	if(result.msgCode=="00000"){
            		layer.msg('当前区域已经存在该类型的协议,不能再新增!');
            	}else{
            		layer.msg('添加/修改成功')
                    //设置延迟1.2秒钟加载
                    setTimeout("window.location.href='../protocol/index.html'",1200);
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
function isreadonly(val){
	return isundefined(val)!=''?'readonly=readonly':'';
}

function create_editor(){
    KindEditor.ready(function(K){
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
 create_editor();
