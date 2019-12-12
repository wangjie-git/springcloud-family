var gs = '6 2 1R';
var zy = '10';
var bxzs = '25';
var imageType = '1';
layui.use(['form', 'layedit', 'laydate','laytpl','table','laypage'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,laytpl = layui.laytpl
  ,table = layui.table
  ,laypage = layui.laypage
  ,$ = layui.$;
  //$ = layui.jquery;
  var local = window.location.host;
  var dataId = GetQueryString("dataId");

    // 获取url指定参数值
    function GetQueryString(name) {
        var reg = new RegExp(("(^|&)"+name+"=([^&]*)(&|$)"));
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);return null;
    }

    var dlzy = "12";
    function loadHeartImage() {
        //zy = $("#zy").val();
        //bxzs = $("#bxzs").val();
        //imageType = $("#imageType").val();
        var dpiArra = js_getDPI();
    	var dpi = dpiArra[0];
    	var imgwidth = (dpi/2.54)*28.5;
        var url = "http://"+local+"/gpgp-web/outpatients/downHeartImage?time="+new Date().getTime()+"&dataId=" + dataId
        + "&gs=" + gs +"&dl=&zy=" + zy +"&bxzs=" +bxzs+"&imageType="+imageType;

    	$("#printInfo").parent().css({"width" : (imgwidth+286)+"px"});
    	$("#printInfo table:first").css({"width" : imgwidth+"px"});
    	$("#hearImage").css({"width" : imgwidth+"px"});
    	$("#hearImage").attr("src",url);
    }

    // 页面初始化需要用到 请求数据
    function reqdata(){
        var dataId = GetQueryString('dataId');
        var index = layer.load();

        $.ajax({
            url : '../../outpatients/findTestHeartImageInfo',
            type : "GET",
            data : {"dataId":dataId},
            dataType : "json",
            success : function(result) {
                htmlTpl(result, '#testdataTpl', '#imagehtml', function(){
                	loadHeartImage();
                    layer.close(index);
                    form.render();
                    bindEvent();
                })
                layer.close(index);
            },
            error:function(msg){
                layer.msg('未连到服务器');
                layer.close(index);
            }
        });
    }
    reqdata();
    form.on('select(select_change)', function(data){
    	var idName = data.elem.getAttribute("id");
    	switch (idName) {
		case 'zy':
			zy = data.value;
			break;
		case 'bxzs':
			bxzs = data.value;
			break;
		case 'imageType':
			imageType = data.value;
			break;

		default:
			break;
		}
		showHeartPictrue();
    });
    var LODOP=getLodop();
    function bindEvent(){
    	//1.打印心电图
        $("#printImgBtn").click(function() {
        	$("#zdjg_Td").hide();
        	var strStyleCSS="";
        	var width=$("#printInfo").width();
        	var height=$("#printInfo").height();
        	var styleStr = "<style type='text/css'>"+$("style").html()+"</style>";
        	var infoTitle = $("#infoTitle").text();
        	var htmlStr = strStyleCSS+styleStr+"<h4 style='margin-top:10px;font-family: 宋体;font-size:20px;font-weight:bold;' align='center'>12导联心电图检查报告</h4>";
        	var arr = new Array();
        	$("input:checkbox[name='printType']:checked").each(function(i){
        		arr[i] = $(this).val();
        	});
        	$("#idCard").css("display","none");
        	if(arr.length>0){
        		var printInfo = $("#printInfo").prop("outerHTML");
        		htmlStr = htmlStr+printInfo;
        		htmlStr = htmlStr +"<br/><div style='width:"+width+"px;'><span style='float:left;font-family:宋体;'>"+bxzs+"mm/s &nbsp;&nbsp;"+zy+"mm/mV &nbsp;&nbsp;0.67-150Hz &nbsp;&nbsp;AC &nbsp;&nbsp;50Hz</span>";//波形走速、增益......
        		htmlStr = htmlStr+"<span style='float:right;font-family:宋体;'>打印时间："+getNowFormatDate()+"</span></div>";//时间
        		htmlStr = "<body>"+htmlStr+"</body>";

        		var oldstr = document.body.innerHTML;
        		window.document.body.innerHTML=htmlStr;
        		window.print();
        	    window.document.body.innerHTML=oldstr;    //浏览器打印
        	    form.render();
        	    bindEvent();
        	}else{
        		 /**
        	     * 控件打印
        	     */
        	    $(".nbsp_").css({"margin-left":"15px"});
        		var dpiArra = js_getDPI();
        		var dpi = dpiArra[0];
        		var imgwidth = (dpi/2.54)*28.5;
        		$("#printInfo table:first").css({"width" : (imgwidth+1.5)+"px"});
        		var printText = $("#printText").html();
        		$("#printInfo table:first").css({"width" : imgwidth+"px"});
        		$(".nbsp_").css({"margin-left":"0px"});
        		var imgSrc = $("#hearImage").attr("src");
        		var imgStyle = $("#hearImage").attr("style");
        		LODOP=getLodop();
        	    LODOP.PRINT_INIT("心电图");
        	    LODOP.ADD_PRINT_HTM(0,0,"100%", "100%",htmlStr);
        	    LODOP.ADD_PRINT_HTM("8mm",0,"100%", "100%",styleStr+printText);
        	    //LODOP.SET_PRINT_STYLEA(0,"HtmWaitMilSecs",10000)
        	    LODOP.ADD_PRINT_IMAGE("55mm", "0mm", "100%", "100%", "<img id='hearImage' style='margin-top:-2px;margin-left:-2px;"+imgStyle+"' src='"+imgSrc+"'>");
        	    var htmlStr2 = "<div style='width:"+width+"px;'><span style='float:left;font-family:宋体;'>"+bxzs+"mm/s &nbsp;&nbsp;"+zy+"mm/mV &nbsp;&nbsp;0.67-150Hz &nbsp;&nbsp;AC &nbsp;&nbsp;50Hz</span>";//波形走速、增益......
        	    htmlStr2 = htmlStr2+"<span style='float:right;font-family:宋体;'>打印时间："+getNowFormatDate()+"<span></div>";//时间
        	    LODOP.ADD_PRINT_HTM("195mm",0,"100%", "100%",htmlStr2);
        		//LODOP.PRINT_DESIGN();
        	    LODOP.SET_PRINT_PAGESIZE(2, 0, 0, "A4");//2：横向打印
        	    LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);//横向时正面预览
        		LODOP.PREVIEW();
        	}
        	$("#idCard").removeAttr("style");
        	$("#zdjg_Td").show();
        });
        setPrintType();
    }
    //setPrintType();
    function setPrintType(){
    	var printType = localStorage.getItem("printType");
    	if(typeof(printType) != "undefined"&&printType == "2"){
    		var unitTypeCheckbox = $("input:checkbox[name='printType']");
    		if(unitTypeCheckbox.length == 0){
    			reqdata();
        	}
            for(var i=0;i<unitTypeCheckbox.length;i++){
                unitTypeCheckbox[i].value="1";
                unitTypeCheckbox[i].checked=true;
            }
    		form.render("checkbox");
    	}
    }
  //-----------------------------------
    function showHeartPictrue(){
    	//zy = $("#zy").val();
        //bxzs = $("#bxzs").val();
        //imageType = $("#imageType").val();
        if (typeof(imageType) == "undefined"){
        	imageType = "1";
        }
        var url = "http://"+local+"/gpgp-web/outpatients/downHeartImage?time="+new Date().getTime()+"&dataId=" + dataId
        + "&gs=" + gs +"&dl=&zy=" + zy +"&bxzs=" +bxzs+"&imageType="+imageType;
        $("#hearImage").attr("src",url);
    }

    form.on('checkbox(printType)', function(data){
    	if($(this).is(":checked")){
			localStorage.setItem("printType", "2");//设置打印方式缓存
		}else{
			localStorage.removeItem("printType");//删除缓存
		}
    });
	/*$('[data-toggle="tooltip"]').tooltip();*/
});

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var second = date.getSeconds();
    if(date.getSeconds()<10){
    	second = "0"+date.getSeconds();
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + second;
    return currentdate;
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
    return val;
}

function doubletransform(number){
    if (typeof number == 'undefined') {
        return '';
    }
    return new Number(number).toFixed(2);
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
function js_getDPI() {
	var arrDPI = new Array;
	if (window.screen.deviceXDPI) {
		arrDPI[0] = window.screen.deviceXDPI;
		arrDPI[1] = window.screen.deviceYDPI;
	}else {
		var tmpNode = document.createElement("DIV");
		tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
		document.body.appendChild(tmpNode);
		arrDPI[0] = parseInt(tmpNode.offsetWidth);
		arrDPI[1] = parseInt(tmpNode.offsetHeight);
		tmpNode.parentNode.removeChild(tmpNode);
	}
	return arrDPI;
}

