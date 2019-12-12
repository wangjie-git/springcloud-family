$(window).load(function() {
	$('.modal').attr("data-backdrop", "static")
	.attr("data-keyboard", false);
    $('.qdate').bind('click', function() {
    	var now = new Date();
        WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd',readOnly:true});
    });
    $('.qdate24').bind('click', function() {
    	$(this).attr("readonly", "readonly");
        WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',readOnly:true});
    });
    $(".qdatanow").each(function(index, obj) {
    	var now = new Date().format("yyyy-MM-dd");
		$(obj).val(now);
	});
    $(".qdate").each(function(){
		$(this).attr("readonly", "readonly");
		$(this).addClass("Wdate");
	});

    $('.qdate_lt_now').bind('click', function() {
    	var now = new Date().format("yyyy-MM-dd");
        WdatePicker({skin:'whyGreen',dateFmt:'yyyy-MM-dd',readOnly:true, maxDate:now});
    });
    //左侧菜单显示隐藏效果
    $("a[name='menu']").each(function() {
        $(this).click(function() {
            if($(this).next(".dropdown_l_2").is(":hidden")) {
                $(this).next(".dropdown_l_2").show();
                $(this).find("i").removeClass("fa-angle-right");
                $(this).find("i").addClass("fa-angle-down");
            }
            else {
                $(this).find("i").removeClass("fa-angle-down");
                $(this).find("i").addClass("fa-angle-right");
                $(this).next(".dropdown_l_2").hide();
            }
            $(this).next(".dropdown_l_2").find(".dropdown_l_3").hide();
            $(this).next(".dropdown_l_2").find("a[name='submenu']").find("i").removeClass("fa-angle-down");
            $(this).next(".dropdown_l_2").find("a[name='submenu']").find("i").addClass("fa-angle-right");
        });
   });

    $("a[name='submenu']").each(function() {
        $(this).click(function() {
            if($(this).next(".dropdown_l_3").is(":hidden")) {
                $(this).next(".dropdown_l_3").show();
                $(this).find("i").removeClass("fa-angle-right");
                $(this).find("i").addClass("fa-angle-down");
            }
            else {
                $(this).find("i").removeClass("fa-angle-down");
                $(this).find("i").addClass("fa-angle-right");
                $(this).next(".dropdown_l_3").hide();
            }

        });
   });

     $(".bartool").click(function() {
              $(".main-sidebar").toggle(0, function() {
                  if ($(".main-sidebar").is(":hidden")) {
                      $(".content-wrapper").css("margin-left","0px");
                      $(".bartool").css("margin-left","5px");
                  }
                  else {
                      $(".content-wrapper").css("margin-left","250px");
                      $(".bartool").css("margin-left","230px");
                  }
              });
           });

       //点击导航栏隐藏菜单项
          $(".sidebar-toggle").click(function() {
              $(".main-sidebar").toggle(0, function() {
                  if ($(".main-sidebar").is(":hidden")) {
                      $(".content-wrapper").css("margin-left","0px");
                      $(".bartool").css("margin-left","5px");
                  }
                  else {
                      $(".content-wrapper").css("margin-left","250px");
                      $(".bartool").css("margin-left","230px");
                  }
              });
           });

          //下拉菜单显示隐藏效果
          $(".dropdown-submenu").each(function() {
             var _this = $(this);
             _this.click(function() {
                 _this.find(".dropdown-menu").toggle();
                 _this.parent().find(".dropdown-submenu").each(function() {
                     if (_this.html() == $(this).html()){
                         return;
                     } else {
                         $(this).find(".dropdown-menu").hide();
                     }
                 });
             });
         });

          $.get('../appmodule/findCurrentUserAppModule',{},function(data,status){
              if (status == "success") {
                  if (data instanceof Array) {
                      var moduleHTML = "";
                      for (var i in data) {
                          moduleHTML += '<li class="dropdown m-b messages-menu">'
                                      + '<a class="dropdown-toggle" data-toggle="dropdown"  href="#" data-submenu>' + data[i].moduleName
                           if (data[i].children != null) {
                               moduleHTML += '<span class="caret"></span>';
                           }
                          moduleHTML += '</a>';
                          if (data[i].children != null) {
                              moduleHTML += ' <ul class="dropdown-menu">';
                              var children = data[i].children;
                              for (var j in children) {
                                  //<li><a href="<%=path %>orgnization/regionOrg" tabindex="2">区域管理</a></li>
                                  moduleHTML += '<li><a href="../' + children[j].url + '" tabindex="2">'
                                  + children[j].moduleName + '</a></li>';
                              }
                              moduleHTML += '</ul>';
                          }
                      }
                      //$("#module").html(moduleHTML);
                  } else {
                      location.href = "../login";
                  }
              }
          });
          loadEtconcepts();//加载字典
          loadEtconceptsIncludeNull();//包含空选项("")
          loadEtConceptsForCheckbox(); //加载字典，checkbox可以多选
          loadEtConceptsForRadio(); //加载字典，checkbox单选
          loadEtconceptById();//根据字典id查询字典

          ajaxSetUp();

});

function jumpHomepage() {
	location.href = "#";
}

function cellStyle(value, row, index) {
	return {
		classes : 'text-nowrap another-class',
	};
}

function ajaxSetUp() {
	/*$.ajaxSetup({
	    type: 'POST',
	    complete: function(xhr,status) {
	        var sessionStatus = xhr.getResponseHeader('sessionstatus');
	        if(sessionStatus == 'timeout') {
	            var top = getTopWinow();
	            var yes = confirm('由于您长时间没有操作, session已过期, 请重新登录.');
	            if (yes) {
	                top.location.href = '/skynk/index.html';
	            }
	        } else {
	        	//showModal('refresh');
	        }
	    }
	});*/

}
/**
 * 在页面中任何嵌套层次的窗口中获取顶层窗口
 * @return 当前页面的顶层窗口对象
 */
function getTopWinow(){
    var p = window;
    while(p != p.parent){
        p = p.parent;
    }
    return p;
}
function loadEtconceptById() {
	$("span[data-type='etconcept']").each(function() {
		var _this = $(this);
		var code = _this.attr("data-value");
		$.post("../etconcept/findEtConceptsByConceptId",{"id" : code},function(data, status) {
            if (status == "success") {
            	_this.text(data);
            }
        });
	});
}



/**
 *加载字典下拉框
 */
function loadEtconcepts() {
    //加载基本字典
    $("select[data-type='etconcept']").each(function() {
        var _this = $(this);
        var code = _this.attr("data-code");
        var id = _this.attr("id");
        var value = _this.attr("data-value");
        var option = "<option value=''>--请选择--</option>";//<option value=''>--请选择--</option>
        $.post("../etconcept/findEtConceptsByCode",{"code" : code},function(data, status) {
            if (status == "success") {
                for (var i = 0;i<data.length;i++){
                	if (data[i].id == value) {
                		option +=
                            "<option value=" + data[i].id + " selected=selected>" + data[i].conceptDesc + "</option>";
                	} else {
                		option +=
                            "<option value=" + data[i].id + ">" + data[i].conceptDesc + "</option>";
                	}

                }

                $("#" + id).html(option);
                var flag = isExitsFunction('initFormDatas');
                if (flag) {
                	initFormDatas();
                }
            }
        });
    });
}

function isExitsFunction(funcName) {
	  try {
		if (typeof(eval(funcName)) == "function") {
		  return true;
		}
	  } catch(e) {}
	  return false;
}

/**
 *加载字典下拉框
 */
function loadEtconceptsIncludeNull() {
    //加载基本字典
    $("select[data-type='etconceptIncludeNull']").each(function() {
        var _this = $(this);
        var code = _this.attr("data-code");
        var id = _this.attr("id");
        var option = "";
        $.post("../etconcept/findEtConceptsByCode",{"code" : code},function(data, status) {
            if (status == "success") {
                for (var i = 0;i<data.length;i++){
                    option +=
                        "<option value=" + data[i].id + ">" + data[i].conceptCode + " " + data[i].conceptDesc + "</option>";
                }
                option += "<option value='' selected='selected'></option>";
                $("#" + id).html(option);
            }
        });
    });
}


/**
 * 加载字典复选框(支持多选)
 */
/**
 * 加载字典复选框(支持多选)
 */
function loadEtConceptsForCheckbox() {
    $("div[data-type='etconcept']").each(function() {
        var _this = $(this);
        var code = _this.attr("data-code");
        var flag = _this.attr('data-init');
        var defaultValue= _this.attr('data-default');
        var show = _this.attr('data-show');
        var cut = _this.attr('data-cut');
        var name = _this.attr('data-name'); //方便处理表单数据
        var checkbox = "";
        $.post("../etconcept/findEtConceptsByCode",{"code" : code},function(data, status) {
            if (status == "success") {
                for (var i = 0;i<data.length;i++){
                    if (flag == "true") {
                        if (defaultValue == data[i].conceptCode) {
                            checkbox += "<input type='checkbox' checked='checked' onclick='cutboxs(this," + show + "," + cut + ")' data-type="+ code +" data-text= " + data[i].conceptDesc + " value=" + data[i].id + " data-conceptCode=" + data[i].conceptCode + " name= '" + name + "'>" + data[i].conceptCode + " " + data[i].conceptDesc + "&nbsp;&nbsp;";
                        }
                        else if(show == data[i].conceptCode){
                            checkbox += "<input type='checkbox' disabled='disabled' onclick='cutboxs(this," + show + "," + cut + ")' data-type="+ code + " data-text= " + data[i].conceptDesc + " value=" + data[i].id + " data-conceptCode=" + data[i].conceptCode + " name= '" + name + "'>" + data[i].conceptCode + " " + data[i].conceptDesc + "&nbsp;&nbsp;";
                        }
                        else {
                            checkbox += "<input type='checkbox' disabled='disabled'  data-type="+ code +" data-text= " + data[i].conceptDesc + " value=" + data[i].id + " data-conceptCode=" + data[i].conceptCode + " name= '" + name + "'>" + data[i].conceptCode + " " + data[i].conceptDesc + "&nbsp;&nbsp;";
                        }
                    }
                    else {
                        checkbox += "<input type='checkbox'   data-type="+ code +" data-text= " + data[i].conceptDesc + " value=" + data[i].id + " data-conceptCode=" + data[i].conceptCode + " name= '" + name + "'>" + data[i].conceptCode + " " + data[i].conceptDesc + "&nbsp;&nbsp;";
                    }
                }
                _this.html(checkbox);
            }
        });
    });
}
/*function loadEtConceptsForCheckbox() {
    $("div[data-type='etconcept']").each(function() {
        var _this = $(this);
        var code = _this.attr("data-code");
        var flag = _this.attr('data-init');
        var defaultValue = _this.attr('data-default');
        var show = _this.attr('data-show');
        var cut = _this.attr('data-cut');
        var name = _this.attr('data-name'); //方便处理表单数据
        var value; //编辑时处理
        if (_this.attr('data-value') != null
        		&& _this.attr('data-value') != "undefined") {
        	value = _this.attr('data-value').split(",");
        }
        var checkbox = "";
        $.post("../etconcept/findEtConceptsByCode",{"code" : code},function(data, status) {
            if (status == "success") {
                for (var i = 0;i<data.length;i++){
                    if (flag == "true") {
                        if (defaultValue == data[i].conceptCode) {
                            checkbox += "<input type='checkbox' checked='checked' onclick='cutboxs(this," + show + "," + cut + ")' data-type="+ code +" data-text= " + data[i].conceptDesc + " value=" + data[i].id + " data-conceptCode=" + data[i].conceptCode + " name= '" + name + "'>" + data[i].conceptCode + " " + data[i].conceptDesc + "&nbsp;&nbsp;";
                        }
                        else if(show == data[i].conceptCode){
                            checkbox += "<input type='checkbox' disabled='disabled' onclick='cutboxs(this," + show + "," + cut + ")' data-type="+ code + " data-text= " + data[i].conceptDesc + " value=" + data[i].id + " data-conceptCode=" + data[i].conceptCode + " name= '" + name + "'>" + data[i].conceptCode + " " + data[i].conceptDesc + "&nbsp;&nbsp;";
                        }
                        else {
                        	var t = true;
                        	if (value != null) {
                        		for (var j = 0;j< value.length;j++) {
                            		if (value[j] == data[i].id) {
                            			checkbox += "<input type='checkbox' checked='checked' data-type="+ code +" data-text= " + data[i].conceptDesc + " value=" + data[i].id + " data-conceptCode=" + data[i].conceptCode + " name= '" + name + "'>" + data[i].conceptCode + " " + data[i].conceptDesc + "&nbsp;&nbsp;";
                            			t = false;
                            		}
                            	}
                        	}
                        	if (t) {
                        		checkbox += "<input type='checkbox' data-type="+ code +" data-text= " + data[i].conceptDesc + " value=" + data[i].id + " data-conceptCode=" + data[i].conceptCode + " name= '" + name + "'>" + data[i].conceptCode + " " + data[i].conceptDesc + "&nbsp;&nbsp;";
                        	}
                        }
                    }
                    else {
                        checkbox += "<input type='checkbox'   data-type="+ code +" data-text= " + data[i].conceptDesc + " value=" + data[i].id + " data-conceptCode=" + data[i].conceptCode + " name= '" + name + "'>" + data[i].conceptCode + " " + data[i].conceptDesc + "&nbsp;&nbsp;";
                    }
                }
                _this.html(checkbox);
            }
        });
    });
}*/

/**
 * 生成复选框(单选)
 */
/**
 * 生成复选框(单选)
 */
function loadEtConceptsForRadio() {
      $("div[data-type='etconceptRadio']").each(function() {
            var _this = $(this);
            var code = _this.attr("data-code");
            var type = _this.attr("select-type");
            var checkbox = "";
            _this.html("");
            $.post("../etconcept/findEtConceptsByCode",{"code" : code},function(data, status) {
                if (status == "success") {
                    if (type == "radio") {
                        for (var i = 0;i<data.length;i++){
                            checkbox += "<input type='checkbox' onclick='setCheckboxRadio(this)'" +
                                    " data-type="+ code +" value=" + data[i].id + " data-conceptCode=" + data[i].conceptCode + "" +
                                            "data-text=" + data[i].conceptDesc + ">"
                            + data[i].conceptCode + " " + data[i].conceptDesc + "&nbsp;&nbsp;";
                    }
                        _this.html(checkbox);
                    }
                }
            });
        });
}
/*function loadEtConceptsForRadio() {
      $("div[data-type='etconceptRadio']").each(function() {
            var _this = $(this);
            var code = _this.attr("data-code");
            var type = _this.attr("select-type");
            var name = _this.attr('data-name');
            var value = _this.attr('data-value');
            var checkbox = "";
            _this.html("");
            $.post("../etconcept/findEtConceptsByCode",{"code" : code},function(data, status) {
                if (status == "success") {
                    if (type == "radio") {
                        for (var i = 0;i<data.length;i++){
                            checkbox += "<input type='checkbox' onclick='setCheckboxRadio(this)'";
                            if (value == data[i].id) {
                            	checkbox += " checked= 'checked'";
                            }
                            checkbox +=  " data-type="+ code +" value=" + data[i].id + " data-conceptCode=" + data[i].conceptCode + "" +
                                            "data-text=" + data[i].conceptDesc + " name='" + name + "'>"
                            + data[i].conceptCode + " " + data[i].conceptDesc + "&nbsp;&nbsp;";
                    }
                        _this.html(checkbox);
                    }
                }
            });
        });
}*/

/**
 * 设置一组复选框单选
 * @param obj
 */
function setCheckboxRadio(obj){
    var code = $(obj).attr('data-type');
    var value = $(obj).attr('data-conceptCode');
    var flag = $(obj).get(0).checked;
    defaultCheckBox(flag, code, $(obj));
}

//加载机构树
function initOrgTree() {
	$(".orgTree").combotree({
		url : "../orgnization/regionList",
		valueField : 'id',
		textField : 'text',
		editable : false,
		onClick: function(node) {
			$("#parentId").val(node.id);
		},
		//全部折叠
		/*onLoadSuccess : function(node, data) {
			$('#orgTree').combotree('tree').tree("collapseAll");
		},*/
		onBeforeExpand : function(node) {
			$(".orgTree").combotree("tree").tree("options").url = "../orgnization/regionList";
		}
   });
}

/**
 * 一组checkbox选中无的时候其它选项不可以选，选中其它的时候要显示输入框
 * @param flag
 * @param code
 * @param selectCheckbox
 */
function defaultCheckBox(flag, code,selectCheckbox) {
      $("input[data-type='" + code +"']").each(function(index, item){
        var checkCode = selectCheckbox.attr('data-conceptCode');
        var conceptCode = $(item).attr('data-conceptCode');
        if (flag) {
            if (checkCode != conceptCode) {
                $(item).removeAttr("checked");
                $(item).attr('disabled', 'disabled');
            }
        }
        else {
            $(item).attr('disabled', false);
        }
    });
}

/**
 * 给checkbox加载选中与不选中事件
 * @param obj
 * @param show
 * @param cut
 */
function cutboxs(obj,show,cut) {
    var code = $(obj).attr('data-type');
    var value = $(obj).attr('data-conceptCode');
    var cutId = $(cut).attr('id');
    var flag = $(obj).get(0).checked;
    if (flag) {
        if (show != null && show !="") {
            if (value == show) {
                document.getElementById(cutId).style.display = "";
            }
            else {
                document.getElementById(cutId).style.display="none";
                defaultCheckBox(flag, code, $(obj));
            }
        }
    }
    else {
        if (value == show) {
            document.getElementById(cutId).style.display="none";
        }
        defaultCheckBox(flag, code, $(obj));
    }
}

function msg(msg, type) {
    qiao.bs.msg({
        msg : msg,
        type : type,
        time : 2000
    });
}

function showModal(id) {
    $("#" + id).modal('show');
}

function closeModal(id) {
    $("#" + id).modal('hide');
}

//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
//例子：
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function(fmt) { //author: meizz
    var o = {
        "M+" : this.getMonth() + 1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
        "S" : this.getMilliseconds()
    //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
    for ( var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                    : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function parseAvailable(value, row, index) {
    if ("Y" == value) {
        return ISYES;
    }
    return "<font style='color:red'>" + ISNOT + "</font>"
}

function parseTFAvailable(value, row, index) {
    if ("Y" == value) {
        return ISYES;
    }
    return "<font style='color:red'>" + ISNOT + "</font>"
}

/**
 * 设置表格样式
 */
function cellStyle(value, row, index) {
      return {
        classes: 'text-nowrap another-class',
      };
}

/**
 * 判断两个对象的所有属性是否相等
 * @param a
 * @param b
 * @returns {Boolean}
 */
function isObjectValueEqual(a, b) {
    // Of course, we can do it use for in
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

/**
 * 获取当前月的第一天
 */
function getCurrentMonthFirst(){
 var date=new Date();
 date.setDate(1);
 return date;
}

/**
 * 获取当前月的最后一天
 */
function getCurrentMonthLast(){
	 var date=new Date();
	 var currentMonth=date.getMonth();
	 var nextMonth=++currentMonth;
	 var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
	 var oneDay=1000*60*60*24;
	 return new Date(nextMonthFirstDay-oneDay);
}

//保留两位小数
//功能：将浮点数四舍五入，取小数点后2位
function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    f = Math.round(x*100)/100;
    return f;
}


//制保留2位小数，如：2，会在2后面补上00.即2.00
function toDecimal2(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x*100)/100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

function getEtconceptById(id) {
	var value;
	$.ajax({
		url : '../etconcept/findEtConceptsByConceptId',
		type : 'post',
		async: false,//使用同步的方式,true为异步方式
		data : {"id" : id},//这里使用json对象
		success : function(data){
			value = data;
		},
		fail:function(){
			return "";
		}
	});
	return value;
}

/**
 * 清空表单值
 */
function clearCondition(id) {
	$("#" + id)[0].reset();
}


function getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //固定写法
    if (r != null) return unescape(r[2]); return null;
}
function forbidBackSpace(e) {
	   var ev = e || window.event; //获取event对象
	   var obj = ev.target || ev.srcElement; //获取事件源
	   var t = obj.type || obj.getAttribute('type'); //获取事件源类型
	   //获取作为判断条件的事件类型
	   var vReadOnly = obj.readOnly;
	   var vDisabled = obj.disabled;
	   //处理undefined值情况
	   vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
	   vDisabled = (vDisabled == undefined) ? true : vDisabled;
	   //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	   //并且readOnly属性为true或disabled属性为true的，则退格键失效
	   var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);
	   //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	   var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";
	   //判断
	   if (flag2 || flag1) return false;
}
//禁止后退键 作用于Firefox、Opera
document.onkeypress = forbidBackSpace;
//禁止后退键  作用于IE、Chrome
document.onkeydown = forbidBackSpace;


function openWindow(url, width, height) {
	if (width == '') {
		width = screen.width;
	}
	if (height == '') {
		height = screen.height;
	}
	var win = window.open(url, '', 'height=' + height + 'px,width=' + width
					+ 'px,resizable=yes,toolbar:0,menubar:0,scrollbars=1');
	return win;
}


function genderFormatter(value, row, index) {
	return getEtconceptById(value);
}

/**
 * 获取checkbox选中的值与文本(多选)
 *
 * @param conceptCode
 */
function getSelectBox(conceptCode, conceptShow, conceptOther) {
	var selectValue = "";
	var selectText = "";
	$("input[data-type='" + conceptCode + "']").each(function(index, item) {
		if ($(item).get(0).checked) {
			selectValue += $(item).val() + ",";
			if ($(item).val() == conceptShow) {
				selectText += $("#" + conceptOther).val() + ",";
			} else {
				selectText += $(item).attr("data-text") + ",";
			}
		}
	});
	return selectValue + "-" + selectText;
}


function parseEtconceptById(id) {
	$.post("../etconcept/findEtConceptsByConceptId",{"id" : id},function(data, status) {
        if (status == "success") {
        	return data;
        }
    });
}

function IdCard(UUserCard, num) {
	if (num == 1) {
		//获取出生日期
		birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12)
				+ "-" + UUserCard.substring(12, 14);
		return birth;
	}
	if (num == 2) {
		//获取性别
		if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
			//男
			return "男";
		} else {
			//女
			return "女";
		}
	}
	if (num == 3) {
		//获取年龄
		var myDate = new Date();
		var month = myDate.getMonth() + 1;
		var day = myDate.getDate();
		var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
		if (UUserCard.substring(10, 12) < month
				|| UUserCard.substring(10, 12) == month
				&& UUserCard.substring(12, 14) <= day) {
			age++;
		}
		return age;
	}
}
