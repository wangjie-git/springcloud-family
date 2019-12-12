//获取token

var _this;
layui.use([ 'dtree', 'form', 'laydate', 'rate', 'table' ], function() {
	var form = layui.form;
	var laydate = layui.laydate;
	var rate = layui.rate;
	var table = layui.table;
	var $ = layui.$;
	var dtree = layui.dtree;
    var token = localStorage.getItem("token");

// 页面初始化需要用到 请求数据
    function reqdata(){
        var result=[];
        htmlTpl(result, '#demoTpl', '#tablehtml', function(){
            form.render();
        });
    }


    reqdata();

    form.on('submit(formDemo)', function(data){
        window.location.href = "/generatorCodeZip?packageName="+data.field.packageName +
            "&author=" + data.field.author +
            "&moduleName=" + data.field.moduleName +
            "&tablePrefix=" + data.field.tablePrefix +
            "&tableName=" + data.field.tableName +
            "&databaseName=" + data.field.databaseName +
            "&comments=" + data.field.comments ;
    });

    /**
     * 页面操作动作
     */
    var $ = layui.$, active = {

    };

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




});
