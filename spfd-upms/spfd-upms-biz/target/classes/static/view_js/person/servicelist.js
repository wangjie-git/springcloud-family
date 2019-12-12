layui
		.use(
				[ 'form', 'layedit', 'laydate', 'laytpl', 'table', 'element' ],
				function() {
					var form = layui.form, layer = layui.layer, layedit = layui.layedit, laydate = layui.laydate, laytpl = layui.laytpl, table = layui.table, element = layui.element, $ = layui.$;

					// 获取url指定参数值
					function GetQueryString(name) {
						var reg = new RegExp(("(^|&)" + name + "=([^&]*)(&|$)"));
						var r = window.location.search.substr(1).match(reg);
						if (r != null)
							return unescape(r[2]);
						return null;
					}

					// 页面初始化需要用到 请求数据
					function reqdata() {
						var personId = GetQueryString('personId');
						if (personId != null) {
							var index = layer.load();
							$.ajax({
								url : "../../person/findHistorysByPersonId",
								type : "GET",
								data : {
									"personId" : personId
								},
								dataType : "json",
								success : function(result) {
									// 进行处理
									htmlTpl(result, '#demoTpl', '#tablehtml',
											function() {
												layer.close(index);
												form.render();
											})
								},
								error : function(msg) {
									layer.msg('未连到服务器');
									layer.close(index);
								}
							})
						} else {
							var result = [];
							htmlTpl(result, '#demoTpl', '#tablehtml',
									function() {
										form.render();
									})
						}
					}
					reqdata();
				});

function htmlTpl(data, getid, toid, fun) {
	layui.use('laytpl', function() {
		var $ = layui.$;
		var laytpl = layui.laytpl;
		var getTpl = $(getid).html();
		laytpl(getTpl).render(data, function(html) {
			$(toid).html(html);
			if (typeof fun == 'function') {
				fun();
			}
		});
	});
}
function ischecked(data, val) {
	return data == val ? 'checked' : '';
}

function isSelected(data, val) {
	return data == val ? 'selected=""' : '';
}
function ischeckbox(data, val) {
	var arr = data.split(',');
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == val) {
			return 'checked';
		}
	}
	return '';
}
function isundefined(val) {
	if (typeof val == 'undefined') {
		return '';
	}
	return val;
}

function convertShow(type) {
	var factName = "";
	if (type == "ecg") {
		factName = "心率";
	} else if (type == "spo2") {
		factName = "血氧";
	} else if (type == "nibp") {
		factName = "血压";
	} else if (type == "temperature") {
		factName = "体温";
	} else if (type == "glu_before") {
		factName = "空腹血糖";
	} else if (type == "glu_after") {
		factName = "餐后血糖";
	} else if (type == "urine") {
		factName = "尿常规";
	} else if (type == "hemoglobin") {
		factName = "血红蛋白";
	} else if (type == "ghb") {
		factName = "糖化血红蛋白";
	} else if (type == "wbc") {
		factName = "白细胞";
	} else if (type == "bene_trinity") {
		factName = "血液三项";
	} else if (type == "blood_fat") {
		factName = "血脂";
	}
	return factName;
}

function convertValue(type,value,item){
	var factValue = "";
	if(item.formdata == "2"){
		if(value != null && value != "" && value != undefined) {
			var obj = JSON.parse(value);//json字符串
			factValue = "<br/>"
			if(isundefined_(obj[202]) != "-?-"){
				factValue += "血氧：" + isundefined_(obj[202]) +"<br/>";
			}
			if(isundefined_(obj[401]) != "-?-"){
				factValue += "体温：" + isundefined_(obj[401])  + "℃<br/>";
			}
			if(isundefined_(obj[501]) != "-?-"){
				factValue += "收缩压:" +obj[501] + "mmHg,舒张压:"+obj[502] + "mmHg<br/>";
			}
			if(isundefined_(obj[504]) != "-?-"){
				factValue += "血压脉率:" +obj[504] + "bpm<br/>";
			}
			if(isundefined_(obj["14"]) != "-?-"){
				factValue += "心电:" + obj["14"] + "bpm";
			}
			if(isundefined_(obj[1201]) != "-?-"){
				factValue += "【尿常规】:<br/>";
				factValue += "白细胞：" + obj[1201] + "<br/>";
				factValue += "亚硝酸盐：" + obj[1202] + "<br/>";
				factValue += "尿胆原：" + obj[1203] + "<br/>";
				factValue += "蛋白质：" + obj[1204] + "<br/>";
				factValue += "Ph：" + obj[1205] + "<br/>";
				factValue += "尿潜血：" + obj[1206] + "<br/>";
				factValue += "尿比重：" + obj[1207] + "<br/>";
				factValue += "胆红素：" + obj[1208] + "<br/>";
				factValue += "尿酮体：" + obj[1209] + "<br/>";
				factValue += "尿糖：" + obj[1210] + "<br/>";
				if(isundefined_(obj[1211]) != "-?-"){
					factValue += "抗坏血酸(VC)：" + isundefined_(obj[1211]) + "<br/>";
				}
				if(isundefined_(obj[1212]) != "-?-"){
					factValue += "微量白蛋白：" + isundefined_(obj[1212]) + "<br/>";
				}
				if(isundefined_(obj[1214]) != "-?-"){
					factValue += "肌酐：" + isundefined_(obj[1214]) + "<br/>";
				}
				if(isundefined_(obj[1215]) != "-?-"){
					factValue += "尿钙：" + isundefined_(obj[1215]) + "<br/>";
				}
				if(isundefined_(obj[1213]) != "-?-"){
					factValue += "抗坏血酸(VC)：" + isundefined_(obj[1213]) + "<br/>";
				}

			}

			if(isundefined_(obj[902]) != "-?-"){
				factValue += "血糖：" + isundefined_(obj[902]) + "(餐后)mmol/L<br/>";
			}
			if(isundefined_(obj[901]) != "-?-"){
				factValue += "血糖：" + isundefined_(obj[901]) + "(空腹)mmol/L<br/>";
			}
			factValue += "指导意见:" + item.attchment.parguide + "<br/>";

		}
		factValue = isundefined(factValue);
		return factValue;
	}


	if(type != null && type != "" && type != undefined
			&&value != null && value != "" && value != undefined) {
		var obj = JSON.parse(value);//json字符串
		if (type == "ecg") {
			factValue = obj["14"] + "bpm";
		} else if (type == "spo2") {
			factValue = "血氧:" + obj[202]+"%,脉率:" + obj[203] + "bpm";
		} else if (type == "nibp") {
			factValue = "收缩压:" +obj[501] + "mmHg,舒张压:"+obj[502] + "mmHg";
		} else if (type == "temperature") {
			factValue = obj[401] + "℃";
		} else if (type == "glu_before") {
			factValue = obj[901] + "(空腹)mmol/L";
		} else if (type == "glu_after") {
			factValue = obj[902] + "(餐后)mmol/L";
		} else if (type == "urine") {
			factValue += "<br/>白细胞：" + obj[1201] + "<br/>";
			factValue += "亚硝酸盐：" + obj[1202] + "<br/>";
			factValue += "尿胆原：" + obj[1203] + "<br/>";
			factValue += "蛋白质：" + obj[1204] + "<br/>";
			factValue += "Ph：" + obj[1205] + "<br/>";
			factValue += "尿潜血：" + obj[1206] + "<br/>";
			factValue += "尿比重：" + obj[1207] + "<br/>";
			factValue += "胆红素：" + obj[1208] + "<br/>";
			factValue += "尿酮体：" + obj[1209] + "<br/>";
			factValue += "尿糖：" + obj[1210] + "<br/>";
			if(isundefined_(obj[1211]) != "-?-"){
				factValue += "抗坏血酸(VC)：" + isundefined_(obj[1211]) + "<br/>";
			}
			if(isundefined_(obj[1212]) != "-?-"){
				factValue += "微量白蛋白：" + isundefined_(obj[1212]) + "<br/>";
			}
			if(isundefined_(obj[1214]) != "-?-"){
				factValue += "肌酐：" + isundefined_(obj[1214]) + "<br/>";
			}
			if(isundefined_(obj[1215]) != "-?-"){
				factValue += "尿钙：" + isundefined_(obj[1215]) + "<br/>";
			}
			if(isundefined_(obj[1213]) != "-?-"){
				factValue += "抗坏血酸(VC)：" + isundefined_(obj[1213]) + "<br/>";
			}

		} else if (type == "hemoglobin") {
			factValue = "血红蛋白:" + obj[1402] + "g/L   红细胞积压值：" +  obj[1403] + "%";
		} else if (type == "ghb") {
			//factValue = "已测";
			factValue = "HbA1c NGSP : "+ obj[1601] + " % ,HbA1c IFCC: "+ obj[1602] + " mmol/mol, eAG:"+ obj[1603]+" mg/dL";
		} else if (type == "wbc") {
			factValue = Number(obj[1401])/1000 + "*10^9/L";
		} else if (type == "bene_trinity") {
			factValue = "尿酸:" + isundefined_(obj[1001])+"mmol/L,总胆固醇:"+isundefined_(obj[1101])+"mmol/L,血糖" + beforeOrAfter(obj);
		} else if (type == "blood_fat") {
			factValue = "胆固醇:" +isundefined_(obj[1501]) +"mmol/L,甘油三酯:" +isundefined_(obj[1502])+"mmol/L,高密度脂蛋白:" +isundefined_(obj[1503])+"mmol/L,低密度脂蛋白:" +isundefined_(obj[1504] +"mmol/L");
		} else if (type == "height") {
			factValue = obj[2002]  + " cm";
		} else if (type == "weight") {
			factValue = obj[2001] + " kg";
		}
	}
	factValue = isundefined(factValue);
	return factValue;
}

function isundefined_(val) {
	if (typeof val == 'undefined') {
		return '-?-';
	}
	return val;
}
function beforeOrAfter(obj) {
	if (obj[901] == "-?-") {
		return obj[902] + "(餐后)mmol/L";
	}
	if (obj[902] == "-?-") {
		return obj[901] + "(空腹)mmol/L";
	}
	return  "-?-mmol/L";
}