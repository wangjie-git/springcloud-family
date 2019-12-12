layui.use([ 'form', 'laydate', 'rate', 'table', 'tree' ], function() {
	var form = layui.form;
	var laydate = layui.laydate;
	var rate = layui.rate;
	var table = layui.table;
	var $ = layui.$;
	var tree = layui.tree;

	// 时间选择器
	laydate.render({
		elem : '#beginDate',
		range : true
	});

	// 监听复选框事件
	table.on('checkbox', function(obj) {
		var cache = table.cache['family-table-operate'];
		if (obj.checked) {
			for (data in cache) {
				if (cache[data].LAY_TABLE_INDEX != obj.data.LAY_TABLE_INDEX) {
					cache[data].LAY_CHECKED = false;
				}
			}
			$(
					"input[name='layTableCheckbox']:not(:eq("
							+ (obj.data.LAY_TABLE_INDEX + 1) + "))").removeAttr("checked");
			$(
					"input[name='layTableCheckbox']:not(:eq("
							+ (obj.data.LAY_TABLE_INDEX + 1) + "))").next("div").removeClass("layui-form-checked");
		} else {
			for (data in cache) {
				if (cache[data].LAY_TABLE_INDEX == obj.data.LAY_TABLE_INDEX) {
					cache[data].LAY_CHECKED = false;
				}
			}
			$(
					"input[name='layTableCheckbox']:eq("
							+ (obj.data.LAY_TABLE_INDEX + 1) + ")").removeAttr(
					"checked");
		}
		table.render();
	});
	table.render({
		elem : "#family-table-operate",
		url : "../../order/orderList",
		cols : [ [ // 标题栏
		{
			field : 'name',
			title : '姓名'
		}, {
			field : 'sexName',
			title : '性别'
		}, {
			field : 'age',
			title : '年龄 ',
			width : 185
		}, {
			field : 'feeTotal',
			title : '支付金额'
		}, {
			field : 'createPersonName',
			title : '建档人'
		}, {
			field : 'createDoctorName',
			title : '签约医生'
		}, {
			field : 'payStatue',
			title : '支付状态'
		}, {
			field : 'payDate',
			title : '支付时间'
		}, {
			title : '操作',
			align : 'center',
			fixed : 'right',
			toolbar : '#test-table-family-barDemo'
		} ] ],
		skin : 'line' // 表格风格
		,
		even : true,
		page : true // 是否显示分页
		,
		limits : [ 10, 20, 50 ],
		limit : 10
	// 每页默认显示的数量,
	});

	// 监听工具条
	table.on('tool(family-table-operate)', function(obj) {
		var data = obj.data;
		if (obj.event === 'detail') {
            location.href="../contractmen/contractmendetail.html?personInfoId=" + data.contractInfoId;
		}
	});

	/**
	 * 页面操作动作
	 */
	var $ = layui.$, active = {
		reload : function() {
			// 执行重载
			table.reload('family-table-operate', {
				page : {
					curr : 1
				// 重新从第 1 页开始
				},
				where : {
					name : $("#name").val(),
					sex : $("#sex").val(),
					phoneNumber : $("#phoneNumber").val(),
					cardNo : $("#cardNo").val(),
					familyfrom : $("#familyfrom").val(),
					creatOrgId : $("#creatOrgId").val(),
					createDorName : $("#createDorName").val(),
					beginDate : $("#beginDate").val(),
				}
			});
		},
	};

	// 操作命令赋值
	$('.search-form .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
	function orgName(data) {
		for (var i = 0; i < data.length; i++) {
			data[i].name = data[i].text;
			if (data[i].children != null && data[i].children.length > 0) {
				data[i].children = orgName(data[i].children);
			}
		}
		return data;
	}
	function getOrg() {
		$
				.ajax({
					url : "../../orgnization/personMenuFindOrgs",
					type : "post",
					dataType : "json",
					success : function(data) {
						data = orgName(data);
						tree({
							elem : '#demo' // 传入元素选择器
							,
							nodes : data,
							click : function(item) { // 点击节点回调
								$('#tree_select').toggleClass(
										'layui-form-selected');
								$('#open_select').children("input").first()
										.val(item.name);
								$('#open_select').children("input").last().val(
										item.id);
								loadTeams(item.id);
							},
							skin : "shihuang"
						});

						$('#open_select').click(
								function() {
									$('#tree_select').toggleClass(
											'layui-form-selected');
								});

						$('dl .layui-tree-spread').click(function(e) {
							layui.stope(e)
						});
					},
					error : function(error) {
						layer.msg('未连到服务器')
					}
				})
	}
	getOrg();

});
