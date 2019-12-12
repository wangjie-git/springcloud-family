//获取token
token = localStorage.getItem("token");
var _this;
layui.use([ 'dtree', 'form', 'laydate', 'rate', 'table' ], function() {
	var form = layui.form;
	var laydate = layui.laydate;
	var rate = layui.rate;
	var table = layui.table;
	var $ = layui.$;
	var dtree = layui.dtree;
	initOrgTree(dtree);
});

/**
 * 组装机构树
 * 
 * @returns
 */
function initOrgTree(dtree) {
	$.ajax({
		headers : {
			// Bearer是我的项目需要的,你可以按你的需求规范格式
			'Authorization' : 'Bearer ' + token,
		},
		// (async默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为
		// false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
		async : false,
		type : 'GET',
		dataType : "json",
		url : "org/tree",
		data : {},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			// 错误访问所需执行的操作
		},
		success : function(data) {
			// 正确访问所需执行的操作
			initTree(dtree, data.data);
		}
	});
}

function initTree(dtree, data) {
	// 渲染，使用data渲染
	dtree.render({
		elem : "#orgTree",
		data : data,
		initLevel : 1,
		toolbar : true,
		menubar : true,
		dot : false,
		toolbarScroll : "#toolbarDiv",
		record : true,
		checkbarType : "no-all",
		toolbarFun : {
			addTreeNode : function(treeNode, $div) {
				$.ajax({
					type : "post",
					data : treeNode,
					url : "/DTreeHelper/toolbar/insert",
					success : function(result) {
						// DTree1.changeTreeNodeAdd(treeNode.nodeId); //
						// 添加成功，返回ID
						// DTree1.changeTreeNodeAdd(true); // 添加成功
						// DTree1.changeTreeNodeAdd(result.data); //
						// 添加成功，返回一个JSON对象
						// DTree1.changeTreeNodeAdd("refresh"); // 添加成功，局部刷新树
					},
					error : function() {
						// DTree1.changeTreeNodeAdd(false); // 添加失败
					}
				});
			},
			editTreeNode : function(treeNode, $div) {
				$.ajax({
					type : "post",
					data : treeNode,
					url : "/DTreeHelper/toolbar/update",
					success : function(result) {
						// DTree1.changeTreeNodeEdit(true);// 修改成功
						// DTree1.changeTreeNodeEdit(result.param); //
						// 修改成功，返回一个JSON对象
					},
					error : function() {
						// DTree1.changeTreeNodeEdit(false);//修改失败
					}
				});
			},
			delTreeNode : function(treeNode, $div) {
				$.ajax({
					type : "post",
					data : treeNode,
					url : "/DTreeHelper/toolbar/delete",
					success : function(result) {
						// DTree1.changeTreeNodeDel(true); // 删除成功
					},
					error : function() {
						// DTree1.changeTreeNodeDel(false);// 删除失败
					}
				});
			}
		}
	});
}