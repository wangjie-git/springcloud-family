layui.use(['form','laydate','rate','table'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;
    var $ = layui.$;
    var personId = GetQueryString("personId");
	    // 数据表格
	  //展示已知数据
    table.render({
	    elem: "#op_historyInfo"
	    ,url : "../../outpatients/findPersonData?personId="+ personId
	    ,id: 'op_historyInfo_table'
	    ,cols: [[ //标题栏
	      {type: 'checkbox'},
	      {title: '序号',templet: '#indexTpl', width:60},
	      {field:'uploadDate', title: '上传时间'},
	      {field:'uploadOrgName', title: '体检机构'},
	      {field:'uploadDorName', title: '体检医生'},
	      {field:'healthDate', title: '体检时间'},
	      {field:'haveProject', title: '体检项目'},
	    ]]
    	,done: function(){
    	}
		,id: "op_historyInfo_table"
	    ,skin: 'line' //表格风格
	    ,even: true
	    ,page: true //是否显示分页
	    ,limits: [10, 20, 50]
	    ,limit: 10 //每页默认显示的数量,
	  });
    // 获取url指定参数值
    function GetQueryString(name) {
        var reg = new RegExp(("(^|&)"+name+"=([^&]*)(&|$)"));
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);return null;
    }
    $("#save_btn").click(function(){
    	var checkStatus = layui.table.checkStatus('op_historyInfo_table').data;
    	if(checkStatus.length < 2){
    		layer.msg('请选择最少2条体检记录进行合并操作！');
    		return;
    	}
    	var healthIds = "";
    	for (var i = 0; i < checkStatus.length; i++) {
    		healthIds = healthIds+checkStatus[i].healthId+",";
		}
    	if(healthIds.length > 0){
    		healthIds = healthIds.substring(0, healthIds.length);
    	}
    	parent.location.href = "../../outpatients/mergePrintExaminationReport?mergeid=" + healthIds;
    });
});

function subTable(){
	var checkStatus = layui.table.checkStatus('op_historyInfo_table').data;
	if(checkStatus.length < 2){
		layer.msg('请选择最少2条体检记录进行合并操作！');
		return;
	}
	var healthIds = "";
	for (var i = 0; i < checkStatus.length; i++) {
		healthIds = healthIds+checkStatus[i].healthId+",";
	}
	if(healthIds.length > 0){
		healthIds = healthIds.substring(0, healthIds.length);
	}
	parent.location.href = "../../outpatients/mergePrintExaminationReport?mergeid=" + healthIds;
}
