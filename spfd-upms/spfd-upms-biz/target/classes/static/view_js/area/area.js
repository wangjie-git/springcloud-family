layui.use(['form','laydate','rate','table'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;
    var $ = layui.$;

    // 时间选择器
    laydate.render({
        elem: '#createDate'
        ,range: true
    });
    /*//监听复选框事件
    table.on('checkbox', function(obj){
     var cache = table.cache['areaInfo-table-operate'];
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
    		    elem: "#areaInfo-table-operate"
    		    ,url : "../../Area/areaInFo"
    		    ,cols: [[ //标题栏
    		       {type:'radio'},
    		      {field:'areaName', title: '区域名称'},
    		      {field:'areaCode', title: '区域编码'},
    	  	      {field:'isggwshealth', title: '签约前是否需要公卫建档'},
    	  	      {field:'isareacontract', title: '是否能够跨辖区签约'},
    		      {field:'createTime', title: '创建时间 '},
    		      {field:'isUsed', title: '是否可用'},
    	          {title: '操作',align:'center', fixed: 'right',  toolbar: '#test-table-family-barDemo'}
    		    ]]
    		    ,areaName : 'areaInfo-table-operate'
    			,areaCode : 'areaInfo-table-operate'
    		    ,skin: 'line' //表格风格
    		    ,even: true
    		    ,page: true //是否显示分页
    		    ,limits: [10, 20, 50]
    	      ,limit: 10 //每页默认显示的数量,
    		  });

/*    function removeTabelCell(){
  	  $("th[data-field='0']").children("div").find("i").hide();
    }
    //把方法作为一个参数传过去
    dataRender(removeTabelCell);*/

    form.on('submit(formDemo)', function(obj){
			/*$.ajax({
				url: "../../Area/areaInFo",
	            type : "POST",
				data: obj.field,
				dataType: 'json',
	            success : function(result) {*/
	          	  table.render({
	          	    elem: "#areaInfo-table-operate"
	          	    ,url: "../../Area/areaInFo"
	          	    ,where:obj.field
	          	    //,data : result
	          	    ,cols: [[ //标题栏
	          	       {type:'radio'},
	         	      {field:'areaName', title: '区域名称'},
	        	      {field:'areaCode', title: '区域编码'},
	          	      {field:'isggwshealth', title: '签约前是否需要公卫建档'},
	          	      {field:'isareacontract', title: '是否档案在辖区内才能签约'},
	        	      {field:'createTime', title: '创建时间 '},
	          	      {field:'isUsed', title: '是否可用'},
	                  {title: '操作',align:'center', fixed: 'right',  toolbar: '#test-table-family-barDemo'}
	          	    ]]
	          	    ,areaName : 'areaInfo-table-operate'
	          		,areaCode : 'areaInfo-table-operate'
	          	    ,skin: 'line' //表格风格
	          	    ,even: true
	          	    ,page: true //是否显示分页
	          	    ,limits: [10, 20, 50]
	          	    ,limit: 10 //每页默认显示的数量
	          	  });
/*
	          },
	          error:function(msg){
	              layer.msg('未连到服务器');
	          }

			})*/

	    });
    //监听工具条
    table.on('tool(areaInfo-table-operate)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            location.href="AreaScan.html?id="+data.id+"_Y";
        }
    });

    /**
     * 页面操作动作
     */
    var $ = layui.$, active = {
    		reload: function(){
                // 执行重载
                table.reload('areaInfo-table-operate', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where: {
                    	areaName: $("#areaname").val()
                		,areaCode : $("#areaCode").val()
                		,createDate : $("#createDate").val()
                		,isggwshealth : $("#isggwshealth").val()
                		,isareacontract : $("#isareacontract").val()
                    }
                });
            },
            add:function(){
                location.href="AreaSave.html?id=UNDM";
            },
            edit:function(re){
                var checkStatus = table.checkStatus('areaInfo-table-operate')
                    ,data = checkStatus.data;
                if(data.length > 0){
                	if(data.length > 1){
                        layer.msg('请勾选一条记录');

                	}else{
                        var id=data[0].id;
                        location.href="AreaSave.html?id="+id;
                	}
                }else{
                    layer.msg('请勾选')
                }

            },
            end:function(){
                var checkStatus = table.checkStatus('areaInfo-table-operate')
                    ,data = checkStatus.data;
                if(data.length>0){
                    layer.confirm('确定禁用区域' + data[0].areaName, function(index){
                        var id=data[0].id;
                        $.ajax({
                            url : "../../Area/updateStuts",
                            type : "GET",
                            data : {"ids":id},
                            dataType : "json",
                            success : function(result) {
                                // todo 提示 & 重新显示表格数据
                            	if(result.msgCode=="10000"){
                            		table.reload('areaInfo-table-operate', {
                                        page: {
                                            curr: 1 //重新从第 1 页开始
                                        }
                                        ,where: {
                                        	areaName: $("#areaname").val()
                                    		,areaCode : $("#areaCode").val()
                                    		,createDate : $("#createDate").val()
                                        }
                                    });
                                    layer.msg('操作成功')
                            	}else{
                            		layer.msg(result.msgText);
                            	}
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
