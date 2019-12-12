$(window).load(function() {
	//checkbox做单选,并且选中时字体颜色变成蓝色
  	$("input[type=checkbox]").bind('click', function() {
 		_this = $(this);
 		var sname = _this.attr("name");
 		var sid = sname.split(".")[1] +"text";
 		//$("#" + sid).hide();
 		if (_this.attr("singSelect") == "singSelect") {
	         $("input[name='" + sname + "']").attr("checked",false);
	         _this.prop("checked","checked");
	         $("input[name='" + sname + "']").parent().css({color: '#000'});
	         if (_this.is(":checked")) {
 		         $(_this.parent()[0]).css({color: "blue"});
 		     }
 		}
 		else {
 			if (_this.is(":checked")) {
 		         $(_this.parent()[0]).css({color: "blue"});
 		    }
 	 		else {
 	 			$(_this.parent()[0]).css({color: '#000'});
 	 		}
 		}

 		//显示隐藏域
 		if (_this.attr("data-hide") == "other") {
 			hidetext = _this.next();
  			if (_this.is(":checked")) {
  				hidetext.show();
  			}
  			else {
  				hidetext.hide();
  			}
  		}
 		//当出现data-disabled="other" 表示选择了该项之后，其余项不能选择
 		if (_this.attr("data-disabled") == 'other') {
 			if (_this.is(":checked")) {
	 			$("input[name='" + sname + "']").attr("disabled","disabled");
	 			$("input[name='" + sname + "']").attr("checked",false);
	 			$("input[name='" + sname + "']").parent().css({color: '#000'});
	 			$(_this.parent()[0]).css({color: "blue"});
	 			_this.prop("checked","checked");
	 			$(_this).removeAttr("disabled");
	 			$("#" + sid).hide();
 			}
 			else {
 				$("input[name='" + sname + "']").removeAttr("disabled");
 			}
 		}
	});
 	//radio选中时字体颜色变成蓝色
  	$("input[type=radio]").bind('click', function() {
 		_this = $(this);
		var sname = _this.attr("name");
       $("input[name='" + sname + "']").parent().css({color: '#000'});
       if (_this.is(":checked")) {
       	$(_this.parent()[0]).css({color: "blue"});
       }
	});

  	//文本框只能输入浮点型
  	$(".input-text-float").each(function() {
		$(this).keyup(function(){
			_this = $(this);
			_this.val(_this.val().replace(/[^\d.]/g,""));  //清除“数字”和“.”以外的字符
			_this.val(_this.val().replace(/^\./g,""));  //验证第一个字符是数字而不是.
			_this.val(_this.val().replace(/\.{2,}/g,".")); //只保留第一个. 清除多余的.
			_this.val(_this.val().replace(".","$#$").replace(/\./g,"").replace("$#$","."));
		});
	});
  	//文本框只能输入整型
	$(".input-text-num").each(function() {
		$(this).keyup(function(){
			_this = $(this);
			_this.val(_this.val().replace(/[^\d]/g,""));  //清除“数字”和“.”以外的字符
		});
	});
});