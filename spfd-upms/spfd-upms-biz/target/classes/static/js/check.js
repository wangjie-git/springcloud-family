
/**
 * 比较两个日期大小
 *
 * @param firstDate
 * @param secondDate
 * @returns {Boolean}
 */
function compareToDate(firstDate, secondDate) {
	var flag = true;
	if (firstDate == null || firstDate == "") {
		msg("FIRSTPRODUCTDATE", "warning");
		flag = false;
		return;
	}
	if (secondDate == null || secondDate == "") {
		msg("保修截至日期不能为空", "warning");
		flag = false;
		return;
	}
	var beginTimes = firstDate.substring(0, 10).split('-');
	var endTimes = secondDate.substring(0, 10).split('-');
	beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0];
	endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0];
	var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
	if (a < 0) {
		msg("生产日期不得晚于保修截至日期", "warning");
		flag = false;
	} else {
		flag = true;
	}
	return flag;
}

function compareTwoDate(firstDate, firstName, secondDate, endName) {
	var flag = true;
	if (firstDate == null || firstDate == "") {
		msg(firstName + CANNOTNULL, "warning");
		flag = false;
		return;
	}
	if (secondDate == null || secondDate == "") {
		msg(endName + CANNOTNULL, "warning");
		flag = false;
		return;
	}
	var beginTimes = firstDate.substring(0, 10).split('-');
	var endTimes = secondDate.substring(0, 10).split('-');
	beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0];
	endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0];
	var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
	if (a < 0) {
		msg(firstName + CANNOTBIG + endName, "warning");
		flag = false;
	} else {
		flag = true;
	}
	return flag;
}

/**
 * 返回字符串长度（自动识别中英文）
 */
var getByteLen = function(val) {
	var len = 0;
	for (var i = 0; i < val.length; i++) {
		if (val[i].match(/[^x00-xff]/ig) != null) // 全角
			len += 2;
		else
			len += 1;
	}
	;
	return len;
}

/**
 * 过滤特殊字符
 *
 * @param s
 * @returns {Boolean}
 */
function stripscript(s) {
	var pattern = new RegExp(
			"[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|【】‘；：”“'。，、？]")
	var re = /^([^\`\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\！\￥\……\（\）\——]*[\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\`\！\?\:\<\>\•\“\”\；\‘\‘\〈\ 〉\￥\……\（\）\——\｛\｝\【\】\\\/\;\：\？\《\》\。\，\、\[\]\,]+.*)$/;;
	if (re.test(s)) {
		return false;
	} else {
		return true;
	}
}


/**
 * 过滤中文
 *
 * @param str
 * @returns {Boolean}
 */
function isChn(str) {
	var reg = /.*[\u4e00-\u9fa5]+.*$/;
	return reg.test(str);
}

/**
 * 校验文本框不能为空,支持中文、英文、数字的输入，规避特殊字符，限制字符长度为chineseLength个中文字符或者englishLength个英文等其他字符
 *
 * @param name
 * @param typeName
 * @param chineseLength
 * @param englishLength
 * @returns {Boolean}
 */
function checkDetail(name, typeName, chineseLength, englishLength) {
	var flag = true;
	var rName = null;
	if (name != null) {
		rName = name.replace(/\s/g, "");
	}
	if (rName == null || rName == "") {
		msg(typeName + "不能为空", "warning");
		flag = false;
	} else {
		if (rName.length != name.length) {
			msg(typeName + "包含空格字符，请重新输入", "warning");
			flag = false;
		}
		var strFlag = checkNoSpecialeChar(name);
		if (strFlag) {
			msg(typeName + "不能包含特殊字符", "warning");
			flag = false;
		}
		var length = getByteLen(name);
		if (length > englishLength) {
			msg(typeName + "字符长度为" + chineseLength + "个中文字符或者" + englishLength
					+ "个英文等其他字符", "warning");
			flag = false;
		}
	}
	return flag;
}

/**
 * 检验文本输入框的值的精度及长度(浮点型)
 * @param name --值
 * @param typeName --名称
 * @param totalLength --总长度
 * @param decimalLength --小数点长度
 */
function checkFloat(name, typeName, totalLength, decimalLength) {
	var checkFlag = true;
	if (name != null && name != "") {
		var validateFlag = validateNumber(name);
		if (validateFlag) {
			var temps = name.split(".");
			var tempLength = 0;
			if (temps.length > 1) {
				var temp1 = temps[0];
				var temp2 = temps[1];
				tempLength = temp1.length + temp2.length;
				if (tempLength > totalLength) {
					msg(typeName + "最多" + totalLength + "位(不包括小数点)，请重新输入","warning");
					checkFlag = false;
				}
				if (temp2.length > decimalLength) {
					msg(typeName + "最多" + totalLength +"位，并且最多精确到小数点后" + decimalLength +"位，请重新输入","warning");
					checkFlag = false;
				}
			}
			else {
				if (temps.length == 1) {
					tempLength = temps[0].length;
					if (tempLength > totalLength){
						msg(typeName + "最多" + totalLength +"位，并且最多精确到小数点后" + decimalLength +"位，请重新输入","warning");
					}
				}
			}

		}else {
			msg(typeName + "非数字，请重新输入!","warning");
			checkFlag = false;
		}
	}
	return checkFlag;
}

/**
 * 校验文本框不能为空,支持英文、数字字符的输入，规避中文和特殊字符，限制字符长度为englishLength个英文或者数字字符
 *
 * @param name
 * @param typeName
 * @param englishLength
 * @returns {Boolean}
 */
function checkDetailNoChinese(name, typeName, englishLength) {
	var flag = true;
	if (name == null || name == "") {
		msg(typeName + "不能为空", "warning");
		flag = false;
	} else {
		var rName = name.replace(/\s/g, "");
		if (rName.length != name.length) {
			msg(typeName + "包含空格字符，请重新输入", "warning");
			flag = false;
		}
		var strChnFlag = isChn(name);
		if (strChnFlag) {
			msg(typeName + "不能包含中文字符", "warning");
			flag = false;
		}
		var strFlag = checkNoSpecialeChar(name);
		if (strFlag) {
			msg(typeName + "不能包含特殊字符", "warning");
			flag = false;
		}
		var length = getByteLen(name);
		if (length > englishLength) {
			msg(typeName + "字符长度为" + englishLength + "个英文字符或者数字字符", "warning");
			flag = false;
		}
	}
	return flag;
}

/**
 * 校验文本框不能为空,支持英文、数字字符的输入，规避中文，限制字符长度为englishLength个英文或者数字字符
 *
 * @param name
 * @param typeName
 * @param englishLength
 * @returns {Boolean}
 */
function checkNoChineseForLength(name, typeName, englishLength) {
	var flag = true;
	var rName = name.replace(/\s/g, "");
	if (rName.length != name.length) {
		msg(typeName + "包含空格字符，请重新输入", "warning");
		flag = false;
	}
	var strChnFlag = isChn(name);
	if (strChnFlag) {
		msg(typeName + "不能包含中文字符", "warning");
		flag = false;
	}
	var length = getByteLen(name);
	if (length > englishLength) {
		msg(typeName + "字符长度为" + englishLength + "个英文字符或者数字字符", "warning");
		flag = false;
	}
	return flag;
}

/**
 * 校验非空
 * @param name
 * @param typeName
 * @returns {Boolean}
 */
function checkEmpty(name, typeName) {
	var flag = true;
	if (name == null) {
		msg(typeName + "不能为空", "warning");
		flag = false;
	}
	else{
		if (name == "") {
			msg(typeName + "不能为空", "warning");
			flag = false;
		}
		else {
			var rName = name.replace(/\s/g, "");
			if (rName == "") {
				msg(typeName + "不能为空", "warning");
				flag = false;
			}
		}
	}
	return flag;
}

/**
 * 校验文本框不能为空,支持英文、数字字符、特殊字符=的输入，规避中文，限制字符长度为length
 *
 * @param name
 * @param typeName
 * @param length
 * @returns {Boolean}
 */
function checkNoChinese(name, typeName, englishLength) {
	var flag = true;
	var rName = name.replace(/\s/g, "");
	if (rName == null || rName == "") {
		msg(typeName + "不能为空", "warning");
		flag = false;
	} else {
		if (rName.length != name.length) {
			msg(typeName + "包含空格字符，请重新输入", "warning");
			flag = false;
		}
		var strChnFlag = isChn(name);
		if (strChnFlag) {
			msg(typeName + "不能包含中文字符", "warning");
			flag = false;
		}
		var length = getByteLen(name);
		if (length > englishLength) {
			msg(typeName + "字符长度不大于" + englishLength + "位字符", "warning");
			flag = false;
		}
	}
	return flag;
}

/**
 * 校验字符串非空和长度
 *
 * @param name
 * @param englishLength
 * @returns {Boolean}
 */
function checkDetailForLengthAndNull(name, typeName, chineseLength,
		englishLength) {
	var flag = true;
	var rName = name.replace(/\s/g, "");
	if (rName == null || rName == "") {
		msg(typeName + "不能为空", "warning");
		flag = false;
	} else {
		if (rName.length != name.length) {
			msg(typeName + "包含空格字符，请重新输入", "warning");
			flag = false;
		}
		var length = getByteLen(name);
		if (length > englishLength) {
			msg(typeName + "字符长度为" + chineseLength + "个中文字符或者" + englishLength
					+ "个英文等其他字符", "warning");
			flag = false;
		}
	}
	return flag;
}

/**
 * 校验文本输入框长度(去空格)
 *
 * @param name
 * @param typeName
 * @param chineseLength
 * @param englishLength
 * @returns {Boolean}
 */
function checkForLength(name, typeName, chineseLength, englishLength) {
	var flag = true;
	if (name != null && name != "") {
		name = name.replace(/\s/g, "");
		var length = getByteLen(name);
		if (length > englishLength) {
			msg(typeName + "字符长度不能超过" + chineseLength + "个中文字符或者" + englishLength
					+ "个英文等其他字符", "warning");
			flag = false;
		}
	}
	return flag;
}

/**
 * 校验字符长度以及特殊字符
 * @param name
 * @param typeName
 * @param chineseLength
 * @param englishLength
 */
function checkForLengthNoSpecial(name, typeName, chineseLength, englishLength){
	var flag = true;
	if (name != null && name != "") {
		name = name.replace(/\s/g, "");
		var length = getByteLen(name);
		if (length >= englishLength) {
			msg(typeName + "字符长度为" + chineseLength + "个中文字符或者" + englishLength
					+ "个英文等其他字符", "warning");
			flag = false;
		}
		var strFlag = checkNoSpecialeChar(name);
		if (strFlag) {
			msg(typeName + "不能包含特殊字符", "warning");
			flag = false;
		}
	}
	return flag;
}

/**
 * 校验字符串是否包含特殊字符
 *
 * @param str
 * @returns
 */
function checkNoSpecialeChar(str) {
	/* (\-)(\_)(\;)(\.) */
	var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\:)(\')(\")(\,)(\/)(\<)(\>)(\?)(\)]+/);
	return (containSpecial.test(str));
}

/**
 * 校验身份证号码格式是否正确，不能校验出真伪
 * @param str
 * @returns
 */
function checkIdCardNumber(idCardNumber) {
	var idSpecial = RegExp(isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/);
	var flag = true;
	idCardNumber = idCardNumber.replace(/\s/g, "");
	if (idCardNumber != null && idCardNumber != "") {
		flag = idSpecial.test(idCardNumber);
		if (!flag) {
			msg("身份证号码格式不正确!", "warning");
		}
		return flag;
	}
	else {
		msg("身份证号码不能为空!!", "warning");
		flag = false;
	}
	return flag;
}


function checkIdNo(idCardNumber) {
	var idSpecial = RegExp(isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/);
	var flag = true;
	idCardNumber = idCardNumber.replace(/\s/g, "");
	if (idCardNumber != null && idCardNumber != "") {
		flag = idSpecial.test(idCardNumber);
		if (!flag) {
			msg("身份证号码格式不正确!", "warning");
		}
		return flag;
	}
	return flag;
}
/**
 * 浮点型数据格式化
 * @param val
 * @param n
 * @returns
 */
function toFloat(val, n) {
	if ("" != val) {
		val = val + "";
		// 递归调用时val为int
		if (val.indexOf(".") == 0) {
			val = "0" + val;
		}
		// val不含小数点
		if (val.indexOf(".") == -1) {
			var zero = ".";
			for (i = 0; i < n; i++) {
				zero = zero + "0";
			}
			return val + zero;
			// val小数点后的位数比需要的多
		} else if (eval(val.substring(val.indexOf(".") + 1, val.length).length) > eval(n)) {
			var next = val.substring(val.indexOf(".") + eval(n) + 1, val
					.indexOf(".")
					+ eval(n) + 2);
			// 四舍五入
			if (next >= 5) {
				var result = eval(val.substring(0, val.indexOf(".") + eval(n)
						+ 1)) + 0.01;
				// 四舍五入后result变为int型
				return toFloat(result, n);
			} else {
				return val.substring(0, val.indexOf(".") + eval(n) + 1);
			}
		} else if (eval(val.substring(val.indexOf("."), val.length).length) < eval(n)) {
			// 截取的小数的后的数字并减去点占的长度
			var pointNum = eval(val.substring(val.indexOf("."), val.length).length) - 1;
			// 需要补0的个数
			var zeroNum = eval(n - pointNum);
			var zero = "";
			for (i = 0; i < zeroNum; i++) {
				zero = zero + "0";
			}
			return val + zero;
		} else {
			// 符合需求直接返回
			return val;
		}
	} else {
		var zero = "0.";
		for (i = 0; i < n; i++) {
			zero = zero + "0"
		}
		return zero;
	}
}

/**
 * 校验字符是否全为数字
 * @param value
 * @returns
 */
function validateNumber(value) {
	var flag = true;
    var pattern = /^[0-9]\d*|$/; //匹配非负整数
    if (value != null && value != "") {
    	 //先把非数字的都替换掉，除了数字和.
        value  = value.replace(/[^\d.]/g, "");
        //必须保证第一个为数字而不是.
        value = value.replace(/^\./g, "");
        //保证只有出现一个.而没有多个.
        value = value.replace(/\.{2,}/g, ".");
        //保证.只出现一次，而不能出现两次以上
        value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        if (!pattern.test(value)) {
        	flag =  false;
        }
    }
    return flag;
}

/**
 * 校验是否为数字型,以及位数
 */
function checkNum(value,type,length) {
	var flag = true;
	if (value != null && value!="") {
		 var numFlag = validateNumber(value);
		    if(numFlag) {
		    	if (value.length > length) {
		    		flag = false;
		    		msg(type + "长度为" + length + "位,实际为:" + value.length + "位", "warning");
		    	}
		    }
		    else {
		    	flag = false;
		    }
	}
    return flag;
}

/**
 * 校验邮箱格式
 * @param mail
 * @returns {Boolean}
 */
function checkMail(mail) {
	if (mail == null || mail == "") {
		return true;
	}
	 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	 if (filter.test(mail)) {
		 return true;
	 }
	 else {
		 return false;
	 }
}

/**
 * 校验手机号码
 * @param phone
 * @returns {Boolean}
 */
function checkPhone(phone){
	var flag = true;
	if (phone == null || phone == "") {
		 return flag;
	}
    if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){
    	flag = false;
    }
    return flag;
}

/**
 * 校验电话号码
 * @param tel
 * @returns {Boolean}
 */
function checkTel(tel){
	var flag = true;
	if(!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)){
		flag = false;
	}
	return flag;
}
