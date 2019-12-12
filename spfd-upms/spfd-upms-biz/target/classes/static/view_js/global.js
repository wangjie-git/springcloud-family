/*document.write("<script language=javascript src='/gpgp-web/public/view_js/console.js'></script>");*/
$(window).load(function() {
	//var token = document.cookie.split(";")[0].split("=")[1];
	var token;
	var cookies = document.cookie.split(";");
	for(var i=0 ; i<cookies.length ;i++){
        var cookieshear = cookies[i].split("=");
        if(cookieshear[0].indexOf("token") != -1){
            token = cookieshear[1];
		}
	}
	localStorage.setItem("token", token);
	$.ajax({
	    headers: {
	        //Bearer是我的项目需要的,你可以按你的需求规范格式
	        'Authorization': 'Bearer ' + token
	    },
	    //(async默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
	    async: false,
	    type: 'GET',
	    dataType: "json",
	    url:"menu",
	    data: {},
	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	    //错误访问所需执行的操作
	    },
	    success: function(data) {
	    //正确访问所需执行的操作
	    	 if (data instanceof Object) {
                 var moduleHTML = "";
                 var modules = data.data;
                 if(modules instanceof Array){
                	 for (var i in modules) {
                      	  if( i <= (modules.length-1)){
                          	  var modulename = modules[i].title;
                                moduleHTML += '<li data-name="'+modules[i].id+'" class="layui-nav-item">'
                                            + '<a href="javascript:;" lay-href="../'+ modules[i].path +'" lay-tips="' + modulename + '" lay-direction="2">'
                                            + '<i class="layui-icon layui-icon-template"></i><cite style="font-size: 18px;font-weight:  bold;">' + modulename + '</cite>';
                                moduleHTML += '</a>';
                                if (modules[i].children != null && modules[i].children.length > 0) {
                                    moduleHTML += ' <dl class="layui-nav-child">';
                                    var children = modules[i].children;
                                    for (var j in children) {
                                  	  if(j<=(children.length-1)){
                                  		  moduleHTML += '<dd data-name="' + children[j].id + '">';
                                  		  moduleHTML += '<a lay-href="../' + children[j].path + '">'+ children[j].title + '</a></dd>';
                                  	  }
                                    }
                                    moduleHTML += '</dl>';
                                }
                            }
                        }
                        $("#LAY-system-side-menu").html(moduleHTML);
                        layui.use('element', function() {
                            var element = layui.element;
                            element.init();
                        });
                 }
             }
	    }
	});
		  //加载菜单
        /*  $.get('menu/getUserMenu',{},function(data,status){
              if (status == "success") {
                 
              }
          });*//*
          var userName = localStorage.getItem("userName");
          var orgName = localStorage.getItem("orgName");
          if(userName==null || orgName==null){*/
        /*      $.get('../user/getCurrUser',{},function(data){
            	  localStorage.setItem("userName",data.userName);
            	  localStorage.setItem("orgName",data.orgName)
            	  $("#orgName").text(data.orgName);
            	  $("#userName").text(data.userName);

            	  var strTime = '';
            	  now = new Date(),hour = now.getHours()
            	  if(hour < 6){strTime=",凌晨好！"}
            	  else if (hour < 9){strTime=",早上好！"}
            	  else if (hour < 12){strTime=",上午好！"}
            	  else if (hour < 14){strTime=",中午好！"}
            	  else if (hour < 17){strTime=",下午好！"}
            	  else if (hour < 19){strTime=",傍晚好！"}
            	  else if (hour < 22){strTime=",晚上好！"}
            	  else {strTime="午夜好！"}
            	  $("#home_welcome_empName").text(data.empName+strTime);
          		  $("#home_lastLoginTime").text(data.lastLogin);
          		  $("#home_orgName").text(data.orgName);
          		  var teaminfoList = data.teaminfo;
          		  var strTeam = "";
          		  teaminfoList.forEach(function(ele,index){
          			strTeam+=ele.teamname+"、";
          		  });
          		  strTeam=(strTeam.substring(strTeam.length-1)=='、')?strTeam.substring(0,strTeam.length-1):strTeam;
          		  $("#home_teamInfo").text(strTeam);
              })
              $.get('../user/getAppVersion',{},function(data){
          		  $("#home_version").text(data.versionInfo);
              })*/
          /*}else{
        	  $("#orgName").text(orgName);
        	  $("#userName").text(userName);
          }*/
	});