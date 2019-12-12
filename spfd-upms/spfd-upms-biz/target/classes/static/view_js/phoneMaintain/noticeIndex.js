layui.use(['form','laydate','rate','table'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;
    var $ = layui.$;
	  //展示已知数据
    	table.render({
    	    elem: "#noticInfo_table"
    	    ,url : "../../phone/findAllNotice"
    	    ,cols: [[ //标题栏
    	      {type:'radio'},
    	      {field:'noticeType', title: '消息类型', align: "center"},
    	      {field:'noticeTrget', title: '推送目标类型', align: "center"},
    	      {field:'pushCount',title:'推送人数', align: "center"},
    	      {field:'readCount', title: '阅读人数', align: "center"},
    	      {field:'creatTime',title:'创建时间', align: "center"},
    	      {field:'noticsTitle',title:'标题', align: "center"},
    	      {field:'msgStatus',title:'消息状态', align: "center"},
              {title: '操作',align:'center', fixed: 'right',  toolbar: '#test-table-team-barDemo'}
    	    ]]
    	    ,skin: 'line' //表格风格
    	    ,even: true
    	    ,page: true //是否显示分页
    	    ,limits: [10, 20, 50]
    	    ,limit: 10 //每页默认显示的数量
    	});

    //监听工具条
    table.on('tool(noticInfo_table)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
        	//将localStorage传递到哪个页面
            location.href="noticeinfo.html?noticeId="+data.id;
            //设置localStorage
            window.localStorage.setItem('noticsTitle', data.noticsTitle);
            window.localStorage.setItem('noticeTrget', data.noticeTrget);
            window.localStorage.setItem('noticeType', data.noticeType);
            window.localStorage.setItem('noticsContent', data.noticsContent);
        }
    });
    /**
     * 页面操作动作
     */
    var $ = layui.$, active = {
    		reload: function(){
                // 执行重载
                table.reload('noticInfo_table', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where: {
                    	noticeType: $("#noticeType").val(),
                    }
                });
            },
            add:function(){
                location.href="addNotice.html";
            },
            end:function(){
                var checkStatus = table.checkStatus('noticInfo_table')
                    ,data = checkStatus.data;
                if(data.length>0){
                    layer.confirm('确定禁用?', function(index){
                        var id=data[0].id;
                        $.ajax({
                            url : "../../phone/updateNoticeInfoStatus",
                            type : "GET",
                            data : {"id":id,msgStatus: "1"},
                            dataType : "json",
                            success : function(result) {
                                // todo 提示 & 重新显示表格数据
                            	table.reload('noticInfo_table', {
                                    page: {
                                        curr: 1 //重新从第 1 页开始
                                    }
                                    ,where: {
                                    	noticeType: $("#noticeType").val(),
                                    }
                                });
                                layer.msg('操作成功')
                            },
                            error:function(msg){
                                layer.msg('未连到服务器')
                            }
                        })
                    });
                }
            }
        };

    //操作命令赋值
    $('.search-form .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});
