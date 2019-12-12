layui.use(['form','laydate','rate','table'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;
    var $ = layui.$;

    // 时间选择器
    laydate.render({
        elem: '#beginDate'
        ,range: true
    });



    //监听复选框事件
    /*table.on('checkbox', function(obj){
     var cache = table.cache['teamInfo-table-operate'];
     if(obj.checked){
      for(data in cache){
       if(cache[data].LAY_TABLE_INDEX!=obj.data.LAY_TABLE_INDEX){
        cache[data].LAY_CHECKED = false;
       }
      }
      $("input[name='layTableCheckbox']:not(:eq("+(obj.data.LAY_TABLE_INDEX+1)+"))").removeAttr("checked");
      $("input[name='layTableCheckbox']:not(:eq("+(obj.data.LAY_TABLE_INDEX+1)+"))").next("div").removeClass("layui-form-checked");
       }else{
      for(data in cache){
       if(cache[data].LAY_TABLE_INDEX==obj.data.LAY_TABLE_INDEX){
        cache[data].LAY_CHECKED = false;
       }
      }
      $("input[name='layTableCheckbox']:eq("+(obj.data.LAY_TABLE_INDEX+1)+")").removeAttr("checked");
       }

     //$("th[data-field='0']").children("div").find("i").hide();
     table.render();
    });*/
    // 数据表格
	  //展示已知数据
    	table.render({
    	    elem: "#teamInfo-table-operate"
    	    ,url : "../../Team/teamInFo"
    	    ,cols: [[ //标题栏
    	      {type:'radio'},
    	      {field:'teamname', title: '团队名称'},
    	      {field:'teamcode', title: '团队编码'},
    	      {field:'teamOrgName', title: '团队所属机构 '},
    	      {field:'ceateDate',title:'创建时间'},
    	      {field:'available', title: '是否可用'},
    	      {field:'teamfrom',title:'数据来源'},
              {title: '操作',align:'center', fixed: 'right',  toolbar: '#test-table-team-barDemo'}
    	    ]]
    	    ,skin: 'line' //表格风格
    	    ,even: true
    	    ,page: true //是否显示分页
    	    ,limits: [10, 20, 50]
    	    ,limit: 10 //每页默认显示的数量
    	});

/*    function removeTabelCell(){
  	  $("th[data-field='0']").children("div").find("i").hide();
    }
    //把方法作为一个参数传过去
    dataRender(removeTabelCell);*/



    //监听工具条
    table.on('tool(teamInfo-table-operate)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            location.href="TeamDetail.html?teamId="+data.teamid;
        }
        if(obj.event === 'maintain'){
            location.href="TeamMaintain.html?teamId="+data.teamid;
        }
    });

    /**
     * 页面操作动作
     */
    var $ = layui.$, active = {
    		reload: function(){

                // 执行重载
                table.reload('teamInfo-table-operate', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where: {
                    	teamname: $("#teamname").val(),
                        teamcode: $("#teamcode").val(),
                        teamfrom: $("#teamfrom").val(),
                        orgId: $("#orgId").val(),
                        beginDate: $("#beginDate").val(),
                    }
                });
            },
            add:function(){
                location.href="TeamSaveOrUpdate.html";
            },
            edit:function(re){
                var checkStatus = table.checkStatus('teamInfo-table-operate')
                    ,data = checkStatus.data;
                if(data.length > 0){
                	if(data.length > 1){
                        layer.msg('请勾选一条记录');

                	}else{
                        var id=data[0].teamid;
                        location.href="TeamSaveOrUpdate.html?teamId="+id;
                	}
                }else{
                    layer.msg('请勾选')
                }

            },
            end:function(){
                var checkStatus = table.checkStatus('teamInfo-table-operate')
                    ,data = checkStatus.data;
                if(data.length>0){
                    layer.confirm('确定禁用' + data[0].teamname, function(index){
                        var id=data[0].teamid;
                        $.ajax({
                            url : "../../Team/updateStuts",
                            type : "GET",
                            data : {"teamid":id},
                            dataType : "json",
                            success : function(result) {
                                // todo 提示 & 重新显示表格数据
                            	table.reload('teamInfo-table-operate', {
                                    page: {
                                        curr: 1 //重新从第 1 页开始
                                    }
                                    ,where: {
                                    	teamname: $("#teamname").val(),
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
