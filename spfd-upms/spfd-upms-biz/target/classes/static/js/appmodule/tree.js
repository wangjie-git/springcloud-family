 //加载树
    qiao.bs.tree = {};
    qiao.bs.tree.options = {
    	url 	: '',
    	height 	: '600px',
    	open	: true,
    	edit	: false,
    	checkbox: true,
    	showurl	: false
    };
    $.fn.bstree = function(options){
    	qmask.show();
    	var opt = $.extend({}, qiao.bs.tree.options);
    	if(options){
    		if(typeof options == 'string'){
    			opt.url = options;
    		}else{
    			$.extend(opt, options);
    		}
    	}

    	var res = '加载失败！';
    	var $this = $(this);
    	qiao.ajax(opt.url, function(data){
    		for (var i=0;i<data.length;i++) {
    			var tree = data[0];
    			var start = '<div class="panel panel-info"><div class="panel-body" ';
    			if(opt.height != 'auto')
    				start += 'style="height:600px;overflow-y:auto;"';
    			start += '><ul class="nav nav-list sidenav" id="treeul" data="url:' + opt.url +';">';
    			var children = qiao.bs.tree.sub(tree, opt);
    			var end = '</ul></div></div>';
    			res = start + children + end;
        		$this.empty().append(res);
        		qiao.bs.tree.init();
    	}
    		qmask.hide();
      });
    };
    qiao.bs.tree.sub = function(tree, opt){
    	var res = '';
    	if(tree){
    		var res =
    			'<li>' +
    				'<a href="javascript:void(0);" class="line" data="id:' + tree.moduleId + ';type:' + tree.type +'">';
    		if ((tree.children != null && tree.children.length > 0)) {

    			if (tree.type=="root") {
    				res += '<span class="glyphicon glyphicon-minus"></span>';
    			} else {
    				res += '<span class="glyphicon glyphicon-plus"></span>';
    			}

    		}

    		if(opt.checkbox){
    			res += '<input type="checkbox" class="treecheckbox" data-type="' + tree.type + '" value="' + tree.moduleId + '"';
    			if(tree.checked){
    				res += 'checked';
    			}
    			res += '/>';
    		}
    			res += tree.moduleName;
    		if(opt.showurl){
    			res += '(' + tree.url + ')';
    		}
    		if(opt.edit)
    			res +=
    				'<span style="float:right;margin-right:50px;" data="id:' + tree.moduleId + ';">';
    		res +=
    				'</span>';
    			res += '</a>';
    		var children = tree.children;
    		if(children && children.length > 0){
    				res += '<ul style="padding-left:20px;" id="treeid_' + tree.moduleId + '" class="nav collapse ';
    			if(opt.open && tree.type=="root")
    				res += 'in';
    				res += '">';
    			for(var i=0; i<children.length; i++){
    				res += qiao.bs.tree.sub(children[i], opt);
    			}
    				res += '</ul>';
    		}
    		res += '</li>';
    	}

    	return res;
    };

    qiao.bs.tree.init = function(){
    	qiao.on('#treeul .glyphicon-minus', 'click', function(){
    		if($(this).parent().next().length > 0){
    			$('#treeid_' + $(this).parents('a').qdata().id).collapse('hide');
    			$(this).removeClass('glyphicon-minus').addClass('glyphicon-plus');
    		}
    	});
    	qiao.on('#treeul .glyphicon-plus', 'click', function(){
    		if($(this).parent().next().length > 0){
    			$('#treeid_' + $(this).parents('a').qdata().id).collapse('show');
    			$(this).removeClass('glyphicon-plus').addClass('glyphicon-minus');
    		}
    	});
    	qiao.on('input.treecheckbox', 'change', function(){
    		// 检测子级的
    		var subFlag = $(this).prop('checked');
    		$(this).parent().next().find('input.treecheckbox').each(function(){
    			$(this).prop('checked', subFlag);
    		});

    		// 检测父辈的
    		var parentFlag = true;
    		var $ul = $(this).parent().parent().parent();
    		$ul.children().each(function(){
    			var checked = $(this).children().children('input').prop('checked');
    			if(!checked) parentFlag = false;
    		});
    		$ul.prev().children('input').prop('checked', parentFlag);
    	});

    	qiao.bs.tree.url = $('#treeul').qdata().url;
    	/*if(qiao.bs.tree.url){
    		qiao.on('.bstreeadd', 'click', qiao.bs.tree.addp);
    		qiao.on('.bstreedel', 'click', qiao.bs.tree.del);
    		qiao.on('.bstreeedit', 'click', qiao.bs.tree.editp);
    	}*/
    };

