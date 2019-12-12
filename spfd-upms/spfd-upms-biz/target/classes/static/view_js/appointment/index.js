layui.use(['form','laydate','rate','table'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;

    // 时间选择器
    laydate.render({
        elem: '#test6'
        ,range: true
    });
	    // 数据表格
	  //展示已知数据
	  table.render({
	    elem: "#label-table-operate"
	    ,url : "../../attachment/attachmentList"
	    ,cols: [[ //标题栏
	       {type:'checkbox'},
	      {field:'userName', title: '姓名'},
	      {field:'sexName', title: '性别'},
	      {field:'idNumber', title: '身份证号'},
	      {field:'telePhone', title: '电话号码'},
	      {field:'forgid', title: '机构'},
	      {field:'fdoctorname', title: '服务医生'},
	      {field:'fpardate', title: '服务时间'},
	      {field:'fformdata', title: '来源'},
	      {title: '操作',align:'center', fixed: 'right',  toolbar: '#test-table-operate-barDemo'}
	    ]]
	    ,skin: 'line' //表格风格
	    ,even: true
	    ,page: true //是否显示分页
	    ,limits: [10, 20, 50]
	    ,limit: 5 //每页默认显示的数量
	  });

    //监听工具条
    table.on('tool(label-table-operate)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            location.href="detail1.html?id="+data.id;
        }
    });

    /**
     * 页面操作动作
     */
    var $ = layui.$, active = {
    		reload: function(){
                // 执行重载
                table.reload('label-table-operate', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where: {
                    	name: $("#name").val(),
                    	sex: $("#sex").val(),
                    	idNumber: $("#idNumber").val(),
                    	telePhone: $("#telePhone").val(),
                    	dataFrom: $("#dataFrom").val(),
                    	orgId: $("#orgId").val(),
                    	createId: $("#createId").val(),
                    }
                });
            },
            add:function(){
                location.href="add.html";
            },
            edit:function(re){
                var checkStatus = table.checkStatus('label-table-operate')
                    ,data = checkStatus.data;
                if(data.length > 0){
                	if(data.length > 1){
                        layer.msg('请勾选一条记录');

                	}else{
                        var id=data[0].labelid;
                        location.href="add.html?id="+id;
                	}
                }else{
                    layer.msg('请勾选')
                }

            },
            end:function(){
                var checkStatus = table.checkStatus('label-table-operate')
                    ,data = checkStatus.data;
                if(data.length>0){
                    layer.confirm('确定禁用' + data[0].labelName, function(index){
                        var id=data[0].labelid;
                        $.ajax({
                            url : "../../label/updateAvailableStuts",
                            type : "GET",
                            data : {"labelid":id},
                            dataType : "json",
                            success : function(result) {
                                // todo 提示 & 重新显示表格数据
                            	table.reload('label-table-operate', {
                                    page: {
                                        curr: 1 //重新从第 1 页开始
                                    }
                                    ,where: {
                                    	lableName: $("#lableName").val(),
                                    }
                                });
                                layer.msg('操作成功')
                            },
                            error:function(msg){
                                layer.msg('未连到服务器')
                            }
                        })
                        layer.close(index);
                    });
                }else{
                    layer.msg('请勾选')
                }
            },
        };

    //操作命令赋值
    $('.search-form .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });


});