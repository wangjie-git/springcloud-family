layui.use(['form','laydate','rate','table'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;
    var $ = layui.$;
    var taskPersonId = GetQueryString("taskPersonId");
    var personName = GetQueryString("personName");
    var sex = GetQueryString("sex");
    var result = {
    		taskPersonId: taskPersonId,
    		personName: personName,
    		sex: sex
    }
    htmlTpl(result, '#person_info', '#person_html', function(){
        form.render();
    })
	  //展示已知数据
    	table.render({
    	    elem: "#tablehtml"
    	    ,url : "../../phone/findTaskDetails?taskPersonId="+taskPersonId
    	    ,cols: [[ //标题栏
    	      {type:'checkbox'},
    	      {field:'taskName', title: '任务名称', align: "center"},
    	      {field:'appointmentTime',title:'预约时间', align: "center"},
    	      {field:'lastTime', title: '最近执行时间', align: "center"},
    	      {field:'delayTime', title: '推迟时间至', align: "center"},
    	    ]]
    	    ,skin: 'line' //表格风格
    	    ,even: true
    	    ,page: true //是否显示分页
    	    ,limits: [10, 20, 50]
    	    ,limit: 10 //每页默认显示的数量
    	});
	// 获取url指定参数值
	function GetQueryString(name) {
		var reg = new RegExp(("(^|&)" + name + "=([^&]*)(&|$)"));
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			//return unescape(r[2]);
			return decodeURI(r[2]);//解决中文乱码
		return null;
	}
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
function isundefined(val){
    if (typeof val == 'undefined') {
        return '';
    }
    return val;
}
