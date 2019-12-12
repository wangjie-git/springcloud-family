layui.use(['layer','form','laydate','rate','table','selectN','selectM'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;
    var layer = layui.layer,
    selectN = layui.selectN
    ,selectM = layui.selectM
    ,$ = layui.$;
    // 时间选择器
    laydate.render({
        elem: '#beginDate'
        ,range: true
    });
    var tagIns2 = null;
    function getAllLabels(){
        $.ajax({
            url : "../../label/getAllLabels",
            type : "GET",
           // data : {"packId":packId},
            dataType : "json",
            success : function(result) {
            	var tagDatas = [];
            	$.each(result,function(index,value){
            		var obj = {"id":value.id,"name":value.labelName};
            		tagDatas.push(obj);
            	});
            	var length = 0;
            	if(result != null && result.length > 0){
            		length = result.length;
            	}
            	tagIns2 = selectM({
            	      //元素容器【必填】
            	      elem: '#labelIds'
            	      //候选数据【必填】
            	      ,data: tagDatas,
            	      //默认值
            	      //最多选中个数，默认5
            				max : length
            				//input的name 不设置与选择器相同(去#.)
            				,name: 'labelIdsDiv'
            				//值的分隔符
            				,delimiter: ','
            				//候选项数据的键名
            				,field: {idName:'id',titleName:'name'}
            	    });
    			form.render();
            },
            error:function(msg){
                layer.msg('未连到服务器')
            }
        })
    }
    var packageIns2 = null;
    $("button[type=reset]").bind("click",function(){
    	tagIns2.set([]);
    	packageIns2.set([]);
    })
    function getAllPack(){
        $.ajax({
            url : "../../packmanage/getAllPack",
            type : "GET",
           // data : {"packId":packId},
            dataType : "json",
            success : function(result) {
            	var tagDatas = [];
            	$.each(result,function(index,value){
            		var obj = {"id":value.packId,"name":value.packName};
            		tagDatas.push(obj);
            	});
            	var length = 0;
            	if(result != null && result.length > 0){
            		length = result.length;
            	}
            	packageIns2 = selectM({
            	      //元素容器【必填】
            	      elem: '#packNames'
            	      //候选数据【必填】
            	      ,data: tagDatas,
            	      //默认值
            	      //最多选中个数，默认5
            				max : length
            				//input的name 不设置与选择器相同(去#.)
            				,name: 'packageIdsDiv'
            				//值的分隔符
            				,delimiter: ','
            				//候选项数据的键名
            				,field: {idName:'id',titleName:'name'}
            	    });
    			form.render();
            },
            error:function(msg){
                layer.msg('未连到服务器')
            }
        })
    }
    getAllLabels();
    getAllPack();

    //监听复选框事件
    table.on('checkbox', function(obj){
     var cache = table.cache['contractmen-table-operate'];
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
            elem: "#contractmen-table-operate"
            ,url : "../../contractmen/queryInfos"
            ,cols: [[ //标题栏
              {field:'name', title: '姓名'},
              {field:'sexName', title: '性别'},
              {field:'cardNo', title: '身份证号'},
              {field:'phoneNumber', title: '电话'},
              {field:'labels', title: '人群分类'},
              {field:'servicePacks', title: '服务包'},
              {field:'createDorName', title: '创建人'},
              {field:'contractDate', title: '签约时间'},
              {field:'endDate', title: '到期时间'},
              {field:'isTerminationVal', title: '是否解约'},
              {field:'fromData', title: '来源'},
              {title: '操作',align:'center', fixed: 'right',  toolbar: '#test-table-operate-barDemo'}
            ]]
            ,skin: 'line' //表格风格
            ,even: true
            ,page: true //是否显示分页
    	    ,limits: [10, 20, 50]
          ,limit: 10 //每页默认显示的数量,
          });

/*
    function removeTabelCell(){
   	 $("th[data-field='0']").children("div").remove();
   	 $("td[data-field='0']").children("div").remove();
   }
     //把方法作为一个参数传过去
     dataRender(removeTabelCell);*/

    //监听工具条
    table.on('tool(contractmen-table-operate)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            location.href="contractmendetail.html?personInfoId="+data.personInfoId;
        }
    });
    //筛选按钮动作
    form.on('submit(contractMenReload)',function(data){
    	var classifyList = tagIns2.values;
    	var classify = "";
    	if(classifyList != null && classifyList.length > 0){
    		classify = classifyList.join("-");
    	}
    	var servicePackageList = packageIns2.values;
    	var servicePackage = "";
    	if(servicePackageList != null && servicePackageList.length > 0){
    		servicePackage = servicePackageList.join("-");
    	}
    	// 执行重载
        table.reload('contractmen-table-operate', {
            page: {
                curr: 1 //重新从第 1 页开始
            }
            ,where: {
                name: $("#name").val(),
                sex: $("#sex").val(),
                phone: $("#phone").val(),
                idNumber: $("#idNumber").val(),
                datafrom: $("#datafrom").val(),
                classify: classify,
                servicePackage: servicePackage,
                beginDate: $("#beginDate").val(),
                isTermination: $("#isTermination").val(),
            }
        });
    });


    /*//操作命令赋值
    $('.search-form .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });*/
});

