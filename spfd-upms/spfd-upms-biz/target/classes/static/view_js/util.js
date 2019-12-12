layui.use(['layer','form'], function(){
	var form = layui.form;

	$.get('../../user/getDataFrom',{},function(data){
		var dataFrom = data;
		var select = $(".dataFrom_select");
		var htmlStr = "<option value='' selected='selected'>请选择</option>";
		$.each(dataFrom, function(key) {
			htmlStr = htmlStr+ "<option value='"+dataFrom[key]+"' >"+key+"</option>";
		});
		select.append(htmlStr);
		form.render('select');//手动重新渲染select选项框
    })

})
