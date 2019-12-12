//获取token
token = localStorage.getItem("token");
layui.use([ 'dtree', 'form', 'laydate', 'rate', 'table' ], function() {
	var form = layui.form;
	var laydate = layui.laydate;
	var rate = layui.rate;
	var table = layui.table;
	var $ = layui.$;
	var dtree = layui.dtree;
	initOrgTree(dtree);
	initTable(table);

});

/**
 * 组装机构树
 * @returns
 */
function initOrgTree(dtree){
	$.ajax({
	    headers: {
	        //Bearer是我的项目需要的,你可以按你的需求规范格式
	        'Authorization': 'Bearer ' + token,
	    },
	    //(async默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
	    async: false,
	    type: 'GET',
	    dataType: "json",
	    url:"org/tree",
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
			elem : "#orgTree",
			data : data,
			initLevel : 1,
			menubar : true,
			checkbarType: "no-all", 
			menubarFun : {
				remove : function(checkbarNodes) { //TODO  必须将该方法实现了，节点才会真正的从后台删除哦
					return true;
				}
			}
		});
		// 点击节点触发回调
		dtree.on("node('orgTree')", function(obj) {
			layer.msg(JSON.stringify(obj.param));
		});
}

/**
 * 初始化表格
 * @param table
 * @returns
 */
function initTable(table) {
	// 展示已知数据
	table.render({
		elem : "#label-table-operate",
		url : "user/page",
		headers : {
			'Authorization' : 'Bearer ' + token
		},
		request : {
			pageName : 'current' // 页码的参数名称，默认：page
			,
			limitName : 'size' // 每页数据量的参数名，默认：limit
		}
		,parseData: function(res){ //res 即为原始返回的数据
		    return {
		      "code": res.code,
		      "count": res.data.total, //解析数据长度
		      "data": res.data.records //解析数据列表
		    };
		  },
		id : 'userId',
		cols : [ [ // 标题栏
		{
			type : 'radio'
		}, {
			field : 'username',
			title : '登录账户'
		}, {
			field : 'phone',
			title : '手机号码 '
		}, {
			field : 'delFlag',
			title : '状态'
		}, {
			field : 'createTime',
			title : '创建时间'
		} ] ],
		skin : 'line', // 表格风格
		even : true,
		page : true, // 是否显示分页
		limits : [ 10, 20, 50 ],
		limit : 10
	// 每页默认显示的数量,
	});
}