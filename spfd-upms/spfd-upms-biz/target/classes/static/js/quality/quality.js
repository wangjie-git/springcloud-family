var sbpMin = 90;
var sbpMax = 160;
var dbpMin = 50;
var dbpMax = 90;
var mbpMin = 60;
var mbpMax = 110;
var tempMin = 35.9;
var tempMax = 37.6;
var hrMin = 50;
var hrMax = 120;
var spo2Min = 90;
var spo2Max = 100;
var gluMin  = 2.8;
var gluMax = 7.0;
var urinePhMin = 4.6;
var urinePhMax = 8.0;
var urineSgMin = 1.015;
var urineSgMax = 1.025;

function loadRemoteTable() {
	initRefrences();
    $('#qualityTable').bootstrapTable({
        method : 'POST',
        url : "initData",
        striped : true,
        pagination : true,
        pageList : [ 10, 20, 50, 100 ],
        "queryParamsType" : "limit",
        dataType : "json",
        sidePagination : 'server',
        contentType : "application/x-www-form-urlencoded",
        clickToSelect : true,
        singleSelect : true,
        queryParams:queryParams
    });
    initCheckDataOrgTree();
}


function queryParams(params) {
    var data = $("#qualityForm").serialize();
    data = data + "&limit=" + params.limit + "&offset=" + params.offset;
    return data;
}

/**
 * 筛选
 * @returns
 */
function queryCheckData() {
    var checkStartDate = $("#checkStartDate").val();
    var checkEndDate = $("#checkEndDate").val();
    var flag = true;
    if ( checkStartDate != null && checkStartDate != "" &&
            checkEndDate != null && checkEndDate != "") {
        flag  = compareTwoDate(checkStartDate, STARTTIME, checkEndDate, ENDTIME);
        if (!flag){
            return;
        }
    }
    if (flag) {
        $('#qualityTable').bootstrapTable('refresh', {url: 'initData'});
    }
}

//加载机构树
function initCheckDataOrgTree() {
    $(".orgTree").combotree({
        url : "../orgnization/regionList?id=" + currentOrgId + "&type=parent",
        valueField : 'id',
        textField : 'text',
        editable : false,
        onClick: function(node) {
            $("#orgId").val(node.id);
        },
        onBeforeExpand : function(node) {
            $(".orgTree").combotree("tree").tree("options").url = "../orgnization/regionList";
        }
   });
}

function initRefrences() {
	$.post("../refrence/findRefrences",null,function(data,status){
		if (status == "success") {
			if (data != null && data.length > 0){
				for (var i = 0 ;i<data.length;i++) {
					if (data[i].id == "SBP") {
						sbpMin = Number(data[i].minValue);
						sbpMax = Number(data[i].maxValue);
					}
					if (data[i].id == "DBP") {
						dbpMin = Number(data[i].minValue);
						dbpMax = Number(data[i].maxValue);
					}
					if (data[i].id == "DBP") {
						dbpMin = Number(data[i].minValue);
						dbpMax = Number(data[i].maxValue);
					}
					if (data[i].id == "MBP") {
						mbpMin = Number(data[i].minValue);
						mbpMax = Number(data[i].maxValue);
					}
					if (data[i].id == "TEMP") {
						tempMin = Number(data[i].minValue);
						tempMax = Number(data[i].maxValue);
					}
					if (data[i].id == "HR") {
						hrMin = Number(data[i].minValue);
						hrMax = Number(data[i].maxValue);
					}
					if (data[i].id == "SPO2") {
						spo2Min = Number(data[i].minValue);
						spo2Max = Number(data[i].maxValue);
					}
					if (data[i].id == "GLU") {
						gluMin = Number(data[i].minValue);
						gluMax = Number(data[i].maxValue);
					}
					if (data[i].id == "NCG_PH") {
						urinePhMin = Number(data[i].minValue);
						urinePhMax = Number(data[i].maxValue);
					}
					if (data[i].id == "NCG_SG") {
						urineSgMin = Number(data[i].minValue);
						urineSgMax = Number(data[i].maxValue);
					}
				}
			}
		}
	});
}

function remoteDoctor() {
    var getSelectedValue = $("#remoteTable").bootstrapTable('getSelections');
    if (getSelectedValue == null || getSelectedValue == "") {
        qiao.bs.msg({
            msg : '请选择一条记录',
            type : 'warning',
            time : 3000
        });
    } else {

        showModal("remoteModal");
    }
}

function yonFormatter(value, row, index) {
    var show = '';
    if (value == null) {
        show = '无数据';
    }
    else if (value == '1') {
        show = '<font style="color:red;">异常</font>';
    }
    else if (value == '0') {
        show = '正常';
    }
    return ['', show, ''].join('');
}


/**
 * 返回固定格式
 * @param value
 * @param row
 * @param index
 * @returns
 */
function operateFormatter(value, row, index) {
    return [ '<a title="查看详情" href="#" onclick=showData("' + row.id + '")>', '查看详情', '</a>' ].join('');
}

function showData(id) {
    var rows = $('#qualityTable').bootstrapTable('getData');
    var row;
    for(var i=0;i<rows.length;i++) {
        if (rows[i].id == id) {
            row = rows[i];
        }
    }
    showDetailData('', '', row);
}

function showDetailData(field, value, obj) {
	clearClass();
	var row = obj.ksCheckData;
    $("#recordId").val(row.id);
    $("#name").text(row.name);
    $("#cardNo").text(row.cardNo);
    $("#uploadTime").text(row.uploadTime);
    $("#doctor").text(row.data.doctor);
    $("#recordTime").text(row.recordTime);
    $("#sbp").val(row.data.sbp);
    $("#dbp").val(row.data.dbp);
    $("#mbp").val(row.data.mbp);
    $("#lsbp").val(row.data.Left_SBP);
    $("#ldbp").val(row.data.Left_DBP);
    $("#lmbp").val(row.data.Left_MBP);
    $("#rsbp").val(row.data.right_SBP);
    $("#rdbp").val(row.data.right_DBP);
    $("#rmbp").val(row.data.right_MBP);
    $("#spo2").val(row.data.spo2);
    $("#pr").val(row.data.pr);
    $("#glu").val(row.data.glu);
    $("#height").val(row.data.height);
    $("#weight").val(row.data.weight);
    $("#temp").val(row.data.temp);
    $("#bim").val(row.data.bim);
    $("#waist").val(row.data.waist);
    $("#urine_ph").val(row.data.urine_ph);
    $("#urine_ubg").val(row.data.urine_ubg);
    $("#urine_bld").val(row.data.urine_bld);
    $("#urine_pro").val(row.data.urine_pro);
    $("#urine_ket").val(row.data.urine_ket);
    $("#urine_nit").val(row.data.urine_nit);
    $("#urine_glu").val(row.data.urine_glu);
    $("#urine_bil").val(row.data.urine_bil);
    $("#urine_leu").val(row.data.urine_leu);
    $("#urine_sg").val(row.data.urine_sg);
    $("#urine_vc").val(row.data.urine_vc);
    $("#asskfxtl").val(row.data.asskfxtl);
    $("#asskfxtdl").val(row.data.asskfxtdl);
    $("#assxhbd").val(row.data.assxhbd);
    $("#assbxb").val(row.data.assbxb);
    $("#assxxb").val(row.data.assxxb);
    $("#anal").text(row.data.anal);
    $("#asswldb").val(row.data.asswldb);
    $("#hr").val(row.data.hr);
    validityValue(obj);
    showModal("checkDataModal");
    var ddd = row.data;
    if (ddd.anal != null && ! ddd.anal == "") {
    	var clickIng = "showHeartImage('" + row.id + "')";
        $("#analDetail").html("<span onclick="+ clickIng +"><a href='#'>查看心电图</a></span");
    }
    else {
    	$("#analDetail").html("");
    }
}

function showHeartImage(id){
	var url = "../heartImage/init?dataId=" + id;
	window.open(url);
}

function validityValue(obj) {
	var data = obj.ksCheckData.data;
	var pressure = obj.pressure;//血压
	if (pressure == "1") {
		var sbp = data.SBP;
		var dbp = data.DBP;
		var mbp = data.MBP;
		var lsbp = data.Left_SBP;
		var ldbp = data.Left_DBP;
		var lmbp = data.Left_MBP;
		var rsbp = data.Right_SBP;
		var rdbp = data.Right_DBP;
		var rmbp = data.Right_MBP;
		if (sbp != null && sbp!= "") {
			var sbpN = Number(sbp);
			if (sbpN < sbpMin || sbpN > sbpMax) {
				$("#sbp").addClass("cred");
			}
		}
		if (dbp != null && dbp!= "") {
			var dbpN = Number(dbp);
			if (dbpN < dbpMin || dbpN > dbpMax) {
				$("#dbp").addClass("cred");
			}
		}
		if (mbp != null && mbp!= "") {
			var mbpN = Number(mbp);
			if (mbpN < mbpMin || mbpN > mbpMax) {
				$("#mbp").addClass("cred");
			}
		}

		if (lsbp != null && lsbp!= "") {
			var sbpN = Number(lsbp);
			if (sbpN < sbpMin || sbpN > sbpMax) {
				$("#lsbp").addClass("cred");
			}
		}
		if (ldbp != null && ldbp!= "") {
			var dbpN = Number(ldbp);
			if (dbpN < dbpMin || dbpN > dbpMax) {
				$("#ldbp").addClass("cred");
			}
		}
		if (lmbp != null && lmbp!= "") {
			var mbpN = Number(lmbp);
			if (mbpN < mbpMin || mbpN > mbpMax) {
				$("#lmbp").addClass("cred");
			}
		}
		if (sbp != null && sbp!= "") {
			var sbpN = Number(sbp);
			if (sbpN < sbpMin || sbpN > sbpMax) {
				$("#sbp").addClass("cred");
			}
		}
		if (rdbp != null && rdbp!= "") {
			var dbpN = Number(rdbp);
			if (dbpN < dbpMin || dbpN > dbpMax) {
				$("#rdbp").addClass("cred");
			}
		}
		if (rmbp != null && rmbp!= "") {
			var mbpN = Number(rmbp);
			if (mbpN < mbpMin || mbpN > mbpMax) {
				$("#rmbp").addClass("cred");
			}
		}
	}
	var temp = obj.temp;//体温
	if (temp == "1") {
		var tempbody = data.Temp;
		if (tempbody != null && tempbody != "") {
			var tempbodyN = Number(tempbody);
			if (tempbodyN < tempMin || tempbodyN > tempMax) {
				$("#temp").addClass("cred");
			}
		}
	}
	var glu = obj.glu;//血糖
	if (glu == "1") {
		var gludata = data.Glu;
		if (gludata != null && gludata != "") {
			var gludataN = Number(gludata);
			if (gludataN < gluMin || gludataN > gluMax) {
				$("#glu").addClass("cred");
			}
		}
	}
	var hr = obj.hr;//心率
	if (hr == "1") {
		var hrdata = data.HR;
		if (hrdata != null && hrdata != "") {
			var hrdataN = Number(hrdata);
			if (hrdataN < hrMin || hrdataN > hrMax) {
				$("#hr").addClass("cred");
			}
		}
	}
	var spo2 = obj.spo2;//血氧
	if (spo2 == "1") {
		var spo2data = data.SPO2;
		if (spo2data != null && spo2data != "") {
			var spo2dataN = Number(spo2data);
			if (spo2dataN < spo2Min || spo2dataN > spo2Max) {
				$("#spo2").addClass("cred");
			}
		}
	}
	var urine = obj.urine;//尿常规
	if (urine == "1") {
		var urinePh = data.Urine_ph; //尿常规酸碱度
		if (urinePh != null && urinePh != "") {
			var urinePhN = Number(urinePh);
			if (urinePhN < urinePhMin || urinePhN > urinePhMax) {
				$("#urine_ph").addClass("cred");
			}
		}
		var urineSg = data.Urine_sg; //尿常规尿比密
		if (urineSg != null && urineSg != "") {
			var urineSgN = Number(urineSg);
			if (urineSgN < urineSgMin || urineSgN > urineSgMax) {
				$("#urine_sg").addClass("cred");
			}
		}
		var urineUbg = data.Urine_ubg; //尿常规尿胆原
		if (urineUbg != null && urineUbg != "") {
			if (urineUbg.indexOf("+") > -1) {
				$("#urine_ubg").addClass("cred");
			}
		}
		var urineBld = data.Urine_bld; //尿常规隐血
		if (urineBld != null && urineBld != "") {
			if (urineBld.indexOf("+") > -1) {
				$("#urine_bld").addClass("cred");
			}
		}
		var urinePro = data.Urine_pro; //尿常规尿蛋白
		if (urinePro != null && urinePro != "") {
			if (urinePro.indexOf("+") > -1) {
				$("#urine_pro").addClass("cred");
			}
		}
		var urineNit = data.Urine_nit; //尿常规亚硝酸盐
		if (urineNit != null && urineNit != "") {
			if (urineNit.indexOf("+") > -1) {
				$("#urine_nit").addClass("cred");
			}
		}
		var urineGlu = data.Urine_glu; //尿常规尿糖
		if (urineGlu != null && urineGlu != "") {
			if (urineGlu.indexOf("+") > -1) {
				$("#urine_glu").addClass("cred");
			}
		}
		var urineBil = data.Urine_bil; //尿常规胆红素
		if (urineBil != null && urineBil != "") {
			if (urineBil.indexOf("+") > -1) {
				$("#urine_bil").addClass("cred");
			}
		}
		var urineLeu = data.Urine_leu; //尿常规白细胞
		if (urineLeu != null && urineLeu != "") {
			if (urineLeu.indexOf("+") > -1) {
				$("#urine_leu").addClass("cred");
			}
		}
		var urineKet = data.Urine_ket; //尿常规酮体
		if (urineKet != null && urineKet != "") {
			if (urineKet.indexOf("+") > -1) {
				$("#urine_ket").addClass("cred");
			}
		}
		var urineVc = data.Urine_vc; //尿常规维生素c
		if (urineVc != null && urineVc != "") {
			if (urineVc.indexOf("+") > -1) {
				$("#urine_vc").addClass("cred");
			}
		}
	}
}

/**
 * 清除各控件样式
 */
function clearClass() {
	$("#sbp").removeClass("cred");
	$("#dbp").removeClass("cred");
	$("#mbp").removeClass("cred");
	$("#lsbp").removeClass("cred");
	$("#ldbp").removeClass("cred");
	$("#lmbp").removeClass("cred");
	$("#rsbp").removeClass("cred");
	$("#rdbp").removeClass("cred");
	$("#rmbp").removeClass("cred");
	$("#temp").removeClass("cred");
	$("#glu").removeClass("cred");
	$("#hr").removeClass("cred");
	$("#spo2").removeClass("cred");
	$("#urine_ph").removeClass("cred");
	$("#urine_sg").removeClass("cred");
	$("#urine_ubg").removeClass("cred");
	$("#urine_bld").removeClass("cred");
	$("#urine_pro").removeClass("cred");
	$("#urine_nit").removeClass("cred");
	$("#urine_glu").removeClass("cred");
	$("#urine_bil").removeClass("cred");
	$("#urine_leu").removeClass("cred");
	$("#urine_ket").removeClass("cred");
	$("#urine_vc").removeClass("cred");
}

function closeCheckDataModal() {
    closeModal("checkDataModal");
}

function printHeRecord() {
	var recordId = $("#recordId").val();
	window.open("../data/redirectPrintHeRecordPage?id=" + recordId);
	//location.href = "redirectPrintHeRecordPage?id=" + recordId;
}

