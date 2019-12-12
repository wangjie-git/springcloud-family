layui.use(['form','laydate','rate','table'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;

    // 时间选择器
    laydate.render({
        elem: '#lasttestDate'
        ,range: true
    });

      // 数据表格
    //展示已知数据
    table.render({
      elem: "#oppatients-table-operate"
      ,url : "../../outpatients/outpatientsList"
      ,cols: [[ //标题栏
        {field:'name', title: '姓名'},
        {field:'sexName', title: '性别'},
        {field:'cardNo', title: '身份证号码 '},
        {field:'phoneNumber', title: '电话号码'},
        {field:'createOrgName', title: '机构'},
        {field:'createDorName', title: '接诊医生'},
        {field:'lasttestDate', title: '最后测量时间'},
        {field:'datafrom', title: '数据来源'},
        {title: '操作',align:'center', fixed: 'right',  toolbar: '#oppatients-table-operate-barDemo'}
      ]]
      ,skin: 'line' //表格风格
      ,even: true
      ,page: true //是否显示分页
      ,limits: [10, 20, 50]
      ,limit: 10 //每页默认显示的数量,
    });

    //监听工具条
    table.on('tool(oppatients-table-operate)', function(obj){
        var data = obj.data;
        if(obj.event === 'detail'){
            //location.href="detail.html?personId="+data.personId;
          location.href="../../outpatients/oppersonPageListByRequestJsp?personId="
            + data.personId+"&page=1&limit=1";
          //window.open("../../outpatients/oppersonPageListByRequestJsp?personId=" + data.personId);
        }
        if(obj.event === 'mergeRepo'){//点击合并报告
          layer.open({
                type: 2,//类型
                area: ['85%', '72%'],//定义宽和高
                title: '体检记录',//题目
                shadeClose: false,//点击遮罩层关闭
                btn: ['合并体检报告'],
                yes: function(index, layero){
                  var childObj = layero.find("iframe")[0].contentWindow;//获取子类页面
                  var checkStatus = childObj.layui.table.checkStatus('op_historyInfo_table').data;
                  if(checkStatus.length < 2){
                    layer.msg('请选择最少2条体检记录进行合并操作！');
                    return;
                  }
                  var healthIds = "";
                  for (var i = 0; i < checkStatus.length; i++) {
                    healthIds = healthIds+checkStatus[i].healthId+",";
                }
                  if(healthIds.length > 0){
                    healthIds = healthIds.substring(0, healthIds.length);
                  }
                  //location.href = "../../outpatients/mergePrintExaminationReport?mergeid=" + healthIds;
                  window.parent.open_new_tab("../outpatients/mergePrintExaminationReport?mergeid=" + healthIds, "合并报告");
                },
                content: "ophistory.html?personId="+data.personId,//打开的内容
                success: function(layero, index) {

                },
            });
        }
    });

    /**
     * 页面操作动作
     */
    var $ = layui.$, active = {
        reload: function(){
                // 执行重载
                table.reload('oppatients-table-operate', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where: {
                      personName: $("#personName").val(),
                      sex: $("#sex").val(),
                      phoneNumber: $("#phoneNumber").val(),
                      cardNo: $("#cardNo").val(),
                      datafrom: $("#datafrom").val(),
                      orgid: $("#orgid").val(),
                      dorName: $("#dorName").val(),
                      lasttestDate: $("#lasttestDate").val(),
                    }
                });
            },
        };

    //操作命令赋值
    $('.search-form .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});