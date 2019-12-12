
layui.use(['layer','form','laydate','rate','table'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;
    var layer = layui.layer;
    $ = layui.$;
    var laypage = layui.laypage;


    // 时间选择器
    laydate.render({
        elem: '#startDate'
        ,range: true
    });


    //监听复选框事件
   /* table.on('checkbox', function(obj){
     var cache = table.cache['packmanage-table-operate'];
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
*/

    	 // 数据表格
        //展示已知数据
        table.render({
          elem: "#packmanage-table-operate"
          ,url : "../../packmanage/packManageList"
          ,cols: [[ //标题栏
             {type:'radio'},
            {field:'packType', title: '服务包类型'},
            {field:'packName', title: '服务包名称'},
            {field:'packStatus', title: '是否可用'},
            {field:'servicePrice', title: '服务价格'},
            {field:'discountPrice', title: '优惠价格'},
            {field:'createTime', title: '创建时间'},
            {field:'packLabel', title: '服务包标签'},
            {title: '操作',align:'center', fixed: 'right',  toolbar: '#test-table-operate-barDemo'}
          ]]
          ,skin: 'line' //表格风格
          ,even: true
          ,page: true //是否显示分页
  	    ,limits: [10, 20, 50]
        ,limit: 10 //每页默认显示的数量,
        });


   /* function removeTabelCell(){
  	  $("th[data-field='0']").children("div").children("div").find("i").hide();
    }
    //把方法作为一个参数传过去
    dataRender(removeTabelCell);*/
    laypage.render({
        elem: "#packmanage-table-operate"
        ,count: 50 //数据总数，从服务端得到
      });

    function getAllLabels(){
        $.ajax({
            url : "../../label/getAllLabels",
            type : "GET",
           // data : {"packId":packId},
            dataType : "json",
            success : function(result) {
            	var optionLists = ' <option value="">请选择</option>';
            	$.each(result,function(index,value){
            		optionLists = optionLists + '<option value='+value.id+'>'+value.labelName+'</option>';
            	});
            	if(document.getElementById("labelIds")){
        			document.getElementById("labelIds").innerHTML=optionLists;
            	}
    			form.render();
            },
            error:function(msg){
                layer.msg('未连到服务器')
            }
        })
    }
    function getAllPack(){
        $.ajax({
            url : "../../packmanage/getAllPack",
            type : "GET",
           // data : {"packId":packId},
            dataType : "json",
            success : function(result) {
            	var optionLists = ' <option value="">请选择</option>';
            	$.each(result,function(index,value){
            		optionLists = optionLists + '<option value='+value.packId+'>'+value.packName+'</option>';
            	});
            	if(document.getElementById("packName")){
        			document.getElementById("packName").innerHTML=optionLists;
            	}
    			form.render();
            },
            error:function(msg){
                layer.msg('未连到服务器')
            }
        })
    }
    getAllLabels();
    getAllPack();

    //监听工具条
    table.on('tool(packmanage-table-operate)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            location.href="viewdetails.html?packId="+data.packId;
        }
    });

    /**
     * 页面操作动作
     */
    var $ = layui.$, active = {
            reload: function(){
            	var labelList = $("#labelIds").val();
            	var labels = "";
            	if(labelList != null && labelList.length > 0){
            		labels = labelList.join("-");
            	}
                // 执行重载
                table.reload('packmanage-table-operate', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where: {
                    	type: $("#type").val(),
                    	name: $("#packName").val(),
                    	labels: labels,
                    	startDate: $("#startDate").val(),

                    }
                });
            },
            add:function(){
                location.href="addOrUpdate.html?packId=UNDM";
            },
            edit:function(re){
                var checkStatus = table.checkStatus('packmanage-table-operate')
                    ,data = checkStatus.data;
                if(data.length > 0){
                    if(data.length > 1){
                        layer.msg('请勾选一条记录');

                    }else{
                        var packId=data[0].packId;
                        location.href="addOrUpdate.html?packId="+packId;
                    }
                }else{
                    layer.msg('请勾选')
                }

            },
            end:function(){
                var checkStatus = table.checkStatus('packmanage-table-operate')
                    ,data = checkStatus.data;
                if(data.length>0){
                	if(data.length > 1){
                        layer.msg('请勾选一条记录');
                    }else{
                        layer.confirm('确定禁用' + data[0].packName, function(index){
                            var packId=data[0].packId;
                            $.ajax({
                                url : "../../packmanage/updatePackStatus",
                                type : "GET",
                                data : {"packId":packId},
                                dataType : "json",
                                success : function(result) {
                                    // todo 提示 & 重新显示表格数据
                                    table.reload('packmanage-table-operate', {
                                        page: {
                                            curr: 1 //重新从第 1 页开始
                                        }
                                        ,where: {
                                        	name: $("#name").val(),
                                        	type: $("#type").val(),
                                        	startDate: $("#startDate").val(),
                                        	labelIds:JSON.stringify($("#labelIds").val()),
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