layui.use(['layer','form','laydate','rate','table'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;
    var layer = layui.layer
    ,$ = layui.$;

    function GetQueryString(name) {
        var reg = new RegExp(("(^|&)"+name+"=([^&]*)(&|$)"));
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);return null;
    }

    var contractId = GetQueryString('contractId');
    var personInfoId = GetQueryString('personInfoId');

        // 数据表格
      //展示已知数据
    	table.render({
            elem: "#contractmen-table-operate"
            ,url : "../../contractmen/findContractTableByContractId?contractId="+contractId+"&personInfoId="+personInfoId
            ,cols: [[ //标题栏
               {type:'checkbox'},
              {field:'protocolTitle', title: '协议标题'},
              {field:'protocolType', title: '协议类型'},
              {field:'contractOrgName', title: '创建机构'},
              {field:'isABParty', title: '甲方或乙方'},
              {field:'contractDate', title: '创建时间'},
              {title: '操作',align:'center', fixed: 'right',  toolbar: '#test-table-operate-barDemo'}
            ]]
            ,skin: 'line' //表格风格
            ,even: true
            ,page: true //是否显示分页
            ,limits: [10, 20, 50]
            ,limit: 10 //每页默认显示的数量
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
            location.href="contractmenText.html?contractTextId="+data.contractTextId+"&detailsImgId="+data.detailsImgId+"&contractId="+data.contractId;
        }
    });

    //操作命令赋值
    $('.search-form .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});