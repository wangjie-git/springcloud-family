layui.define(
    function(e) {
        var i = (layui.$, layui.layer, layui.laytpl, layui.setter, layui.view, layui.admin);
        i.events.logout = function() {
            i.req({
                url: layui.setter.base + "json/user/logout.js",
                type: "get",
                data: {},
                done: function(e) {
                    i.exit(function() {
                        location.href = "user/login.html"
                    })
                }
            })
        }


layui.use(['form', 'layedit', 'laydate','laytpl','table'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,laytpl = layui.laytpl
  ,table = layui.table
  ,$ = layui.$;
  //日期
  laydate.render({
    elem: '#bday'
  });


 
  //自定义验证规则
  form.verify({
    title: function(value){
      if(value.length < 5){
        return '标题至少得5个字符啊';
      }
    }
    ,pass: [/(.+){6,12}$/, '密码必须6到12位']
    ,content: function(value){
      layedit.sync(editIndex);
    }
  });
  
  //监听指定开关
  form.on('switch(switchTest)', function(data){
    layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
      offset: '6px'
    });
    layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
  });
  
  //监听提交
  form.on('submit(demo1)', function(data){
    layer.alert(JSON.stringify(data.field), {
      title: '最终的提交信息'
    })
    return false;
  });
  
  
  function tabledata(){
    //展示已知数据
    table.render({
      elem: '#demo'
      ,cols: [[ //标题栏
        {field: 'id', title: 'ID', width: 80, sort: true}
        ,{field: 'username', title: '用户名', width: 120}
        ,{field: 'email', title: '邮箱', minWidth: 150}
        ,{field: 'sign', title: '签名', minWidth: 160}
        ,{field: 'sex', title: '性别', width: 80}
        ,{field: 'city', title: '城市', width: 100}
        ,{field: 'experience', title: '积分', width: 80, sort: true}
      ]]
      ,data: [{
        "id": "10001"
        ,"username": "杜甫"
        ,"email": "xianxin@layui.com"
        ,"sex": "男"
        ,"city": "浙江杭州"
        ,"sign": "人生恰似一场修行"
        ,"experience": "116"
        ,"ip": "192.168.0.8"
        ,"logins": "108"
        ,"joinTime": "2016-10-14"
      }, {
        "id": "10002"
        ,"username": "李白"
        ,"email": "xianxin@layui.com"
        ,"sex": "男"
        ,"city": "浙江杭州"
        ,"sign": "人生恰似一场修行"
        ,"experience": "12"
        ,"ip": "192.168.0.8"
        ,"logins": "106"
        ,"joinTime": "2016-10-14"
        ,"LAY_CHECKED": true
      }, {
        "id": "10003"
        ,"username": "王勃"
        ,"email": "xianxin@layui.com"
        ,"sex": "男"
        ,"city": "浙江杭州"
        ,"sign": "人生恰似一场修行"
        ,"experience": "65"
        ,"ip": "192.168.0.8"
        ,"logins": "106"
        ,"joinTime": "2016-10-14"
      }, {
        "id": "10004"
        ,"username": "贤心"
        ,"email": "xianxin@layui.com"
        ,"sex": "男"
        ,"city": "浙江杭州"
        ,"sign": "人生恰似一场修行"
        ,"experience": "666"
        ,"ip": "192.168.0.8"
        ,"logins": "106"
        ,"joinTime": "2016-10-14"
      }, {
        "id": "10005"
        ,"username": "贤心"
        ,"email": "xianxin@layui.com"
        ,"sex": "男"
        ,"city": "浙江杭州"
        ,"sign": "人生恰似一场修行"
        ,"experience": "86"
        ,"ip": "192.168.0.8"
        ,"logins": "106"
        ,"joinTime": "2016-10-14"
      }, {
        "id": "10006"
        ,"username": "贤心"
        ,"email": "xianxin@layui.com"
        ,"sex": "男"
        ,"city": "浙江杭州"
        ,"sign": "人生恰似一场修行"
        ,"experience": "12"
        ,"ip": "192.168.0.8"
        ,"logins": "106"
        ,"joinTime": "2016-10-14"
      }, {
        "id": "10007"
        ,"username": "贤心"
        ,"email": "xianxin@layui.com"
        ,"sex": "男"
        ,"city": "浙江杭州"
        ,"sign": "人生恰似一场修行"
        ,"experience": "16"
        ,"ip": "192.168.0.8"
        ,"logins": "106"
        ,"joinTime": "2016-10-14"
      }, {
        "id": "10008"
        ,"username": "贤心"
        ,"email": "xianxin@layui.com"
        ,"sex": "男"
        ,"city": "浙江杭州"
        ,"sign": "人生恰似一场修行"
        ,"experience": "106"
        ,"ip": "192.168.0.8"
        ,"logins": "106"
        ,"joinTime": "2016-10-14"
      }]
      //,skin: 'line' //表格风格
      ,even: true
      //,page: true //是否显示分页
      //,limits: [5, 7, 10]
      //,limit: 5 //每页默认显示的数量
    });    
  }
  // 请求数据
  function reqdata(){
    $.ajax({
      url : "",
      type : "POST",
      data : {},
      dataType : "json",
      success : function(result) {
        // 进行处理
      },
      error:function(msg){
        layer.msg('未连到服务器')
      }
    }) 
  }
  layer.msg('table1')
});


        e("table1", {})
    }
);