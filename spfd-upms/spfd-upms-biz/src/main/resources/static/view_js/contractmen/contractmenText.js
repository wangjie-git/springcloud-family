
var contractId = "";
layui.use(['layer','form', 'layedit', 'laydate','laytpl','table'], function(){
    var form = layui.form
        ,layer = layui.layer
        ,layedit = layui.layedit
        ,laydate = layui.laydate
        ,laytpl = layui.laytpl
        ,table = layui.table
        ,$ = layui.$;

    // 页面初始化需要用到 请求数据
    function reqdata(){
        var contractTextId = GetQueryString('contractTextId');
        var personInfoId = GetQueryString('personInfoId');
        contractId =  GetQueryString('contractId');
        var backToTable =  $('#backToTable');
        backToTable.attr("href","../contractmen/contractmenTable.html?contractId="+contractId+"&personInfoId="+personInfoId);
        if(contractTextId!=null){
            var index = layer.load();
            $.ajax({
                url : "../../contractmen/findContractPersonTextById",
                type : "GET",
                data : {"contractTextId":contractTextId},
                dataType : "json",
                success : function(result) {
                    $("#contractText").html(result.text);
                    loadHeartImage(result);
                    layer.close(index);
                },
                error:function(msg){
                    layer.msg('未连到服务器')
                    layer.close(index);
                }
            })
        }else{
            var result=[];
            htmlTpl(result, '#contractmenTpl', '#contractmendetails', function(){
                form.render();
            })
        }
    }
    reqdata();
    loadHeartImage();

});

// 获取url指定参数值
function GetQueryString(name) {
    var reg = new RegExp(("(^|&)"+name+"=([^&]*)(&|$)"));
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);return null;
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

var LODOP = getLodop(); //声明为全局变量

function prn1_preview() {
    CreateOneFormPage();
    LODOP.PREVIEW();
       if(LODOP!= "undefined" && LODOP!=null ){
           msg("", "success");
       }else{
           msg("", "error");
       }
};
function prn1_print() {
   CreateOneFormPage();
   LODOP.PRINT();
   if(LODOP!= "undefined" && LODOP!=null ){
       msg("", "success");
   }else{
       msg("", "error");
   }

};

function prn1_printA() {
CreateOneFormPage();
LODOP.PRINTA();
};
function CreateOneFormPage(){

    var strFormHtml = "<body>" + $("#contractText").html() + "</body>";
    var intWidth = $("#contractText").width();
    var intHeight = $("#contractText").height();

    LODOP=getLodop();
    LODOP.ADD_PRINT_HTM(40, 30,intWidth,900, strFormHtml);

    $("#headHtml").html("");//清除头部

    //--右下角加个页号对象：
    var footFize="打印时间：" + getNowFormatDate() + "   ";
    LODOP.ADD_PRINT_TEXT(588,503,265,52,footFize + "第   #  /  &  页");
    LODOP.SET_PRINT_STYLEA(0,"ItemType",2);
    LODOP.SET_PRINT_STYLEA(0,"Horient",1);
    LODOP.SET_PRINT_STYLEA(0,"Vorient",1);



    //LODOP.SET_PRINT_STYLEA(2,"AngleOfPageInside",-90);


    /* LODOP.SET_PRINT_STYLEA(1, "ItemType", 1);
    LODOP.SET_PRINT_STYLEA(1, "FontSize", 14);
    LODOP.SET_PRINT_STYLEA(1, "Bold", 1);
    LODOP.ADD_PRINT_TEXT('830','760','200','22', "第#页/共&页"); */
};

function prn2_print() {
    CreateTwoFormPage();
    LODOP.PREVIEW();
}

function prn3_view(){
    CreateOneFormPage();
    LODOP.PREVIEW();
	/*LODOP=getLodop();
	LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_全页");
	LODOP.ADD_PRINT_HTM(0,0,"100%","100%",document.documentElement.innerHTML);
	LODOP.PREVIEW();*/
}

function CreateTwoFormPage(){
    var strStyleCSS=" <link href='<%=basePath%>public/bootstrap/css/bootstrap.min.css' rel='stylesheet'>"
    + "<link href='../../public/bootstrap/font-awesome/css/font-awesome.min.css' rel='stylesheet'>"
    + "<link href='../../public/css/AdminLTE.min.css' rel='stylesheet'>"
    + "<link href='../../public/css/skins/_all-skins.min.css' rel='stylesheet'>"
    + "<link href='../../public/bootstrap/plugins/table/dist/bootstrap-table.min.css' rel='stylesheet'>"
    + "<link href='../../public/css/my.css' rel='stylesheet'>";
    var strFormHtml = strStyleCSS + "<body>" + $("#table3").html() + "</body>";
    var intWidth = $("#table3").width()/2;
    var intHeight = $("#table3").height();
    //LODOP=getLodop();
    LODOP.ADD_PRINT_HTM(10, 0, intWidth, intHeight,
            strFormHtml);
}

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
    /* var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds(); */
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function loadHeartImage() {
	var detailsImgId = GetQueryString('detailsImgId');
    var local = window.location.host;

    var url = "http://"+local+"/gpgp-web/appFileUpload/downloadFile?rRange=0-" + "&fileName=" + detailsImgId ;
    /* var url = "../data/downRoutineUrineImage?dataId=" + dataId + "&gs=" + gs +"&dl=12&zy=" + ddlX +"&bxzs=" +ddlSpeed; */
    $("#JFSIGNATURE").attr("src",url);
}
