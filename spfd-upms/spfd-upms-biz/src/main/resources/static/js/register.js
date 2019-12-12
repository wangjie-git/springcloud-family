function rlogin(availableType, availableTime, registerCode) {
	$("#register").hide();
	$("#registerSuccess").show();
	$("#registerCode2").html(registerCode);
	if ("T" == availableType) {
		$("#availableType").html("临时有效");
		$("#availableTime").html("截止时间:" + availableTime);
	}
	if ("F" == availableType) {
		$("#availableType").html("终生有效");
		$("#availableTime").html("");
	}
}

function register() {
	var privateKey = $("#privateKey").val();
	var registerCode = $("#registerCode").val();
	var flag = true;
	if (privateKey == null || privateKey == "") {
		$("#message").html("请刷新页面获取私钥");
		flag = false;
	} else {
		if (registerCode == null || registerCode == "") {
			$("#message").html("授权码不能为空,请填入授权码");
			flag = false;
		}
	}
	if (flag) {
		$.post('register', {
			"registerCode" : registerCode
		}, function(data, status) {
			if (status == "success") {
				if (data.msgCode == "10000") {
					rlogin(data.regis.availabeType, data.regis.availableTime,
							registerCode);
				} else {
					$("#message").html(data.msgText);
				}
			}
		});
	}
}

function toLogin() {
	window.location.href="login";
}