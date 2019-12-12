$(function() {
    var healthfileNo = getParam("healthfileNo");
    var type = getParam("type");
    var id = getParam("id");
    $("#healthfileNo").val(healthfileNo);
    $(".maindbody").css("height", window.screen.height-30);
    $(".pframe").css("height", window.screen.height - 15);
    initData(type,healthfileNo,id);
    layui.use('form', function() {
        var form = layui.form;
        form.render();
    });
});

function initData(type,healthfileNo,id){
    layui.use('layer', function(){ //独立版的layer无需执行这一句
          var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
          //var index = layer.load(1, {time: 10*1000}); //又换了种风格，并且设定最长等待10秒
          var index = layer.open({
              type: 1
              ,title: false //不显示标题栏
              ,closeBtn: false
              ,area: '300px;'
              ,shade: 0.8,
              offset: 'auto'
              ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
              ,btnAlign: 'c'
              ,moveType: 1 //拖拽模式，0或者1
              ,time:2000
              ,content: '<div style="padding: 40px; line-height: 22px; background-color: #007d70; color: #fff; font-weight: 300;"><i class="layui-icon layui-anim layui-anim-rotate layui-anim-loop"' +
                  ' style="font-size: 30px; color: #FFF;">&#xe63d;</i>&nbsp;数据正在玩命的加载中...</div>'
              ,success: function(layero){
                jumpDetail(type,healthfileNo,id);
                layer.close(index);
              }
            });
        });
}


function jumpDetail(type,healthfileNo,id){
    if(type=="EXAM"){
        addTab(id, "健康体检", "../heRecord/jumpExam?id=" + id + "&", "");
    }
    if(type == "HEALTHFILE"){
        addTab(healthfileNo, "健康档案", "../healthfile/jumpEditHealthfile?", "");
    }
    if(type == "DIABETEINFO"){
        addTab("DIABETEINFO", "糖尿病专项档案", "../ehrDiabete/jumpDiabeteInfo?", "");
    }
    if(type=="HYPERINFO"){
        addTab("HYPERINFO", "高血压专项档案", "../hypertension/jumpAddHypertensionInfo?", "");
    }
}

function getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); // 固定写法
    if (r != null)
        return unescape(r[2]);
    return null;
}

function addTab(id, name, url, type) {
    var healthfileNo = $("#healthfileNo").val();
    if (type == "HYPER" || type == "DIAGE" || type == "HERECORD") {
        url = url + "healthfileNo=" + healthfileNo + "&type=" + type;
    } else {
        url = url + "healthfileNo=" + healthfileNo;
    }
    var contentDiv = ' <div class="layui-tab-item  layui-show">'
            + '                            <iframe class="pframe"'
            + '                                src="' + url
            + '"   frameborder="0"></iframe>'
            + '                        </div>';

    layui.use('element', function() {
        var element = layui.element;
        var isData = false;
        $.each($(".layui-tab-title li[lay-id]"), function() {
            if ($(this).attr("lay-id") == id) {
                isData = true;
            }
        })
        if (!isData) {
            element.tabAdd('menuTab', {
                title : name,
                content : contentDiv,
                id : id
            });
        }
        element.tabChange('menuTab', id);
    });
    $(".pframe").css("height", window.screen.height - 80);
}
