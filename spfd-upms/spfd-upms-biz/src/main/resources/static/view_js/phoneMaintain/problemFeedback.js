layui.use(['form','laydate','rate','table'], function(){
    var form = layui.form;
    var laydate = layui.laydate;
    var rate = layui.rate;
    var table = layui.table;
    var $ = layui.$;
	  //展示已知数据
    	table.render({
    	    elem: "#problemFeedback_table"
    	    ,url : "../../phone/findProblemFeedback"
    	    ,cols: [[ //标题栏
    	      {type:'radio'},
    	      {field:'feedbackPersonName', title: '姓名', align: "center"},
    	      {field:'feedbackFromAreaName', title: '所属区域', align: "center"},
    	      {field:'feedbackFromOrgName', title: '所属机构', align: "center"},
    	      {field:'linkWay',title:'联系电话', align: "center"},
    	      {field:'feedbackTime', title: '反馈时间', align: "center"},
              {title: '操作',align:'center', fixed: 'right',  toolbar: '#test-table-team-barDemo'}
    	    ]]
    	    ,skin: 'line' //表格风格
    	    ,even: true
    	    ,page: true //是否显示分页
    	    ,limits: [10, 20, 50]
    	    ,limit: 10 //每页默认显示的数量
    	});

    //监听工具条
    table.on('tool(problemFeedback_table)', function(obj){
    	var data = obj.data;
    	var imgUrlsArray = [];
    	if(data.imgiIds!=null && data.imgiIds!=""){
    		var imgids=data.imgiIds.split(",");
        	for (var i = 0; i < imgids.length; i++) {
    			var url = "../../appFileUpload/downloadFile?fileName="+imgids[i]+"&rRange=0-";
    			/*imgUrlsArray[0] = {
    					url: url
    			}*/
    			imgUrlsArray.push(url);
    		}
    	}
    	data.imgUrls = imgUrlsArray;
    	htmlTpl(data, '#model_problemFeedbackContent', '#problemFeedbackContent', function(){
            form.render();
        })
        $('blockquote').css("height","auto");
        /*var a = 0.8*$(window).height()-300;
        var b = 0.6*$(window).width()-390;*/
        if(obj.event === 'detail'){
        	var that = this;
            //多窗口模式，层叠置顶
            layer.open({
              type: 1 //此处以iframe举例
              ,closeBtn: 1
              ,title: data.feedbackPersonName+"：     "+data.feedbackTime
              ,area: ["550px", "360px"]
              ,shade: 0.5 //透明度
              ,maxmin: true
              /*,offset: [
                50,
                450
              ]*/
              ,content: $('#problemFeedbackContent')
              ,btn: ['关闭'] //只是为了演示
              ,yes: function(){
            	  layer.closeAll();
              }
              ,zIndex: layer.zIndex //重点1
              ,success: function(layero){
                layer.setTop(layero); //重点2
                $(".content_img").on("click", function(){
                	//$(this).css("width","auto");
                	var url = $(this).attr("src");
                	layer.open({
                	      type: 1,
                	      title: false,
                	      closeBtn: 0,
                	      shadeClose: true,
                	      area: ['auto', 'auto'], //宽高
                	      content: "<img hidden='' src=" + url + " />",
                	      zIndex: layer.zIndex, //重点1
                	      success: function(layero){
                	    	  layer.setTop(layero); //重点2
                	      }
                	   });


            	});
              }
            });
        }
    });
    /**
     * 页面操作动作
     */
    var $ = layui.$, active = {
    		reload: function(){
                // 执行重载
                table.reload('problemFeedback_table', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                    ,where: {
                    	orgId: $("#orgId").val(),
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
function isundefined(val){
    if (typeof val == 'undefined') {
        return '';
    }
    return val;
}
