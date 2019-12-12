layui.use(['form','laydate','rate','table'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;
    var $ = layui.$;

    // 时间选择器,只显示今天以及今天之前的七天的日期
    laydate.render({
        elem: '#logDate',
        value: new Date(),
        min:-7,
        max: 0
    });

    var $ = layui.$, active = {
    		download:function(){

                layer.confirm('确定要下载吗？', {
    				  btn: ['确定', '取消']
    				}, function(index, layero){
      				  //按钮【按钮一】的回调
    					 layer.close(index);
    				 	var logDate = $("#logDate").val();
    	                var logLine = $("#logLine").val();
    	                var fileResult = getFileData(logDate,logLine);
    	                if(fileResult == "FileNotFound"){
    	                    layer.msg('未找到该日志文件！')
    	            	}else if(fileResult == "fileTooBig"){
    	            		layer.msg('日志文件超过了30M，请直接下载文件查看！')
    	            	}else if(fileResult == "ok"){
    	                    var url = "../../log/downloadLog?logDate="+logDate+"&logLine="+logLine;
        		            window.location.href = url;
    	            	}
    				}, function(index){
    				  //按钮【按钮二】的回调
   					 layer.close(index);
    				});

            },
            scan:function(){
                var logDate = $("#logDate").val();
                var logLine = $("#logLine").val();
                var urlStr = "../../log/getFileData?logDate="+logDate+"&logLine="+logLine;
                var fileResult = getFileData(logDate,logLine);
                if(fileResult == "FileNotFound"){
                    layer.msg('未找到该日志文件！')
            	}else if(fileResult == "fileTooBig"){
            		layer.msg('日志文件超过了30M，请直接下载文件查看！')
            	}else if(fileResult == "error"){
            		layer.msg('服务器错误！')
            	}else if(fileResult == "ok"){
                    readLog(logDate,logLine);
            	}

            },

        };

    function getFileData(logDate,logLine){
        var urlStr = "../../log/getFileData?logDate="+logDate+"&logLine="+logLine;
        var resultObj = "";
    	$.ajax({
            url : urlStr,
            type : "GET",
            dataType : "json",
            async:false,
            success : function(result) {
            	resultObj = result;
            },
            error:function(msg){
                layer.msg('服务出错了');
            }
        })
        return resultObj;
    }
    function readLog(logDate,logLine){
    	$.ajax({
            url : "../../log/readLog?logDate="+logDate+"&logLine="+logLine,
            type : "GET",
            dataType : "json",
            success : function(result) {
                // 进行处理
    			var arr = result.split(";");
                var content = "";
                for (var i = 0; i < arr.length-1; i++) {

                	var rowStart = arr[i].indexOf(logDate);
                	var errorRowStart = arr[i].indexOf("Caused by");
                	if(rowStart == 0 || errorRowStart == 0){
                	   //rowStart == 0表示strCode是以logDate这个日期开头
            			content = content + '<p><span>'+arr[i]+'</span></p>';
                	}else{
            			content = content + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>'+arr[i]+'</span></p>';
                	}
    			}
                document.getElementById("logContent").innerHTML =content;
            },
            error:function(msg){
                layer.msg('服务出错了');
            }
        })
    }

    //操作命令赋值
    $('.search-form .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });


});

