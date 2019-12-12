var flag;
var operateFlag = false;
function loadTable() {
	//初始化表格数据
    $('#tableId').bootstrapTable({
     		method: 'POST',
     		url: "../data/getData",
     		striped: true,
     		pagination: true,
     		pageList: [10,20,50,100],
     		"queryParamsType": "limit",
     		dataType: "json",
     		sidePagination:'server',
     		contentType: "application/x-www-form-urlencoded",
     		showColumns: true,
     		showRefresh: true,
     		clickToSelect: true,
     		singleSelect: true,
     		showToggle :true,
     		search:true,
     		onPageChange:pageChange,
     		onCheck: onCheck,
     		onUncheck: onUncheck
        });
 	  	$("#highsearch").click(function() {
 	  		var _this = $(this);
 	  		if ($("#othercondition").is(":hidden")) {
 	  			$("#othercondition").show();
 	  			_this.text("隐藏高级查询");
 	  		} else {
 	  			$("#othercondition").hide();
 	  			_this.text("高级查询");
 	  		}
 	  	});


 	  	//加载日期控件
 	  	qiao.bs.bsdate('.qdate',{
 	  		autoclose: true,
 	  		language : 'zh-CN',
 	  		format: 'yyyy-mm-dd'
 	  	});

 	  	$("#closeBtn").click(function() {
 	  		$(".popcontent").hide();
 	  	});

 	  	$("#citySel").combotree({
 	  		url:"../orgnization/regionList",
 	  		type:"get"
 	  	});

    }

    function pageChange(number, size) {
    	//search();
    }

    function clickRow(row) {
    	if (row.id == flag) {
    		$(".popcontent").toggle();
    		return;
    	} else {
    		flag = row.id;
    		if ($(".popcontent").is(":hidden")) {
    			$(".popcontent").show();
    		}
    	}
    }

    function onCheck(row) {
    	if (operateFlag) {
    		$(".popcontent").hide();
    		operateFlag = false;
    		return;
    	}
    	$(".popcontent").show();
    }

    function onUncheck(row) {
    	$(".popcontent").hide();
    }

    function queryParams(params) {
    	return {
    		limit: params.limit,
    		offset: params.offset
    	};
    }


    function search() {
    	var name = $("#name").val();
    	var price = $("#price").val();
    	/* $.ajax({
			 url:"data/getData?seach=seach",
			 data:{'name':name,'price':price},
			 dataType:"json",
			 type:"POST",
			 success:function(data) {
				 $("#tableId").bootstrapTable('removeAll');
				 $("#tableId").bootstrapTable('load', data);
			 }
		 }); */
		 var selectRow = $("#tableId").bootstrapTable('getSelections');
		 if (selectRow.length == 0) {
			  /* $.alert({
				    title: '操作提示',
		   		 animation: '',
		   	    content: '必须选择一项!',
		   	    cancelButtonClass:'btn-primary',
		   	    cancelButton:true,
		   	    backgroundDismiss:false,
		   	    confirmButton:'确认',
		   	    confirmButtonClass : "btn-primary",
		   	    columnClass : "col-md-4 col-md-offset-4",
		      	 keyboardEnabled : true
		   	}); */
		   	//$("#exampleModal_1").modal('show');
			 qiao.bs.msg({
				    msg  : '自定义消息提示条，警告，3秒消失',
				    type : 'danger',
				    time : 3000
				});
		 } else {
			 qiao.bs.alert("不能为空")
		 }
    }
    function xiugai() {
    	/* $.alert({
   		 animation: 'top',
   	    title: 'Text content!',
   	    content: 'Simple modal!',
   	    confirmButtonClass:'btn-primary',
   	    cancelButtonClass:'btn-info',
   	    backgroundDismiss:true,
   	    confirm:function() {
   	    	$("#org_code").focus();
   	    }
   	}); */
   	var flag = $('#flag');
    var selectRow = $("#tableId").bootstrapTable('getSelections');
	 if (selectRow.length == 0) {
		 alert("必须选择一项");
	 } else {
		 var row = $("#tableId").bootstrapTable('getSelections')[0];
		 flag.val(row.name);
		 $('#exampleModal').modal("show");
	 }
    }
    function operateFormatter(value, row, index) {
        return [
            '<button class="like btn btn-sm btn-primary" title="查看详情">',
            	'查看详情',
            '</button>'
        ].join('');
    }

    window.operateEvents = {
         'click .like': function (e, value, row, index) {
        	   operateFlag = true;
        	   window.open('../viewer/frame');
         }
     };
