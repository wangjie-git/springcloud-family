var dataType = $('#dataType').val();
var orgId = currentOrgId;;
function loadDataTable() {
        $('.qdate').bind('click', function() {
            WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true});
        });
        var now = new Date();
        var firstDate = getCurrentMonthFirst();
        var endDate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-"
                + now.getDate();
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();
        if (startTime == "") {
            firstDate =  firstDate.getFullYear() + "-" + (firstDate.getMonth() + 1) + "-"
            + firstDate.getDate();
            $("#startTime").val(firstDate);
        }
        if (endTime == "") {
            $("#endTime").val(endDate);
        }
        initOrgTree(currentOrgId);

}

function queryParams(params) {
    var data = $("#statSearchForm").serialize();
    data = data + "&limit=" + params.limit + "&offset=" + params.offset;
    return data;
}

function initOrgTree(orgId) {
    $("#orgSelect").combotree({
        url : "../orgnization/regionList?id=" + orgId + "&type=parent",
        valueField : 'id',
        textField : 'text',
        editable : false,
        onClick: function(node) {
            $("#orgId").val(node.id);
        },
        onBeforeExpand : function(node) {
            $(".orgTree").combotree("tree").tree("options").url = "../orgnization/regionList";
        },
        onLoadSuccess: function(node, data) {
            $('#orgSelect').combotree('setValue', orgId);
            $("#orgId").val(currentOrgId);
            $('#datatable').bootstrapTable({
                method : 'POST',
                url:'findDataCondition',
                striped : true,
                "queryParamsType" : "limit",
                dataType : "json",
                sidePagination : 'server',
                contentType : "application/x-www-form-urlencoded;charset=utf-8",
                clickToSelect : true,
                singleSelect : true,
                queryParams:queryParams,
                onLoadSuccess:loadTableCharts
            });
        }
   });
}

function loadTableCharts(data) {
    if (data.total == 0 || data == null) {
        $('#container').hide();
        return;
    }
    if (data.rows[0].orgId == currentParentOrgId) {
        return;
    }
    $('#container').show();
    $("#parentOrgId").val(data.rows[0].parentOrgId);
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    $('#container').highcharts({
        data: {
            table: 'datatable'
        },
        chart: {
            type: 'column'
        },
        title: {
            text: startTime + DATETODATE + endTime + YTJSCSJTJ
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: TIMES
            }
        },
        credits:{
            enabled:false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.series.name + ":" + this.y + '次</b>';
            }
        }
    });
}

function searchData(type) {
    $("#type").val(type);
    //$('#datatable').bootstrapTable('refresh', {url:'findDataCondition'});
    var data1 = $("#statSearchForm").serialize();
    $.post('findDataCondition', data1, function(data, status){
        if (status == 'success') {
            if (data.total == 0 || data == null) {
                $("#parentOrgId").val($("#orgId").val());
                $('#datatable').bootstrapTable('removeAll');
                $('#datatable').bootstrapTable('load', data);
                $("#back").hide();
                loadTableCharts(data);
                return;
            }
            else {
                $("#back").show();
            }
            if (data.rows[0].orgId == currentParentOrgId) {
                $('#datatable').bootstrapTable('removeAll');
                $('#datatable').bootstrapTable('load', data);
                loadTableCharts(data);
                return;
            }
            /**/
            $('#datatable').bootstrapTable('removeAll');
            $('#datatable').bootstrapTable('load', data);
            loadTableCharts(data);
        }
    });
}


function fomatterUrl(value, row, index) {
    if (row.orgClass == '5') {
        return value;
    }
    return "<a href='#' onclick='showStatDetail(\"" + row.orgId + "\", \"" + row.parentOrgId + "\",\"" + row.orgName +"\")'>" + value + "</a>";
}
function showStatDetail(orgId, parentOrgId,orgName) {
    $("#type").val('CHILDREN');
    $("#orgId").val(orgId);
    $("#orgSelect").combotree('setValue', orgName);
    $("#parentOrgId").val(parentOrgId);
    searchData('CHILDREN');

}

function goLastBack() {
    if ($("#orgId").val() == currentOrgId
            && $("#type").val() != "CHILDREN") {
        msg(ISTHELASTONE, "info");
        return;
    }
    $("#type").val('BACK');
    $("#orgId").val($("#parentOrgId").val());
    $.get("../orgnization/findOrgById?orgId=" + $("#orgId").val(), {}, function(data, status) {
        if (status == "success") {
            if ($("#orgId").val() == currentOrgId) {
                $("#orgSelect").combotree('setValue', data.orgName);
            } else {
                $("#orgSelect").combotree('setValue', data.parentOrgName);
            }
        }
    });

    searchData('BACK');
}

function showExportSetting() {
    $("input[name='field']").each(function() {
        $(this).get(0).checked = true
   });
    showModal("exportYtjscsjtjModal");
}

function exportData() {
    var flag = false;
    $("input[name='field']").each(function() {
        var c = $(this).get(0).checked;

        var id = $(this).attr("id");
        if (c == true && id != "orgName") {
            flag = true;
        }
   });
    if (flag) {
        $("#exportForm").submit();
    }
    else {
        msg("除了上传机构外，请至少选择一种需要导出的数据项","warning");
    }
}

function doForHistory() {
    $.post('doForHistoryData',{},function(data, status) {

    });
}

