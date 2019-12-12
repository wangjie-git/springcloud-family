layui.use(['form','laydate','rate','table'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;
    var $ = layui.$;
	  //展示已知数据
    	table.render({
    	    elem: "#taskperson_table"
    	    ,url : "../../phone/findPersonTask"
    	    ,cols: [[ //标题栏
    	      {type:'radio'},
    	      {field:'personName', title: '居民姓名', align: "center"},
    	      {field:'sex', title: '性别', align: "center"},
    	      /*{field:'phoneNumber', title: '手机号码', align: "center"},*/
    	      {field:'idNumber',title:'身份证', align: "center"},
    	      {field:'address', title: '住址', align: "center"},
    	      {field:'dealDoneCount',title:'待处理信息(条)', align: "center"},
    	      {field:'labelSimplName',title:'标签', align: "center"},
              {title: '操作',align:'center', fixed: 'right',  toolbar: '#test-table-team-barDemo'}
    	    ]]
    	    ,skin: 'line' //表格风格
    	    ,even: true
    	    ,page: true //是否显示分页
    	    ,limits: [10, 20, 50]
    	    ,limit: 10 //每页默认显示的数量
    	});

    //监听工具条
    table.on('tool(taskperson_table)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            location.href="taskDetail.html?taskPersonId="+data.id+"&personName="+data.personName+"&sex="+data.sex;
        }
    });
    /**
     * 页面操作动作
     */
    var $ = layui.$, active = {
    		reload: function(){
                // 执行重载
                table.reload('taskperson_table', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where: {
                    	name: $("#personName").val(),
                    }
                });
            }
        };

    //操作命令赋值
    $('.search-form .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});
