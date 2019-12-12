//获取token
token = localStorage.getItem("token");
layui.use([ 'dtree', 'form', 'laydate', 'rate', 'table' ], function() {
	var form = layui.form;
	var laydate = layui.laydate;
	var rate = layui.rate;
	var table = layui.table;
	var $ = layui.$;
	var dtree = layui.dtree;
	initMenu(dtree);
});

function initMenu(dtree){
	$.ajax({
	    headers: {
	        //Bearer是我的项目需要的,你可以按你的需求规范格式
	        'Authorization': 'Bearer ' + token,
	    },
	    //(async默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
	    async: false,
	    type: 'GET',
	    dataType: "json",
	    url:"menu/tree",
	    data: {},
	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	    //错误访问所需执行的操作
	    },
	    success: function(data) {
	    //正确访问所需执行的操作
	    	initTree(dtree,data.data);
	    }
	});
}

function initTree(dtree,data){
		// 渲染，使用data渲染
		dtree.render({
			elem : "#commonTree1",
			data : data,
			initLevel : 1,
			menubar : true,
			checkbar : true,
			checkbarType: "no-all", 
			menubarFun : {
				remove : function(checkbarNodes) { //TODO  必须将该方法实现了，节点才会真正的从后台删除哦
					return true;
				}
			}
		});
		// 点击节点触发回调
		dtree.on("node('commonTree1')", function(obj) {
			layer.msg(JSON.stringify(obj.param));
		});
}
