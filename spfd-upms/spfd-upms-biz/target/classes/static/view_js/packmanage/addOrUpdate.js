var maxOrderNum = 0;
layui.use(['form', 'layedit', 'laydate','laytpl','table'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,laytpl = layui.laytpl
  ,table = layui.table
  ,$ = layui.$;

  var result = [];
  var icount = 1;

    // 获取url指定参数值
    function GetQueryString(name) {
        var reg = new RegExp(("(^|&)"+name+"=([^&]*)(&|$)"));
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);return null;
    }

    // 页面初始化需要用到 请求数据
    function reqdata(){
        var packId = GetQueryString('packId');

        if(packId!=null){
            var index = layer.load();
            $.ajax({
                url : "../../packmanage/packDetailInfo",
                type : "GET",
                data : {"packId":packId},
                dataType : "json",
                success : function(result) {
                    htmlTpl(result, '#demoTpl', '#packManageTable', function(){
                    	var selectedLabels = result.selectedLabels;
                    	var groupCheckbox = $("input:checkbox[name='allLabels']");
                      	for (i = 0; i < groupCheckbox.length; i++) {
                  	      var val =groupCheckbox[i].value;
                  	      	if(selectedLabels != null && selectedLabels.length > 0){
                  	      		for (j = 0; j < selectedLabels.length;j++) {
                  	      			var selectedId = selectedLabels[j].labelid;
                  	      			if(val == selectedId){
	                    	    	  groupCheckbox[i].checked=true;
	                    	    	  break;
                  	      			}
                  	      		}
                  	      	}

                    	}
                        layer.close(index);
                        var packTypeValue = $("#packType").val();
                        if(packTypeValue=="2"){
                        	 $("#priceTr").show();
                        	 $("#servicePrice").attr("lay-verify","required|length");
                    		 $("#discountPrice").attr("lay-verify","required|length|limitPriceNum")
                    	 }else{
                    		 $("#servicePrice").attr("lay-verify","length");
                    		 $("#discountPrice").attr("lay-verify","length|limitPriceNum");
                    		 $("#priceTr").hide();
                    	 }
                        form.render();
                    })
                    var bigProjects = result.bigProjects;

                   if(bigProjects != null && bigProjects.length > 0){
                	   var lastBigObj = bigProjects[bigProjects.length-1];
                       if(lastBigObj.smallProjectDtos && lastBigObj.smallProjectDtos.length > 0){
                       	maxOrderNum  = lastBigObj.smallProjectDtos[lastBigObj.smallProjectDtos.length - 1].smallOrderNum;
                       }else{
                       	maxOrderNum = lastBigObj.bigOrderNum;
                       }
            		for (var i = 0; i< bigProjects.length; i++) {
            			if(i==0){
            				document.getElementById("item0bigId").value = bigProjects[i].bigId;
            				document.getElementById("item0projectName").value = bigProjects[i].projectName;
            				document.getElementById("item0serviceType").value = bigProjects[i].serviceType;
            				document.getElementById("item0cycleUnit").value = bigProjects[i].cycleUnit;
            				document.getElementById("item0cycleTotal").value = bigProjects[i].cycleTotal;
            				document.getElementById("item0projectStatus").value = bigProjects[i].projectStatus;
            				document.getElementById("item0OriginalPrice").value = bigProjects[i].bigOriginalPrice;
            				document.getElementById("item0PresentPrice").value = bigProjects[i].bigPresentPrice;
            				document.getElementById("item0projectDetails").value = bigProjects[i].projectDetails;
            				document.getElementById("item0publicHealthPay").value = bigProjects[i].publicHealthPay;
            				document.getElementById("item0medicalInsurancePay").value = bigProjects[i].medicalInsurancePay;
            				//禁止编辑
            				document.getElementById("item0projectName").disabled="disabled";
            				document.getElementById("item0serviceContent").disabled="disabled";
            				document.getElementById("item0serviceType").disabled="disabled";
            				document.getElementById("item0cycleUnit").disabled="disabled";
            				document.getElementById("item0cycleTotal").disabled="disabled";
            				document.getElementById("item0deleteBigButton").disabled="disabled";
            				document.getElementById("item0OriginalPrice").disabled="disabled";
            				document.getElementById("item0PresentPrice").disabled="disabled";
            				document.getElementById("item0projectDetails").disabled="disabled";
            				document.getElementById("item0publicHealthPay").disabled="disabled";
            				document.getElementById("item0medicalInsurancePay").disabled="disabled";
            				//为input和button添加不可编辑的样式
            				$("#item0projectName").addClass("layui-btn-disabled");
            				$("#item0cycleTotal").addClass("layui-btn-disabled");
            				$("#item0deleteBigButton").addClass("layui-btn-disabled");
            				$("#item0OriginalPrice").addClass("layui-btn-disabled");
            				$("#item0PresentPrice").addClass("layui-btn-disabled");
            				$("#item0projectDetails").addClass("layui-btn-disabled");
            				$("#item0publicHealthPay").addClass("layui-btn-disabled");
            				$("#item0medicalInsurancePay").addClass("layui-btn-disabled");

            				form.render();

            				if(bigProjects[i].serviceType == '9'){
            					var btn = document.getElementById("item0addButton");
            					btn.setAttribute("style","display: inline-block");
            				    form.render();
            				}
            				if(bigProjects[i].serviceType == '1'){

            					var optionLists =  '<option value="">请选择</option><option value="14">心电</option><option value="11">血压</option><option value="15">血氧</option><option value="13">尿常规</option><option value="12">血糖</option>'
            		        		+'<option value="16">体温</option><option value="20">白细胞</option><option value="17">血红蛋白</option><option value="18">糖化血红蛋白</option><option value="19">血脂</option>'
            		        		+'<option value="21">身高</option><option value="22">体重</option>';
            					document.getElementById("item0serviceContent").innerHTML=optionLists;
            					form.render();
                				document.getElementById("item0serviceContent").value = bigProjects[i].serviceContent;
                				form.render();
            				}
            				if(bigProjects[i].serviceType == '3'){
            					var optionLists =  '<option value="">请选择</option><option value="30">健康档案</option><option value="31">健康体检</option><option value="32">预防接种</option>'
            		        		+'<option value="33">儿童</option><option value="34">孕产妇</option><option value="35">老年人</option>'
            		        		+'<option value="36">高血压</option><option value="37">糖尿病</option><option value="38">严重精神障碍</option><option value="39">肺结核</option>';
            					document.getElementById("item0serviceContent").innerHTML=optionLists;
            					form.render();
                				document.getElementById("item0serviceContent").value = bigProjects[i].serviceContent;
                				form.render();
            				}
            				var smallProjectDtos = bigProjects[i].smallProjectDtos;
            				if(smallProjectDtos != null && smallProjectDtos.length > 0){

            	            		for (var j = 0; j< smallProjectDtos.length; j++) {
            	            			var html2=$('#demoTpl3').html();
                 				        html2=html2.replace(/XXX/g,"0");
            	            			html2=html2.replace(/YYY/g,""+j);
            	            			$(".add-item-btn").eq(i).parents("tr").nextAll(".tr1").eq(0).before(html2);
            	            			form.render();
                 				        document.getElementById("item0_"+j+"smallId").value=smallProjectDtos[j].smallId;
                 				        document.getElementById("item0_"+j+"serviceItem").value=smallProjectDtos[j].serviceItem;
                 				        document.getElementById("item0_"+j+"serviceType").value=smallProjectDtos[j].serviceType;
                 				        document.getElementById("item0_"+j+"cycleUnit").value=smallProjectDtos[j].cycleUnit;
                 				        document.getElementById("item0_"+j+"cycleTotal").value=smallProjectDtos[j].cycleTotal;
                 				        document.getElementById("item0_"+j+"projectStatus").value=smallProjectDtos[j].projectStatus;
                 				        document.getElementById("item0_"+j+"smallOriginalPrice").value=smallProjectDtos[j].smallOriginalPrice;
                 				        document.getElementById("item0_"+j+"smallPresentPrice").value=smallProjectDtos[j].smallPresentPrice;
                 				        document.getElementById("item0_"+j+"smallProjectDetails").value=smallProjectDtos[j].projectDetails;
                 				        document.getElementById("item0_"+j+"smallpublicHealthPay").value=smallProjectDtos[j].publicHealthPay;
                 				        document.getElementById("item0_"+j+"smallMedicalInsurancePay").value=smallProjectDtos[j].medicalInsurancePay;

                         				document.getElementById("item0_"+j+"serviceItem").disabled="disabled";
                         				document.getElementById("item0_"+j+"serviceType").disabled="disabled";
                         				document.getElementById("item0_"+j+"serviceContent").disabled="disabled";
                         				document.getElementById("item0_"+j+"cycleUnit").disabled="disabled";
                         				document.getElementById("item0_"+j+"cycleTotal").disabled="disabled";
                         				document.getElementById("item0_"+j+"deleteSmallButton").disabled="disabled";
                         				document.getElementById("item0_"+j+"smallOriginalPrice").disabled="disabled";
                         				document.getElementById("item0_"+j+"smallPresentPrice").disabled="disabled";
                         				document.getElementById("item0_"+j+"smallProjectDetails").disabled="disabled";
                         				document.getElementById("item0_"+j+"smallpublicHealthPay").disabled="disabled";
                         				document.getElementById("item0_"+j+"smallMedicalInsurancePay").disabled="disabled";

                         				$("#item0_"+j+"serviceItem").addClass("layui-btn-disabled");
                         				$("#item0_"+j+"cycleTotal").addClass("layui-btn-disabled");
                         				$("#item0_"+j+"deleteSmallButton").addClass("layui-btn-disabled");
                         				$("#item0_"+j+"smallOriginalPrice").addClass("layui-btn-disabled");
                         				$("#item0_"+j+"smallPresentPrice").addClass("layui-btn-disabled");
                         				$("#item0_"+j+"smallProjectDetails").addClass("layui-btn-disabled");
                         				$("#item0_"+j+"smallpublicHealthPay").addClass("layui-btn-disabled");
                         				$("#item0_"+j+"smallMedicalInsurancePay").addClass("layui-btn-disabled");

                         				form.render();


                 				         if(smallProjectDtos[j].serviceType == '1'){
                         					var optionLists =  '<option value="">请选择</option><option value="14">心电</option><option value="11">血压</option><option value="15">血氧</option><option value="13">尿常规</option><option value="12">血糖</option>'
                        		        		+'<option value="16">体温</option><option value="20">白细胞</option><option value="17">血红蛋白</option><option value="18">糖化血红蛋白</option><option value="19">血脂</option>'
                        		        		+'<option value="21">身高</option><option value="22">体重</option>';
                        					document.getElementById("item0_"+j+"serviceContent").innerHTML=optionLists;
                        					form.render();
                            				document.getElementById("item0_"+j+"serviceContent").value = smallProjectDtos[j].serviceContent;
                            				form.render();
                        				}
                 				        if(smallProjectDtos[j].serviceType == '3'){
                 				        	var optionLists =  '<option value="">请选择</option><option value="30">健康档案</option><option value="31">健康体检</option><option value="32">预防接种</option>'
                        		        		+'<option value="33">儿童</option><option value="34">孕产妇</option><option value="35">老年人</option>'
                        		        		+'<option value="36">高血压</option><option value="37">糖尿病</option><option value="38">严重精神障碍</option><option value="39">肺结核</option>';
                        					document.getElementById("item0_"+j+"serviceContent").innerHTML=optionLists;
                        					form.render();
                            				document.getElementById("item0_"+j+"serviceContent").value = smallProjectDtos[j].serviceContent;
                            				form.render();
                        				}
                 				   	     form.render();
            	            		}

            				}
            			}else{
            			        var html=$('#demoTpl2').html();
            			        html=html.replace(/XXX/g,""+icount);
            			        $(".add-btn").parents("tr").before(html);
            			        form.render();
                				document.getElementById("item"+i+"bigId").value = bigProjects[i].bigId;
                				document.getElementById("item"+i+"projectName").value = bigProjects[i].projectName;
                				document.getElementById("item"+i+"serviceType").value = bigProjects[i].serviceType;
                				document.getElementById("item"+i+"cycleUnit").value = bigProjects[i].cycleUnit;
                				document.getElementById("item"+i+"cycleTotal").value = bigProjects[i].cycleTotal;
                				document.getElementById("item"+i+"projectStatus").value = bigProjects[i].projectStatus;
                				document.getElementById("item"+i+"OriginalPrice").value = bigProjects[i].bigOriginalPrice;
                				document.getElementById("item"+i+"PresentPrice").value = bigProjects[i].bigPresentPrice;
                				document.getElementById("item"+i+"projectDetails").value = bigProjects[i].projectDetails;
                				document.getElementById("item"+i+"publicHealthPay").value = bigProjects[i].publicHealthPay;
                				document.getElementById("item"+i+"medicalInsurancePay").value = bigProjects[i].medicalInsurancePay;

                				document.getElementById("item"+i+"projectName").disabled="disabled";
                				document.getElementById("item"+i+"serviceType").disabled="disabled";
                				document.getElementById("item"+i+"serviceContent").disabled="disabled";
                				document.getElementById("item"+i+"cycleUnit").disabled="disabled";
                				document.getElementById("item"+i+"cycleTotal").disabled="disabled";
                				document.getElementById("item"+i+"deleteBigButton").disabled="disabled";
                				document.getElementById("item"+i+"OriginalPrice").disabled="disabled";
                				document.getElementById("item"+i+"PresentPrice").disabled="disabled";
                				document.getElementById("item"+i+"projectDetails").disabled="disabled";
                				document.getElementById("item"+i+"publicHealthPay").disabled="disabled";
                				document.getElementById("item"+i+"medicalInsurancePay").disabled="disabled";

                				$("#item"+i+"projectName").addClass("layui-btn-disabled");
                				$("#item"+i+"cycleTotal").addClass("layui-btn-disabled");
                				$("#item"+i+"deleteBigButton").addClass("layui-btn-disabled");
                				$("#item"+i+"OriginalPrice").addClass("layui-btn-disabled");
                				$("#item"+i+"PresentPrice").addClass("layui-btn-disabled");
                				$("#item"+i+"projectDetails").addClass("layui-btn-disabled");
                				$("#item"+i+"publicHealthPay").addClass("layui-btn-disabled");
                				$("#item"+i+"medicalInsurancePay").addClass("layui-btn-disabled");

                				form.render();
                				if(bigProjects[i].serviceType == '9'){
                					var btn = document.getElementById("item"+i+"addButton");
                					btn.setAttribute("style","display: inline-block");
                				    form.render();
                				}
                				if(bigProjects[i].serviceType == '1'){
                					var optionLists =  '<option value="">请选择</option><option value="14">心电</option><option value="11">血压</option><option value="15">血氧</option><option value="13">尿常规</option><option value="12">血糖</option>'
                		        		+'<option value="16">体温</option><option value="20">白细胞</option><option value="17">血红蛋白</option><option value="18">糖化血红蛋白</option><option value="19">血脂</option>'
                		        		+'<option value="21">身高</option><option value="22">体重</option>';
                					document.getElementById("item"+i+"serviceContent").innerHTML=optionLists;
                					form.render();
                    				document.getElementById("item"+i+"serviceContent").value = bigProjects[i].serviceContent;
                    				form.render();
                				}
                				if(bigProjects[i].serviceType == '3'){
                					var optionLists =  '<option value="">请选择</option><option value="30">健康档案</option><option value="31">健康体检</option><option value="32">预防接种</option>'
                		        		+'<option value="33">儿童</option><option value="34">孕产妇</option><option value="35">老年人</option>'
                		        		+'<option value="36">高血压</option><option value="37">糖尿病</option><option value="38">严重精神障碍</option><option value="39">肺结核</option>';
                					document.getElementById("item"+i+"serviceContent").innerHTML=optionLists;
                					form.render();
                    				document.getElementById("item"+i+"serviceContent").value = bigProjects[i].serviceContent;
                    				form.render();
                				}
                				form.render();
                				var smallProjectDtos = bigProjects[i].smallProjectDtos;

                				if(smallProjectDtos != null && smallProjectDtos.length > 0){

            	            		for (var j = 0; j < smallProjectDtos.length; j++) {
            	            			 var html2=$('#demoTpl3').html();
                				         var ii=$(".add-item-btn").parents("tr").attr("data-id");
                				         html2=html2.replace(/XXX/g,""+ii);
            	            			 html2=html2.replace(/YYY/g,""+ j);
           	            			     $(".add-item-btn").eq(i).parents("tr").nextAll(".tr1").eq(0).before(html2);
                				         form.render();
                				         document.getElementById("item"+i+"_"+j+"smallId").value=smallProjectDtos[j].smallId;
                				         document.getElementById("item"+i+"_"+j+"serviceItem").value=smallProjectDtos[j].serviceItem;
                				         document.getElementById("item"+i+"_"+j+"serviceType").value=smallProjectDtos[j].serviceType;
                				         document.getElementById("item"+i+"_"+j+"cycleUnit").value=smallProjectDtos[j].cycleUnit;
                				         document.getElementById("item"+i+"_"+j+"cycleTotal").value=smallProjectDtos[j].cycleTotal;
                				         document.getElementById("item"+i+"_"+j+"projectStatus").value=smallProjectDtos[j].projectStatus;
                				         document.getElementById("item"+i+"_"+j+"smallOriginalPrice").value=smallProjectDtos[j].smallOriginalPrice;
                				         document.getElementById("item"+i+"_"+j+"smallPresentPrice").value=smallProjectDtos[j].smallPresentPrice;
                				         document.getElementById("item"+i+"_"+j+"smallProjectDetails").value=smallProjectDtos[j].projectDetails;
                				         document.getElementById("item"+i+"_"+j+"smallpublicHealthPay").value=smallProjectDtos[j].publicHealthPay;
                				         document.getElementById("item"+i+"_"+j+"smallMedicalInsurancePay").value=smallProjectDtos[j].medicalInsurancePay;

                				         document.getElementById("item"+i+"_"+j+"serviceItem").disabled="disabled";
                				         document.getElementById("item"+i+"_"+j+"serviceType").disabled="disabled";
                				         document.getElementById("item"+i+"_"+j+"serviceContent").disabled="disabled";
                				         document.getElementById("item"+i+"_"+j+"cycleUnit").disabled="disabled";
                				         document.getElementById("item"+i+"_"+j+"cycleTotal").disabled="disabled";
                				         document.getElementById("item"+i+"_"+j+"deleteSmallButton").disabled="disabled";
                				         document.getElementById("item"+i+"_"+j+"smallOriginalPrice").disabled="disabled";
                				         document.getElementById("item"+i+"_"+j+"smallPresentPrice").disabled="disabled";
                				         document.getElementById("item"+i+"_"+j+"smallProjectDetails").disabled="disabled";
                				         document.getElementById("item"+i+"_"+j+"smallpublicHealthPay").disabled="disabled";
                				         document.getElementById("item"+i+"_"+j+"smallMedicalInsurancePay").disabled="disabled";

                				     	$("#item"+i+"_"+j+"serviceItem").addClass("layui-btn-disabled");
                        				$("#item"+i+"_"+j+"cycleTotal").addClass("layui-btn-disabled");
                        				$("#item"+i+"_"+j+"deleteSmallButton").addClass("layui-btn-disabled");
                        				$("#item"+i+"_"+j+"smallOriginalPrice").addClass("layui-btn-disabled");
                        				$("#item"+i+"_"+j+"smallPresentPrice").addClass("layui-btn-disabled");
                        				$("#item"+i+"_"+j+"smallProjectDetails").addClass("layui-btn-disabled");
                        				$("#item"+i+"_"+j+"smallpublicHealthPay").addClass("layui-btn-disabled");
                        				$("#item"+i+"_"+j+"smallMedicalInsurancePay").addClass("layui-btn-disabled");

                				         form.render();
                				         if(smallProjectDtos[j].serviceType == '1'){
                         					var optionLists =  '<option value="">请选择</option><option value="14">心电</option><option value="11">血压</option><option value="15">血氧</option><option value="13">尿常规</option><option value="12">血糖</option>'
                        		        		+'<option value="16">体温</option><option value="20">白细胞</option><option value="17">血红蛋白</option><option value="18">糖化血红蛋白</option><option value="19">血脂</option>'
                        		        		+'<option value="21">身高</option><option value="22">体重</option>';
                         					document.getElementById("item"+i+"_"+j+"serviceContent").innerHTML=optionLists;
                         					form.render();
                             				document.getElementById("item"+i+"_"+j+"serviceContent").value = smallProjectDtos[j].serviceContent;
                             				form.render();
                         				}
                  				        if(smallProjectDtos[j].serviceType == '3'){
                  				        	var optionLists =  '<option value="">请选择</option><option value="30">健康档案</option><option value="31">健康体检</option><option value="32">预防接种</option>'
                         		        		+'<option value="33">儿童</option><option value="34">孕产妇</option><option value="35">老年人</option>'
                         		        		+'<option value="36">高血压</option><option value="37">糖尿病</option><option value="38">严重精神障碍</option><option value="39">肺结核</option>';
                         					document.getElementById("item"+i+"_"+j+"serviceContent").innerHTML=optionLists;
                         					form.render();
                             				document.getElementById("item"+i+"_"+j+"serviceContent").value = smallProjectDtos[j].serviceContent;
                             				form.render();
                         				}
                				         form.render();
            	            		}
                				}
            			        icount++;

            			}

            		}
                }

                },
                error:function(msg){
                    layer.msg('未连到服务器')
                    layer.close(index);
                }
            })
        }else{
          //  var result=[];
            htmlTpl(result, '#demoTpl', '#packManageTable', function(){
                form.render();
            })
        }
    }
    reqdata();



    var $ = layui.$, active = {  add: function(){
        var html=$('#demoTpl2').html();
        html=html.replace(/XXX/g,""+icount);
        $(this).parents("tr").before(html);
        form.render();
        icount++;
    },
    add2: function(){
        var html2=$('#demoTpl3').html();
        var ii=$(this).parents("tr").attr("data-id");
        html2=html2.replace(/XXX/g,""+ii);
        $(this).parents("tr").nextAll(".tr1").eq(0).before(html2);
        form.render();
    },
    delete1: function(){
    	 var obj = $(this);
    	layer.confirm('子项也会一并删除,确定删除吗?', function(index){
    		    deleteBigItem(obj);
    	        layer.close(index);
    	 });

    },
    delete2: function(){
        $(this).parents("tr").remove();
    },
    load:function () {
        layer.tips('在上面<br>123',this,{
            tips:  [1, '#aaa'],time:5000,shadeClose:true,shade: [0.01, '#ffffff']
        });
    }

    };



    //监听提交 提交data.field即可
    form.on('submit(formDemo)', function(data){
    	var num = icount;
    	data.field.bigProjects = [];
    	if(data.field.servicePrice && data.field.discountPrice){
    		var servicePrice = parseInt(data.field.servicePrice);
    		var discountPrice = parseInt(data.field.discountPrice);
    		if(servicePrice>=100000 || discountPrice >= 100000){
    			 layer.msg('价格不能超过十万以上!');
         		  return;
    		}
    	}
    	//服务年限的单位值
    	var packCycleUnitValue = parseInt($("#packCycleUnit").val());

    	for(j = 0; j < num; j++) {

    		var projectNameArr = document.getElementsByName("item"+j+"projectName");
    		if(projectNameArr != null && projectNameArr.length > 0){
    			var bigProject = {};
    			bigProject.bigId = document.getElementsByName("item"+j+"bigId")[0].value;
    			bigProject.projectName = document.getElementsByName("item"+j+"projectName")[0].value;
        		bigProject.serviceType = document.getElementsByName("item"+j+"serviceType")[0].value;
        		bigProject.serviceContent = document.getElementsByName("item"+j+"serviceContent")[0].value;
        		bigProject.cycleUnit = document.getElementsByName("item"+j+"cycleUnit")[0].value;
        		var bigUnitValue = parseInt(bigProject.cycleUnit);
        		if(bigUnitValue < packCycleUnitValue){
        		  layer.msg('项目的履约格式单位不能大于服务年限单位!');
          		  return;
        		}
        		bigProject.cycleTotal = document.getElementsByName("item"+j+"cycleTotal")[0].value;
        		bigProject.projectStatus = document.getElementsByName("item"+j+"projectStatus")[0].value;
        		bigProject.bigOriginalPrice = document.getElementsByName("item"+j+"OriginalPrice")[0].value;
        		bigProject.bigPresentPrice = document.getElementsByName("item"+j+"PresentPrice")[0].value;
        		bigProject.projectDetails = document.getElementsByName("item"+j+"projectDetails")[0].value;
        		bigProject.publicHealthPay = document.getElementsByName("item"+j+"publicHealthPay")[0].value;
        		bigProject.medicalInsurancePay = document.getElementsByName("item"+j+"medicalInsurancePay")[0].value;

        		var smallSmallIdArr =  document.getElementsByName("item"+j+"smallId");
        		var smallServiceItemArr =  document.getElementsByName("item"+j+"smallServiceItem");
        		var smallServiceTypeArr =  document.getElementsByName("item"+j+"smallServiceType");
        		var smallServiceContentArr =  document.getElementsByName("item"+j+"smallServiceContent");
        		var smallSycleUnitArr =  document.getElementsByName("item"+j+"smallCycleUnit");
        		var smallCycleTotalArr =  document.getElementsByName("item"+j+"smallCycleTotal");
        		var smallProjectStatusArr =  document.getElementsByName("item"+j+"smallProjectStatus");
        		var smallOriginalPrice =  document.getElementsByName("item"+j+"smallOriginalPrice");
        		var smallPresentPrice =  document.getElementsByName("item"+j+"smallPresentPrice");
        		var smallProjectDetails =  document.getElementsByName("item"+j+"smallProjectDetails");
        		var smallpublicHealthPay =  document.getElementsByName("item"+j+"smallpublicHealthPay");
        		var smallMedicalInsurancePay =  document.getElementsByName("item"+j+"smallMedicalInsurancePay");
        		bigProject.smallProjectDtos = [];
        		if(bigProject.serviceType == '9' && smallServiceItemArr.length == 0){
        			layer.msg("组合类【"+bigProject.projectName+"】不能没有执行项！");
            		return;
        		}
        		for (var i = 0; i< smallServiceItemArr.length; i++) {
        			var smallProject = {};
        			smallProject.smallId = smallSmallIdArr[i].value;
        			smallProject.serviceItem = smallServiceItemArr[i].value;
        			smallProject.serviceType = smallServiceTypeArr[i].value;
        			smallProject.serviceContent = smallServiceContentArr[i].value;
        			smallProject.cycleUnit = smallSycleUnitArr[i].value;
        			smallProject.smallOriginalPrice = smallOriginalPrice[i].value;
        			smallProject.smallPresentPrice = smallPresentPrice[i].value;
        			smallProject.projectDetails = smallProjectDetails[i].value;
        			smallProject.publicHealthPay = smallpublicHealthPay[i].value;
        			smallProject.medicalInsurancePay = smallMedicalInsurancePay[i].value;
            		var smallUnitValue = parseInt(smallProject.cycleUnit);
            		if(smallUnitValue < bigUnitValue){
              		  	  layer.msg('执行项的履约格式单位不能大于项目的履约格式单位!');
                		  return;
              		}
        			smallProject.cycleTotal = smallCycleTotalArr[i].value;
        			smallProject.projectStatus = smallProjectStatusArr[i].value;
        			bigProject.smallProjectDtos.push(smallProject);
            	}

        		data.field.bigProjects.push(bigProject);
    		}

    	}

    	var param = new Object();
        var packId = GetQueryString('packId');
        param.packId = packId;
    	param.bigProjects = [];
    	param.bigProjects = data.field.bigProjects;
    	param.packType = data.field.packType;
    	param.packName = data.field.packName;
    	param.packAgeMin = data.field.packAgeMin;
    	param.packAgeMax = data.field.packAgeMax;
    	param.packSexLimit = data.field.packSexLimit;
    	param.packCycleNum = data.field.packCycleNum;
    	param.packCycleUnit = data.field.packCycleUnit;
    	param.packStatus = data.field.packStatus;
    	param.servicePrice = data.field.servicePrice;
    	param.discountPrice = data.field.discountPrice;
    	var selectedLabels = [];
		var labelsArr = document.getElementsByName("allLabels");
		for (var i = 0; i< labelsArr.length; i++) {
			if(labelsArr[i].checked){
				var selectedObj = {};
				selectedObj.labelid = labelsArr[i].value;
				selectedObj.labelName = labelsArr[i].title;
				selectedLabels.push(selectedObj);
			}
		}
		param.selectedLabels = selectedLabels;
		param.maxOrderNum = maxOrderNum;
        $.ajax({
            url : "../../packmanage/packAddOrUpdate",
            type : "POST",
            data : JSON.stringify(param),
            dataType : "json",
            contentType:"application/json",
            success : function(result) {
                // todo 提示 & 重新显示表格数据
                layer.msg('添加/修改成功');
                //设置延迟1.2秒钟加载
                setTimeout("window.location.href='../packmanage/index.html'",1);
            },
            error:function(msg){
                layer.msg('未连到服务器')
            }
        })


    });



    $("body").delegate(".layui-btn","click",function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    $('.search-info-btn').on('click', function(){
          var type ="load";
          active[type] ? active[type].call(this) : '';
      });


    form.on('select(select1)', function(data){
        if(data.value==9){
            $(this).parents('tr').find('.add-item-btn').show();
        }else{
            $(this).parents('tr').find('.add-item-btn').hide();
        }
        if(data.value==1){
			var optionLists =  '<option value="">请选择</option><option value="14">心电</option><option value="11">血压</option><option value="15">血氧</option><option value="13">尿常规</option><option value="12">血糖</option>'
        		+'<option value="16">体温</option><option value="20">白细胞</option><option value="17">血红蛋白</option><option value="18">糖化血红蛋白</option><option value="19">血脂</option>'
        		+'<option value="21">身高</option><option value="22">体重</option>';
        	 $(this).parents('td').next().find("select").html(optionLists);
        	 $(this).parents('td').next().find("select").attr("lay-verify","required");
            form.render();

        }else if(data.value==3){
        	var optionLists =  '<option value="">请选择</option><option value="30">健康档案</option><option value="31">健康体检</option><option value="32">预防接种</option>'
        		+'<option value="33">儿童</option><option value="34">孕产妇</option><option value="35">老年人</option>'
        		+'<option value="36">高血压</option><option value="37">糖尿病</option><option value="38">严重精神障碍</option><option value="39">肺结核</option>';
        	 $(this).parents('td').next().find("select").html(optionLists);
             $(this).parents('td').next().find("select").attr("lay-verify","required");
            form.render();

        }else{
        	 $(this).parents('td').next().find("select").html("");
             $(this).parents('td').next().find("select").attr("lay-verify","");
             form.render();
        }

    });
    form.on('select(typeChange)', function(data){
    	 if(data.value=="2"){
    		 $("#priceTr").show();
    		 $("#servicePrice").attr("lay-verify","required|length");
    		 $("#discountPrice").attr("lay-verify","required|length|limitPriceNum");
    		   form.render();

    	 }else{
    		 $("#servicePrice").attr("lay-verify","length");
    		 $("#discountPrice").attr("lay-verify","length|limitPriceNum");
    		 $("#priceTr").hide();
    		  form.render();
    	 }
    });
});

function htmlTpl(data, getid, toid, fun) {
  layui.use('laytpl', function(){
    var $=layui.$;
    var laytpl = layui.laytpl;
    var getTpl = $(getid).html();
    laytpl(getTpl).render(data, function(html){
      $(toid).html(html);
      if (typeof fun == 'function') {
        fun();
      }
    });
  });
}

function deleteBigItem(obj){
	obj.parents("tr").nextUntil(".tr1").remove();
	obj.parents("tr").remove();
}

function ischecked(data,val){
  return data==val?'checked':'';
}
function ischeckbox(data,val){
  var arr=data.split(',');
  for (var i = 0; i < arr.length; i++) {
    if(arr[i]==val){
      return 'checked';
    }
  }
  return '';
}
function isundefined(val){
  if (typeof val == 'undefined') {
    return '';
  }if (val == null) {
    return '';
  }
  return val;
}
function isSelected(data,val){
    return data==val?'selected=""':'';
}
function isFlag(data){
	if(data=="BQ001"){
		data = "高血压"
	}else if(data=="BQ002"){
		data = "糖尿病"
	}else if(data=="BQ003"){
		data = "精神病"
	}
    return data;
}
function limitInputNum(obj){
	var id = obj.id;
	if($("#"+id).val()<0){
		$("#"+id).val(0);
	}

}

function onblurMoney(obj){
	var id = obj.id;
	var val = $("#"+id).val();
	if(val.charAt(val.length - 1) == "."){
		val = val.substring(0,val.length - 1);
	}
	$("#"+id).val(val);
}
/**
 * 校验金额
 * @param obj
 */
function limitInputMoney(obj){
	var id = obj.id;
	var val = $("#"+id).val();
	if(val.length == 1 && "." == val){
		 val = val.replace(".", "");
	}
    val = val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
    val = val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
    val = val.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
    if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        val = parseFloat(val);
    }
    $("#"+id).val(val);
}

function onlyNonNegative(obj) {
 var inputChar = event.keyCode;
 //alert(event.keyCode);

 //1.判断是否有多于一个小数点
 if(inputChar==190 ) {//输入的是否为.
  var index1 = obj.value.indexOf(".") + 1;//取第一次出现.的后一个位置
  var index2 = obj.value.indexOf(".",index1);
  while(index2!=-1) {
   //alert("有多个.");

   obj.value = obj.value.substring(0,index2);
   index2 = obj.value.indexOf(".",index1);
  }
 }
 //2.如果输入的不是.或者不是数字，替换 g:全局替换
 obj.value = obj.value.replace(/[^(\d|.)]/g,"");
}


