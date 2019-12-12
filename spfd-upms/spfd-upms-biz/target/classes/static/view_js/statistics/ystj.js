layui.use([ 'form', 'laydate', 'rate', 'table','tree' ], function() {
	var tree = layui.tree;
    var $ = layui.$;
    function orgName(data){
    	for(var i =0;i<data.length;i++){
    		data[i].name = data[i].text;
    		if(data[i].children!=null&&data[i].children.length>0){
    			data[i].children = orgName(data[i].children);
    		}
    	}
    	return data;
    }
	function getOrg(){
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
			            $('#open_select').children("input").last().val(item.id);
			            loadTeams(item.id);
			        }
					,skin:"shihuang"
			    });

			    $('#open_select').click(function(){
			        $('#tree_select').toggleClass('layui-form-selected');
			    });

			    $('dl .layui-tree-spread').click(function(e){
			        layui.stope(e)
			    });
			    if(data != null && data != ""){
			    	$('#open_select').children("input").first().val(data[0].name);
		            $('#open_select').children("input").last().val(data[0].id);
		            loadTeams(data[0].id);
			    }
			},
			error: function(error){
                layer.msg('未连到服务器')
			}
		})
	}
	getOrg();
	var form = layui.form;
	var laydate = layui.laydate;
	var rate = layui.rate;
	var table = layui.table;
	// 时间选择器
	laydate.render({
		elem : '#staticticYear',
		type : 'year',
		max : 0,
		done : function(value, date, endDate) {
			$("#staticticMonth").val("");
			$("#staticticDay").val("");
		}
	});
	laydate.render({
		elem : '#staticticMonth',
		type : 'month',
		max : 0,
		done : function(value, date, endDate) {
			$("#staticticYear").val("");
			$("#staticticDay").val("");
		}
	});
	laydate.render({
		elem : '#staticticDay',
		max : 0,
		done : function(value, date, endDate) {
			$("#staticticYear").val("");
			$("#staticticMonth").val("");
		}
	});

	// 数据表格
	// 展示已知数据
	table.render({
		elem : "#label-table-operate",
		url : "../../statistics/queryEmpStatistics",
		cols : [ [ // 标题栏
		 {
			field : 'doctorName',
			title : '医生名字'
		}, {
			field : 'teamName',
			title : '所属团队'
		}, {
			field : 'orgName',
			title : '所属机构'
		}, {
			field : 'contractnumber',
			title : '实际签约人数'
		}, {
			field : 'realTrate',
			title : '签约率(%)'
		}, {
			field : 'appointmentnumber',
			title : '履约人数'
		}, {
			field : 'appointmentcount',
			title : '履约人次'
		}, {
			field : 'realApponint',
			title : '履约率(%)'
		} ] ],
		skin : 'line' // 表格风格
		,
		even : true,
		page : true // 是否显示分页
		,
		where : {
			orgId : $("#orgId").val(),
			teamId : $("#teamId").val()
		},
		limits : [ 5, 10, 20 ],
		limit : 5,
		done : function(res, curr, count) {
			loadChart(res.data);
			loadChart2(res.data);
		}
	// 每页默认显示的数量
	});

	/**
	 * 页面操作动作
	 */
	var $ = layui.$, active = {
		reload : function() {
			// 执行重载
			table.reload('label-table-operate', {
				page : {
					curr : 1
				// 重新从第 1 页开始
				},
				where : {
					staticticYear : $("#staticticYear").val(),
					staticticMonth : $("#staticticMonth").val(),
					staticticDay : $("#staticticDay").val(),
					orgId : $("#orgId").val(),
					teamId : $("#teamId").val()

				},
				done : function(res, curr, count) {
					loadChart(res.data);
					loadChart2(res.data);
				}
			});
		},
	};

	// 操作命令赋值
	$('.search-form .layui-btn').on('click', function() {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
});

function loadTeams(orgId) {
    // 加载基本字典
	$.ajaxSettings.async = false;
    $.post("../../Team/queryTeamsByOrgId", {"orgId":orgId}, function(data, status) {
        if (status == "success") {
            //var option = "<option value=''></option>";
        	var option = "";
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    option += "<option value=" + data[i].id + ">"
                            + data[i].teamname + "</option>";
                }
                $("#teamId").val(data[0].id);
            }
            $("#teamId").html(option);
            layui.use('form', function() {
                var form = layui.form;
                form.render();
            });
        }
    });
    $.ajaxSettings.async = true;
}

function loadChart(data) {
	var seriesList = [];
	var names = [];
	var realdata1 = [];
	var realdata2 = [];
	if(data==null){
		return;
	}
	for (var i = 0; i < data.length; i++) {
		names.push(data[i].doctorName);
		realdata1.push(data[i].contractnumber);
		realdata2.push(data[i].appointmentnumber);
	}
	var item1 = {
		name : "签约人数",
		data : realdata1
	};
	var item2 = {
		name : "履约人数",
		data : realdata2
	};
	seriesList.push(item1);
	seriesList.push(item2);
	var chart = Highcharts
			.chart(
					'container',
					{
						chart : {
							type : 'column'
						},
						title : {
							text : '签约人数统计'
						},
						xAxis : {
							categories : names,
							crosshair : true
						},
						yAxis : {
							min : 0,
							title : {
								text : '数量'
							}
						},
						credits : {
							enabled : false,
							text : '江苏康尚'
						},
						colors : [ '#70efb0', '#cc3333', '#33cc33', '#70efb0',
								'#00ffff', '0080ff', '#3333cc', '#7f00ff',
								'#ff8f8f' ],
						tooltip : {
							// head + 每个 point + footer 拼接成完整的 table
							headerFormat : '<span style="font-size:10px">{point.key}</span><table>',
							pointFormat : '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
									+ '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
							footerFormat : '</table>',
							shared : true,
							useHTML : true
						},
						plotOptions : {
							series : {
								borderWidth : 0,
								dataLabels : {
									enabled : true
								}
							}
						},
						series : seriesList
					});
}

function loadChart2(data) {
	var seriesList = [];
	var names = [];
	var realdata1 = [];
	var realdata2 = [];
	if(data==null){
		return;
	}
	for (var i = 0; i < data.length; i++) {
		names.push(data[i].doctorName);
		realdata1.push(data[i].realTrate);
		realdata2.push(data[i].realApponint)
	}
	var item1 = {
		name : "签约率",
		data : realdata1
	};
	var item2 = {
		name : "履约率",
		data : realdata2
	};
	seriesList.push(item1);
	seriesList.push(item2);
	var chart = Highcharts
			.chart(
					'container2',
					{
						chart : {
							type : 'column'
						},
						title : {
							text : '签约率/履约率统计'
						},
						xAxis : {
							categories : names,
							crosshair : true
						},
						yAxis : {
							min : 0,
							title : {
								text : '(%)'
							}
						},
						credits : {
							enabled : false,
							text : '江苏康尚'
						},
						colors : [ '#33cc33', '#ff7f00', '#00ffff', '0080ff',
								'#3333cc', '#7f00ff', '#ff8f8f' ],
						tooltip : {
							// head + 每个 point + footer 拼接成完整的 table
							headerFormat : '<span style="font-size:10px">{point.key}</span><table>',
							pointFormat : '<tr><td style="color:{series.color};padding:0">{series.name}: </td>'
									+ '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
							footerFormat : '</table>',
							shared : true,
							useHTML : true
						},
						plotOptions : {
							series : {
								borderWidth : 0,
								dataLabels : {
									enabled : true
								}
							}
						},
						series : seriesList
					});
}
