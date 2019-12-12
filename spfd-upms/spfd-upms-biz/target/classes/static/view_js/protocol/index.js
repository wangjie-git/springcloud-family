layui.use(['form','laydate','rate','table'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;
    var $ = layui.$;
    //监听复选框事件
    table.on('checkbox', function(obj){
     var cache = table.cache['protocol-table-operate'];
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
    });

        // 数据表格
      //展示已知数据
      table.render({
        elem: "#protocol-table-operate"
        ,url : "../../protocol/protocolList"
        ,cols: [[ //标题栏
           {type:'radio'},
          {field:'protocoltitle', title: '协议标题'},
          {field:'protocoltype', title: '协议类型'},
          {field:'isabparty', title: '甲方或乙方'},
          {field:'contentorgname', title: '创建机构'},
          {field:'createDor', title: '创建人'},
          {field:'contentupdatedate', title: '最后修改时间'},
	      {field:'isAvailable', title: '是否可用'},
          {title: '操作',align:'center', fixed: 'right',  toolbar: '#test-table-operate-barDemo'}
        ]]
        ,skin: 'line' //表格风格
        ,even: true
        ,page: true //是否显示分页
	    ,limits: [10, 20, 50]
        ,limit: 10 //每页默认显示的数量
      });

   /*   function removeTabelCell(){
    	  $("th[data-field='0']").children("div").find("i").hide();
      }
      //把方法作为一个参数传过去
      dataRender(removeTabelCell);*/
    //监听工具条
    table.on('tool(protocol-table-operate)', function(obj){
    	var data = obj.data;
        if(obj.event === 'detail'){
            location.href="viewdetails.html?id="+data.id;
        }
    });

    /**
     * 页面操作动作
     */
    var $ = layui.$, active = {
            reload: function(){
                // 执行重载
                table.reload('protocol-table-operate', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where: {
                    	contractType: $("#contractType").val(),
                    	contractTitle: $("#contractTitle").val()
                    }
                });
            },
            add:function(){
                location.href="add.html";
            },
            edit:function(re){
                var checkStatus = table.checkStatus('protocol-table-operate')
                    ,data = checkStatus.data;
                if(data.length > 0){
                    if(data.length > 1){
                        layer.msg('请勾选一条记录');

                    }else{
                        var id=data[0].id;
                        location.href="add.html?id="+id;
                    }
                }else{
                    layer.msg('请勾选')
                }

            },
            end:function(){
                var checkStatus = table.checkStatus('protocol-table-operate')
                    ,data = checkStatus.data;
                if(data.length>0){
                	if(data.length > 1){
                        layer.msg('请勾选一条记录');
                    }else{
                        layer.confirm('确定禁用' + data[0].protocoltitle, function(index){
                            var id=data[0].id;
                            $.ajax({
                                url : "../../protocol/updateAvailableStuts",
                                type : "GET",
                                data : {"id":id},
                                dataType : "json",
                                success : function(result) {
                                    // todo 提示 & 重新显示表格数据
                                    table.reload('protocol-table-operate', {
                                        page: {
                                            curr: 1 //重新从第 1 页开始
                                        }
                                        ,where: {
                                        	contractType: $("#contractType").val(),
                                        	contractTitle: $("#contractTitle").val()
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
                    }

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