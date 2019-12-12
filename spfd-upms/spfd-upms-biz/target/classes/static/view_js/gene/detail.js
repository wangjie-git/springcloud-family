layui.use([ 'form', 'layedit', 'laydate', 'laytpl', 'table' ],function() {
	var form = layui.form,
	layer = layui.layer,
	layedit = layui.layedit,
	laydate = layui.laydate,
	laytpl = layui.laytpl,
	table = layui.table,
	$ = layui.$;
	// 获取url指定参数值
	function GetQueryString(name) {
		var reg = new RegExp(("(^|&)" + name + "=([^&]*)(&|$)"));
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	}

	// 页面初始化需要用到 请求数据
	function reqdata() {
		var personId = GetQueryString('id');
		console.log(personId);
		if (personId != null) {
			var index = layer.load();
			$.ajax({
				url : "../../personIndex/findGenesByPersonId",
				type : "GET",
				data : {
					"personId" : personId
				},
				dataType : "json",
				success : function(result) {
					result.personId = personId;
					// 进行处理
					htmlTpl(result, '#demoTpl', '#tablehtml',
							function() {
								layer.close(index);
								form.render();
							})
				},
				error : function(msg) {
					layer.msg('未连到服务器')
					layer.close(index);
				}
			})
		} else {
			var result = [];
			htmlTpl(result, '#demoTpl', '#tablehtml',function(){
				form.render();
			})
		}
	};
	reqdata();
});

function htmlTpl(data, getid, toid, fun) {
	layui.use('laytpl', function() {
		var $ = layui.$;
		var laytpl = layui.laytpl;
		var getTpl = $(getid).html();
		laytpl(getTpl).render(data, function(html) {
			$(toid).html(html);
			if (typeof fun == 'function') {
				fun();
			}
		});
	});
}
function ischecked(data, val) {
	return data == val ? 'checked' : '';
}
function isdisabled(val) {
	return isundefined(val) != '' ? 'layui-disabled' : '';
}

function isreadonly(val) {
	return isundefined(val) != '' ? 'readonly=readonly' : '';
}
function isSelected(data, val) {
	return data == val ? 'selected=""' : '';
}
function ischeckbox(data, val) {
	var arr = data.split(',');
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == val) {
			return 'checked';
		}
	}
	return '';
}
function isundefined(val) {
	if (typeof val == 'undefined') {
		return '';
	}
	if (val == null) {
		return '';
	}
	return val;
}
