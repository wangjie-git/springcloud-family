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

    table.render({
    	elem: "#test-table-operate"
    	,url : "../../Areaconfig/areaconfigInFo"
        ,cols: [[ //标题栏
        {type:'checkbox'},
        {field:'areaName', title: '区域'},
        {field:'', title: '是否辖区内才能签约'},
        {field:'areaCode', title: '区域编码 '},
        {field:'', title: '签约前是否需要公卫建档'},
        {field:'createTime', title: '创建时间'},
        {field:'isUsed', title: '是否可用'}
        ]]
    	,areaName : 'test-table-operate'
       	,areaCode : 'test-table-operate'
    	,skin: 'line' //表格风格
    	,even: true
    	,page: true //是否显示分页
    	,limits: [5, 10, 20]
    	,limit: 5 //每页默认显示的数量
    	});

	  // 数据表格
	  //展示已知数据
    form.on('submit(formDemo)', function(data){
    	var areaname = $("#areaname").val();
		var areacode = $("#areacode").val();
		$.ajax({
			url: "../../Areaconfig/areaconfigInFo",
            type : "POST",
            data: {areaName:areaname,areaCode:areacode},
			dataType: 'json',
            success : function(result) {
            	table.render({
            	elem: "#test-table-operate"
            	,data : result.data
	            ,cols: [[ //标题栏
	            {type:'checkbox'},
	            {field:'areaName', title: '区域'},
	            {field:'', title: '是否辖区内才能签约'},
	            {field:'areaCode', title: '区域编码 '},
	            {field:'', title: '签约前是否需要公卫建档'},
	            {field:'createTime', title: '创建时间'},
	            {field:'isUsed', title: '是否可用'}
	            ]]
            	,areaName : 'test-table-operate'
 	          	,areaCode : 'test-table-operate'
            	,skin: 'line' //表格风格
            	,even: true
            	,page: true //是否显示分页
            	,limits: [5, 10, 20]
            	,limit: 5 //每页默认显示的数量
            	});
            },
            error:function(msg){
                layer.msg('未连到服务器');
            }

  		})

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
                    	lableName: $("#areaname").val(),
                    }
                });
            },
            add:function(){
                location.href="AreaSave.html";
            },
            edit:function(re){
                var checkStatus = table.checkStatus('label-table-operate')
                    ,data = checkStatus.data;
                if(data.length > 0){
                	if(data.length > 1){
                        layer.msg('请勾选一条记录');

                	}else{
                        var id=data[0].labelid;
                        location.href="AreaUpdate.html?id="+id;
                	}
                }else{
                    layer.msg('请勾选')
                }

            },
            end:function(){
                var checkStatus = table.checkStatus('label-table-operate')
                    ,data = checkStatus.data;
                if(data.length>0){
                    layer.confirm('确定禁用' + data[0].areaName, function(index){
                        var id=data[0].id;
                        $.ajax({
                            url : "../../Area/updateStuts",
                            type : "GET",
                            data : {"id":id},
                            dataType : "json",
                            success : function(result) {
                                // todo 提示 & 重新显示表格数据
                            	table.reload('label-table-operate', {
                                    page: {
                                        curr: 1 //重新从第 1 页开始
                                    }
                                    ,where: {
                                    	lableName: $("#areaname").val(),
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
