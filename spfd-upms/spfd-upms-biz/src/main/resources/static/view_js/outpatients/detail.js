layui.use(['form', 'layedit', 'laydate','laytpl','table','laypage'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,laytpl = layui.laytpl
  ,table = layui.table
  ,laypage = layui.laypage
  ,$ = layui.$;
  var testDataId= "";//打印门诊记录id

  //总数
  var total = 0;

    // 获取url指定参数值
    function GetQueryString(name) {
        var reg = new RegExp(("(^|&)"+name+"=([^&]*)(&|$)"));
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);return null;
    }

    function printMzxx(){
    	$(".print_Mzxx").click(function(){

    		testDataId=$(this).attr("mz_id");
    		//var printInfo1 = $("#tablehtml").html();
    		reqdata(3,"0","#print_testdataTpl");
        });
    }

    // 页面初始化需要用到 请求数据
    function reqdata(limit,flag,table_id){
    	if(flag!="0"){//打印页面显示标志
    		flag = 1;
    	}
    	if(typeof table_id == 'undefined' || table_id==''){
    		table_id = '#testdataTpl';//print_testdataTpl
    	}
        var id = GetQueryString('personId');
        var index = layer.load();
        $.ajax({
            url : '../../outpatients/oppersonPageList',
            type : "GET",
            data : {"personId":id},
            dataType : "json",
            success : function(result) {
            	total = result.count;
                // 进行处理
            	//执行一个laypage实例
            	if(typeof limit == 'undefined' || limit==''){
            		limit = total;
            	}
                laypage.render({
                    elem: 'page_div' //注意，这里的 test1 是 ID，不用加 # 号
                    ,count: total //数据总数，从服务端得到
                    ,limit: limit //每页默认显示的数量
                    ,jump: function(obj, first){
                        //obj包含了当前分页的所有参数
                        //first（是否首次，一般用于初始加载的判断）
                    	var resultrows = result.data[0];

                    	resultrows.flag = flag;
                        // 进行处理
                        htmlTpl(resultrows, "#personTpl", '#tablehtml', function(){
                            layer.close(index);
                            form.render();
                        })

                        // layer.msg('当前页'+obj.curr+' , 每页显示的条数 '+obj.limit);//得到每页显示的条数
                        var index = layer.load();
                        $.ajax({
                            url : '../../outpatients/oppersonPageList',
                            type : "GET",
                            data : {personId:id,page:obj.curr,limit:obj.limit},
                            dataType : "json",
                            success : function(result) {
                            	result.flag = flag;
                                htmlTpl(result, table_id, '#optestdata', function(){
                                    layer.close(index);
                                    form.render();
                                })
                                layer.close(index);
                                printMzxx();
                                if(table_id == '#print_testdataTpl'){//需要打印门诊详情
                                	var htmlStr = "";
                                	var printInfo1 = $("#tablehtml").prop("outerHTML");
                                	var printInfo2 = $("[mzid_div='"+testDataId+"']").prop("outerHTML");
                                	printInfo2 = "<hr style='background-color: #20222a;'/><div class='bodytable'>"+printInfo2+"</div>";
                            		htmlStr += printInfo1+printInfo2;
                            		//htmlStr = htmlStr+"<span style='float:right;font-family:宋体;'>打印时间："+getNowFormatDate()+"</span></div>";//时间
                            		htmlStr = "<body>"+htmlStr+"</body>";
                            		var oldstr = document.body.innerHTML;
                            		window.document.body.innerHTML=htmlStr;
                            		$("[mz_id='"+testDataId+"']").css("display","none");
                            		$(".title_mzxx").css({"text-align":"center", "font-size": "16px",
                            	    "font-weight": "bolder"});
                            		var css=$("td").css('font-size');
                            		$("td").css("font-size","12px");

                            		var height=$("#result_td").height();
                            		$("#result_div").css("margin-top",(height/2-10)+"px");
                            		window.print();
                            	    window.document.body.innerHTML=oldstr;

                            	    /*LODOP=getLodop();
                            	    LODOP.PRINT_INIT("心电图");
                            	    LODOP.ADD_PRINT_HTM(0,0,"100%", "100%",htmlStr);
                            	    LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");//2：横向打印
                            	    LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);//横向时正面预览
                            		LODOP.PREVIEW();*/

                            	    reqdata(3,"1");
                            	    printMzxx();
                                }
                            },
                            error:function(msg){
                                layer.msg('未连到服务器');
                                layer.close(index);
                            }
                        })
                    }
                });
            },
            error:function(msg){
                layer.msg('未连到服务器')
                layer.close(index);
            }
        });

    }
    reqdata(3,"1","");

});

/**
 * 填充数据
 * @param data
 */
function paddingData(data){

}

function htmlTpl(data, getid, toid, fun) {
  layui.use('laytpl', function(){
    var $=layui.$;
    var laytpl = layui.laytpl;
    var getTpl = $(getid).html();
    laytpl(getTpl).render(data, function(html){
      $(toid).html(html);
      if (typeof fun == 'function') {
        fun();
      }
    });
  });
}
function ischecked(data,val){
    return data==val?'checked':'';
}
function ischeckbox(data,val){
    var arr=data.split(',');
    for (var i = 0; i < arr.length; i++) {
        if(arr[i]==val){
            return 'checked';
        }
    }
    return '';
}
function isundefined(val){
    if (typeof val == 'undefined') {
        return '';
    }
    if(val == "" || val == null || val == undefined){
        return '';
    }
    return val;
}

function istestdataval(val){
    if (typeof val == 'undefined') {
        return '-？-';
    }
    if(val == "" || val == null || val == undefined){
        return '-？-';
    }
    return val;
}
//血糖类型判断
function xtlx(val){
	if (typeof val == 'undefined') {
		return '-？-';
	  }
	if(val == "" || val == null || val == undefined){
        return '-？-';
    }
	if(val == 0){
		return "空腹血糖";
	}
	if(val == 1){
		return "餐后血糖";
	}
}