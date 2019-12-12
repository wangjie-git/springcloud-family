function load() {
	$("a[name='menu']").each(function() {
		$(this).click(function() {
			if($(this).next("div").is(":hidden")) {
				$(this).next("div").show();
				$(this).find("i").removeClass("fa-plus");
				$(this).find("i").addClass("fa-minus");
			}
			else {
				$(this).next("div").hide();
				$(this).find("i").removeClass("fa-minus");
				$(this).find("i").addClass("fa-plus");
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

  	//回到顶部
  	if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
			$("#scrollUp").show();
	}
  	$(window).bind('scroll', function() {
  		if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
  			$("#scrollUp").slideToggle('1000');
  		}
  		else {
  			$("#scrollUp").hide();
  		}
  	});
  	$("#scrollUp").bind('click', function(){
     $('body,html').animate({scrollTop:0},1000);
     return false;
   });

  	//激活提示框
  	$('[data-toggle="popover"]').popover();


  	//$('#datetimepicker').datetimepicker('setEndDate', new Date());

  //判断非空
  	isEmpty = function(_this, message) {
  		if (_this[0].type == 'text') {
    		if (_this.val() == "" || _this.val() == undefined) {
    			alert_fun(_this, message);
    			return true;
    		}
    	}
    	if (_this[0].type == 'checkbox') {
    		if (!_this.is(":checked")) {
    			alert_fun(_this, message);
    			return true;
    		}
    	}
    	return false;
  	}
  	//jquery_confirm Alert弹出框
   alert_fun = function(_this, message) {
    	$.alert({
   		title: '提示框',
   	    content: message,
   	    confirmButtonClass:'btn-primary',
   	    backgroundDismiss:false,
   	    confirmButton:'确定',
   	    columnClass : "col-md-4 col-md-offset-3",
   	    keyboardEnabled : true,
   	    confirm:function() {
   	    	if (_this[0].type == 'text') {
   	    		_this.focus();
   	    	}
   	    }
   	});
  }

   $(".bartool_r").click(function() {
		$(".menu_right").toggle(0, function() {
			if ($(".menu_right").is(":hidden")) {
				$(".table-head").css("width", "60%");
				$(".table-form").css("width", "60%")
			} else {
				$(".table-head").css("width", "75%");
				$(".table-form").css("width", "75%")
			}
		});
	});

  /* $(".menutoolbar").click(function() {
        _this = $(this);
        _thiscontent = _this.parent().parent().next(".menu_content");
        _thisobj = _this.find('i');
        if (_thiscontent.is(":hidden")) {
        	_thisobj.removeClass('fa-minus').addClass("fa-plus");
        	_thiscontent.show();
        }
        else {
        	_thisobj.removeClass('fa-plus').addClass("fa-minus");
        	_thiscontent.hide();
        }
   });*/

   $(".box-menu").click(function() {
       _this = $(this);
       _thiscontent = _this.next(".menu_content");
       _thisobj = _this.find('i');
       if (_thiscontent.is(":hidden")) {
       	_thisobj.removeClass('fa-minus').addClass("fa-plus");
       	_thiscontent.show();
       }
       else {
       	_thisobj.removeClass('fa-plus').addClass("fa-minus");
       	_thiscontent.hide();
       }
  });

   $('#tableId').bootstrapTable({
		method: 'POST',
		url: "../data/getData",
		striped: true,
		pagination: true,
		pageList: [10,20,50,100],
		"queryParamsType": "limit",
		dataType: "json",
		sidePagination:'server',
		contentType: "application/x-www-form-urlencoded",
		showRefresh: true,
		clickToSelect: true,
		singleSelect: true,
		search:true
    });



};