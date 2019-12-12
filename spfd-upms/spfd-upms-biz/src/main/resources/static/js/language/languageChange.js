function selectOnChange(language) {
    $.post("/gpgp-web/languages/languageChange",{"language":language},function(result){
        if(result.msgCode=='10000'){
        	alert("切换失败")
        }else {
        	 location.reload();
        }
    });
}