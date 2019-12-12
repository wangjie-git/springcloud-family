$(window).load(function() {
    loadEmployees();
    loadWFXSelect();
    loadYYXSelect();
    loadSfSelect();
    loadZycSelect();
    loadWJYCSelect();
    loadEtconcepts();// 加载字典
    loadEtConceptsForCheckbox(); // 加载字典，checkbox可以多选
    loadEtconceptById();// 根据字典id查询字典
    loadRadios();
    loadRadioForEtconcept();
});

function loadRadioForEtconcept(){
     $("div[data-type='EtRADIO']").each(
                function() {
                    var _this = $(this);
                    var name = _this.attr('data-name');
                    var code = _this.attr('data-code');
                    var radio = "";
                    $.post("../etconcept/findEtConceptsByCode", {
                        "code" : code
                    }, function(data, status) {
                        if (status == "success") {
                             if (data != null && data.length > 0) {
                                 for (var i = 0; i < data.length; i++) {
                                     radio += '<input type="radio" name="' + name
                                     + '" value="'+data[i].id+'" title="'+data[i].conceptDesc+'">';
                                 }
                             }
                        }
                        _this.html(radio);
                        layui.use('form', function() {
                            var form = layui.form;
                            form.render();
                        });
                   });
                });
}

function loadRadios() {
    $("div[data-type='RADIOBX']").each(
            function() {
                var _this = $(this);
                var name = _this.attr('data-name');
                var filter = _this.attr('lay-filter');
                var check = _this.attr('data-checked');
                var show = _this.attr('data-show');
                var mutual = _this.attr('data-mutual');
                var checkbox = "";
                var radio = "";
                if(mutual == 'Y' ){
                     radio = '<input type="radio" name="' + name
                     + '" value="1" title="无" lay-filter="1' + name + '">'
                     + '<input type="radio" name="' + name
                     + '" value="2" title="有" lay-filter="2' + name + '">';
                     cutRadio(filter, "1" + name, check, show);
                     cutRadio(filter, "2" + name, check, show);
                }
                else{
                    radio = '<input type="radio" name="' + name
                    + '" value="1" title="无" lay-filter="1' + name + '">'
                    + '<input type="radio" name="' + name
                    + '" value="2" title="有" lay-filter="2' + name + '">'
                    + '<input type="radio" name="' + name
                    + '" value="3" title="不详" lay-filter="3' + name + '">';
                    cutRadio(filter, "1" + name, check, show);
                    cutRadio(filter, "2" + name, check, show);
                    cutRadio(filter, "3" + name, check, show);
                }
                _this.html(radio);
                layui.use('form', function() {
                    var form = layui.form;
                    form.render(null, filter);
                });
            });
}

function cutRadio(divfilter, filter, defaultValue, show) {
    layui.use('form', function() {
        var form = layui.form;
        form.on('radio(' + filter + ')', function(data) {
            var title = data.elem.title;
            var name = data.elem.name;
            if (title == defaultValue) {
                $("#" + show).attr("disabled", false);
                $("#" + show).removeClass("bgc");
            } else {
                $("#" + show).val("");
                $("#" + show).attr("disabled", true);
                $("#" + show).addClass("bgc");
            }
        });
        form.render(null, divfilter);
    });
}

function loadEtconceptById() {
    $("span[data-type='etconcept']").each(function() {
        var _this = $(this);
        var code = _this.attr("data-value");
        $.post("../etconcept/findEtConceptsByConceptId", {
            "id" : code
        }, function(data, status) {
            if (status == "success") {
                _this.text(data);
            }
        });
    });
}

/**
 * 加载固定字典1阴性、2阳性
 *
 * @returns
 */
function loadYYXSelect() {
    layui
            .use(
                    'form',
                    function() {
                        var form = layui.form;
                        $("select[data-type='ShowYYX']")
                                .each(
                                        function() {
                                            var _this = $(this);
                                            var code = _this.attr("data-show");
                                            var filter = _this
                                                    .attr("lay-filter");
                                            var option = "<option value=''></option><option value='1'>阴性</option><option value='2'>阳性</option>";
                                            _this.html(option);
                                            form.render('select', filter);
                                            form.on('select(' + filter + ')',
                                                    function(data) {
                                                        var value = data.value;
                                                        if (value == "2") {
                                                            inputShow(code);
                                                        } else {
                                                            inputHide(code);
                                                        }
                                                    });

                                        });
                    });
}

/**
 * 加载固定字典1未发现、2有
 *
 * @returns
 */
function loadWFXSelect() {
    layui
            .use(
                    'form',
                    function() {
                        var form = layui.form;
                        $("select[data-type='ShowWFS']")
                                .each(
                                        function() {
                                            var _this = $(this);
                                            var code = _this.attr("data-show");
                                            var filter = _this
                                                    .attr("lay-filter");
                                            var option = "<option value=''></option><option value='1'>未发现</option><option value='2'>有</option>";
                                            _this.html(option);
                                            form.render('select', filter);
                                            form.on('select(' + filter + ')',
                                                    function(data) {
                                                        var value = data.value;
                                                        if (value == "2") {
                                                            inputShow(code);
                                                        } else {
                                                            inputHide(code);
                                                        }
                                                    });

                                        });
                    });
}

/**
 * 加载固定字典1未见异常、2异常
 *
 * @returns
 */
function loadWJYCSelect() {
    layui
            .use(
                    'form',
                    function() {
                        var form = layui.form;
                        $("select[data-type='ShowWJYC']")
                                .each(
                                        function() {
                                            var _this = $(this);
                                            var code = _this.attr("data-show");
                                            var filter = _this
                                                    .attr("lay-filter");
                                            var option = "<option value=''></option><option value='1'>未见异常</option><option value='2'>异常</option>";
                                            _this.html(option);
                                            form.render('select', filter);
                                            form.on('select(' + filter + ')',
                                                    function(data) {
                                                        var value = data.value;
                                                        if (value == "2") {
                                                            inputShow(code);
                                                        } else {
                                                            inputHide(code);
                                                        }
                                                    });

                                        });
                    });
}

/**
 * 加载固定字典1是、2否
 *
 * @returns
 */
function loadSfSelect() {
    layui
            .use(
                    'form',
                    function() {
                        var form = layui.form;
                        $("select[data-type='ShowSF']")
                                .each(
                                        function() {
                                            var _this = $(this);
                                            var code = _this.attr("data-show");
                                            var filter = _this
                                                    .attr("lay-filter");
                                            var option = "<option value=''></option><option value='1'>否</option><option value='2'>是</option>";
                                            _this.html(option);
                                            form.render('select', filter);
                                            form.on('select(' + filter + ')',
                                                    function(data) {
                                                        var value = data.value;
                                                        if (value == "2") {
                                                            inputShow(code);
                                                        } else {
                                                            inputHide(code);
                                                        }
                                                    });

                                        });
                    });
}

/**
 * 加载固定字典1正常、2异常下拉框
 *
 * @returns
 */
function loadZycSelect() {
    $("select[data-type='ShowZYC']")
            .each(
                    function() {
                        var _this = $(this);
                        var code = _this.attr("data-show");
                        var filter = _this.attr("lay-filter");
                        var option = "<option value=''></option><option value='1'>正常</option><option value='2'>异常</option>";
                        _this.html(option);
                        layui.use('form', function() {
                            var form = layui.form;
                            form.render('select', filter);
                            form.on('select(' + filter + ')', function(data) {
                                var value = data.value;
                                if (value == "2") {
                                    inputShow(code);
                                } else {
                                    inputHide(code);
                                }
                            });
                        });
                    });
}

/**
 * 加载字典下拉框
 */
function loadEtconcepts() {
    // 加载基本字典
    layui.use('form', function() {
        var form = layui.form;
        $("select[data-type='etconcept']").each(
                function() {
                    var _this = $(this);
                    var code = _this.attr("data-code");
                    var id = _this.attr("id");
                    var filter = _this.attr("lay-filter");
                    var matching = _this.attr("data-match");
                    var show = _this.attr("data-show");
                    $.post("../etconcept/findEtConceptsByCode", {
                        "code" : code
                    }, function(data, status) {
                        if (status == "success") {
                            var option = "<option value=''></option>";
                            if (data != null && data.length > 0) {
                                for (var i = 0; i < data.length; i++) {
                                    option += "<option value=" + data[i].id
                                            + ">" + data[i].conceptDesc
                                            + "</option>";
                                }
                                _this.html(option);
                            }
                            form.render('select', filter);
                            if (matching != null && matching != "") {
                                form.on('select(' + filter + ')',
                                        function(data) {
                                            var text = $("#" + id).find(
                                                    "option:selected").text();
                                            if (text == matching) {
                                                inputShow(show);
                                            } else {
                                                inputHide(show);
                                            }
                                        });
                            }
                        }
                    });
                });
    });
}

/**
 * 加载字典复选框
 *
 * @returns
 */
function loadEtConceptsForCheckbox() {
    $("div[data-type='etconcept']").each(
            function() {
                var _this = $(this);
                var code = _this.attr("data-code");
                var mutual = _this.attr('data-mutual');
                var defaultValue = _this.attr('data-default');
                var name = _this.attr('data-name');
                var filter = _this.attr('lay-filter');
                var select = _this.attr('data-select');
                var disable = _this.attr('data-disable');
                var checkbox = "";
                $.post("../etconcept/findEtConceptsByCode", {
                    "code" : code
                }, function(data, status) {
                    if (status == "success") {
                        for (var i = 0; i < data.length; i++) {
                            var ifilter = data[i].id;
                            if (mutual == "Y") {
                                var clickTh = "cutboxs('" + filter + "','"
                                        + select + "''" + disable + "')";
                                checkbox += '<input type="checkbox" name="'
                                        + name + '" title="'
                                        + data[i].conceptDesc + '" value="'
                                        + ifilter
                                        + '" lay-skin="primary" lay-filter="'
                                        + ifilter + '">';
                                cutboxs(ifilter, select, disable, defaultValue,
                                        filter);

                            } else {
                                checkbox += '<input type="checkbox"  name="'
                                        + name + '" title="'
                                        + data[i].conceptDesc + '" value="'
                                        + ifilter + '" lay-skin="primary">';
                            }
                        }
                        _this.html(checkbox);
                        layui.use('form', function() {
                            var form = layui.form;
                            form.render(null, filter); // 更新 lay-filter="test2"
                            // 所在容器内的全部 select 状态
                            // 各种基于事件的操作，下面会有进一步介绍
                        });
                    }
                });
            });
}

/**
 * 字典复选框切换事件
 *
 * @param filter
 * @param select
 * @param disable
 * @param defaultValue
 * @param divFilter
 * @returns
 */
function cutboxs(filter, select, disable, defaultValue, divFilter) {
    layui.use('form', function() {
        var form = layui.form;
        form.on('checkbox(' + filter + ')', function(data) {
            var title = data.elem.title;
            var name = data.elem.name;
            var flag = data.elem.checked;
            if (title == defaultValue) {
                initCheckbox(name, title, divFilter, disable);
            } else if (title == select) {
                if (flag) {
                    initDefaultCheck(name, defaultValue, divFilter, disable);
                    inputShow(disable);
                } else {
                    inputHide(disable);
                }
            } else {
                if (flag) {
                    initDefaultCheck(name, defaultValue, divFilter, disable);
                }
            }
        });
        form.render(null, divFilter);
    });
}

/**
 * 复选框点击事件
 *
 * @param name
 * @param currentValue
 * @param filter
 * @param disable
 * @returns
 */
function initCheckbox(name, currentValue, filter, disable) {
    $("input[name=" + name + "]").each(function() {
        var title = $(this).attr("title");
        if (title != currentValue) {
            $(this).prop("checked", false);
        } else {
            inputHide(disable);
        }
    });
    layui.use('form', function() {
        var form = layui.form;
        form.render(null, filter);
    });
}

/**
 * 字典复选框互斥事件
 *
 * @param name
 * @param defaultValue
 * @param filter
 * @param disable
 * @returns
 */
function initDefaultCheck(name, defaultValue, filter, disable) {
    $("input[name=" + name + "]").each(function() {
        var title = $(this).attr("title");
        if (title == defaultValue) {
            $(this).prop("checked", false);
        }
        if (defaultValue == "") {

        } else {
            inputHide(disable);
        }
    });
    layui.use('form', function() {
        var form = layui.form;
        form.render(null, filter);
    });
}

/**
 * 与字典互斥元素的隐藏方法
 *
 * @param disable
 * @returns
 */
function inputHide(disable) {
    $("#" + disable).val("");
    $("#" + disable).attr("disabled", true);
    $("#" + disable).addClass("bgc");
}

/**
 * 与字典互斥元素的显示方法
 *
 * @param disable
 * @returns
 */
function inputShow(disable) {
    $("#" + disable).attr("disabled", false);
    $("#" + disable).removeClass("bgc");
}

function getParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); // 固定写法
    if (r != null)
        return unescape(r[2]);
    return null;
}