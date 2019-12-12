var codes={"codes":"GENDER"};
var childrenId = GetQueryString("childrenId");
var healthfileNo=GetQueryString("healthfileNo");
var mangementNo=GetQueryString("mangementNo");
layui.config({
	base : '../layuiadmin/' // 静态资源所在路径
}).extend({
	index : 'lib/index' // 主入口模块
}).use('index', function() {
	var $ = layui.$, layer = layui.layer;
	// $("#homesrc").attr('src', './table6.html')
	var htm = GetQueryString('htm')
	if (htm) {
		clickhtm(htm)
	}
	setTimeout(function() {
	}, 100);
});

layui.use(['form', 'layedit', 'laydate','laytpl','table'], function(){
	  var form = layui.form
	  ,layer = layui.layer
	  ,layedit = layui.layedit
	  ,laydate = layui.laydate
	  ,laytpl = layui.laytpl
	  ,table = layui.table
	  ,$ = layui.$;
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
// 获取url指定参数值
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

function clickhtm(htm) {
	var $ = layui.$;
	$("li a").each(function() {
		var str = $(this).attr('htm'); // click
		if (str == htm) {
			$(this).click()
		}
	})
}

// 获取url指定参数值
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}




