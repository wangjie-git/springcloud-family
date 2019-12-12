//获取token
token = localStorage.getItem("token");
layui.use([ 'dtree', 'form', 'laydate', 'rate', 'table' ], function() {
	var form = layui.form;
	var laydate = layui.laydate;
	var rate = layui.rate;
	var table = layui.table;
	var $ = layui.$;
	var dtree = layui.dtree;
	initTable(table);
});

/**
 * 初始化表格
 * @param table
 * @returns
 */
function initTable(table) {
	// 展示已知数据
	table.render({
		elem : "#label-table-operate",
		url : "role/page",
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
		id : 'roleId',
		cols : [ [ // 标题栏
		{
			type : 'radio'
		}, {
			field : 'roleCode',
			title : '角色编码'
		}, {
			field : 'roleName',
			title : '角色名称 '
		}, {
			field : 'roleDesc',
			title : '备注'
		}, {
			field : 'delFlag',
			title : '是否可用'
		} ] ],
		skin : 'line', // 表格风格
		even : true,
		page : true, // 是否显示分页
		limits : [ 10, 20, 50 ],
		limit : 10
	// 每页默认显示的数量,
	});
}