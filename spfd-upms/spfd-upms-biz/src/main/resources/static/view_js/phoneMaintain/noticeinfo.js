layui.use(['form', 'layedit', 'laydate','laytpl','table','tree'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,laytpl = layui.laytpl
  ,table = layui.table
  ,$ = layui.$;
  var tool = {tool: [
                     'strong' //加粗
                     ,'italic' //斜体
                     ,'underline' //下划线
                     ,'del' //删除线
                     ,'|' //分割线
                     ,'left' //左对齐
                     ,'center' //居中对齐
                     ,'right' //右对齐
                     ,'face' //表情
                     ,'help' //帮助
                   ]}
  var noticeId = GetQueryString("noticeId");
  var tree = layui.tree;
  var noticsTitle = window.localStorage.getItem('noticsTitle');
  var noticeType = window.localStorage.getItem('noticeType');
  var noticeTrget = window.localStorage.getItem('noticeTrget');
  var noticsContent = window.localStorage.getItem('noticsContent');
  var result = {
		  noticsTitle: noticsTitle,
		  noticeType: noticeType,
		  noticeTrget: noticeTrget
  };
  var layeditIndex;
  htmlTpl(result, '#noticeinfo_html', '#tablehtml', function(){
	  $("#noticeType").attr("disabled","disabled");
	  $("#noticeTrget").attr("disabled","disabled");
	  $("#noticeTrget").val(noticeTrget);
	  //var selDom = $("#noticeTrget");
	  //selDom.append("<option value='"+GetQueryString("noticeTrget")+"'>"+GetQueryString("noticeTrget")+"</option>");
      form.render();
  })
  layeditIndex = layedit.build('noticsinfoContent', tool); //建立编辑器
  table.render({
	    elem: "#person_table"
	    ,url : "../../phone/findNoticePushPerson"
	    ,where : {
	    	noticeId: noticeId
	    }
	    ,cols: [[ //标题栏
	      //{type:'radio'},
	      {field:'name', title: '姓名', align: "center"},
	      {field:'sex', title: '性别', align: "center"},
	      {field:'orgName',title:'所属机构', align: "center"},
	      {field:'status', title: '消息状态', align: "center", templet:'#status_html'},
	      {field:'statusUptime',title:'阅读时间', align: "center"},
	    ]]
	    ,skin: 'line' //表格风格
	    ,even: true
	    ,page: true //是否显示分页
	    ,limits: [10, 20, 50]
	    ,limit: 10 //每页默认显示的数量
	    ,done: function(res){
	    	if(res.data==null || res.data== 'null' || res.data.leagth<1){
	    		return;
	    	}
	    	var data = res.data[0];
	    	layedit.setContent(layeditIndex,noticsContent);//设置编辑器文本
	    }
	});

	// 获取url指定参数值
	function GetQueryString(name) {
		var reg = new RegExp(("(^|&)" + name + "=([^&]*)(&|$)"));
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			//return unescape(r[2]);
			return decodeURI(r[2]);//解决中文乱码
		return null;
	}
});
function htmlTpl2(data, getid, toid, fun) {
	  layui.use('laytpl', function(){
	    var $=layui.$;
	    var laytpl = layui.laytpl;
	    var getTpl = $(getid).html();
	    laytpl(getTpl).render(data, function(html){
	      var table = $(toid).html();
	      $(toid).html(table+html);
	      if (typeof fun == 'function') {
	        fun();
	      }
	    });
	  });
	}

function htmlTpl1(data, getid, toid, fun) {
  layui.use('laytpl', function(){
    var $=layui.$;
    var laytpl = layui.laytpl;
    var getTpl = $(getid).html();
    laytpl(getTpl).render(data, function(html){
      var table = $(toid).html();
      $(toid).html(html+table);
      if (typeof fun == 'function') {
        fun();
      }
    });
  });
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

function isSelected(data,val){
    return data==val?'selected=""':'';
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
  if (typeof val == 'undefined' || val==null) {
    return '';
  }
  return val;
}

function ischeckedToAvailable(data,val){
	if(typeof data == 'undefined' && val=="是"){
		return 'checked';
	}
    return data==val?'checked':'';
}