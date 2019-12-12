$(function () {
	getContractData();
	$.ajax({
		url:"../../OverallStatistic/dataMonthList",
		type:"post",
		dataType:"json",
		success: function(data){
			var html = "";
			if(data.code = "10000"){
				//这里是暂时演示用做的数据
				var demoData = data.checkData;
				demoData[0].count = 10;
				demoData[1].count = 42;
				console.log(demoData);
				//这里是正常逻辑
				echart_2(data.checkData);
			}
		},
		error: function(error){
			console.log('未连到服务器');
		}
	});
    echart_3();
    window.setInterval("getContractData()",3600000);
    getoverallData();
  //演示用 暂时注释
   // getOrgStatisticlData();
});

function echart_2(resonseData) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart_2'));
    var months = [];//['一月', '二月', '三月', '四月', '五月', '六月']
    var datas = [];//[8, 10, 10, 11, 4, 13]
    if(resonseData != null && resonseData.length > 0){
    	for(var i = 0;i<resonseData.length;i++){
    		var obj = resonseData[i];
    		months.push(obj.month);
    		datas.push(obj.count);
    	}
    }
    var data = {
        id: 'multipleBarsLines',
        title: '今年签约数据统计',
        symbol: '', // 数值是否带百分号 --默认为空 ''
        xAxis: months,
        yAxis: [
        	datas
        ],
        barColor: ['#3FA7DC', '#7091C4', '#5170A2'], // 柱子颜色 必填参数
        lineColor: ['#D9523F'], // 折线颜色

    };
    // ///////////end/////////

    var myData = (function test() {
        var yAxis = data.yAxis || [];
        var lines = data.lines || [];
        var legendBar = data.legendBar || [];
        var legendLine = data.legendLine || [];
        var symbol = data.symbol || ' ';
        var seriesArr = [];
        var legendArr = [];
        yAxis && yAxis.forEach((item, index) => {
            legendArr.push({
                name: legendBar && legendBar.length > 0 && legendBar[index]
            });
            seriesArr.push({
                name: legendBar && legendBar.length > 0 && legendBar[index],
                type: 'bar',
                barGap: '0.5px',
                data: item,
                barWidth: data.barWidth || 12,
                label: {
                    normal: {
                        show: true,
                        formatter: '{c}' + symbol,
                        position: 'top',
                        textStyle: {
                            color: '#fff',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            textAlign: 'left',
                            fontSize: 11,
                        },
                    },
                },
                itemStyle: { // 图形样式
                    normal: {
                        barBorderRadius: 4,
                        color: data.barColor[index]
                    },
                }
            });
        });

        lines && lines.forEach((item, index) => {
            legendArr.push({
                name: legendLine && legendLine.length > 0 && legendLine[index]
            })
            seriesArr.push({
                name: legendLine && legendLine.length > 0 && legendLine[index],
                type: 'line',
                data: item,
                itemStyle: {
                    normal: {
                        color: data.lineColor[index],
                        lineStyle: {
                            width: 3,
                            type: 'solid',
                        }
                    }
                },
                label: {
                    normal: {
                        show: false, // 折线上方label控制显示隐藏
                        position: 'top',
                    }
                },
                symbol: 'circle',
                symbolSize: 10
            });
        });

        return {
            seriesArr,
            legendArr
        };
    })();


    option = {
        title: {
            show: true,
            top: '10%',
            left: '3%',
            text: data.title,
            textStyle: {
                fontSize: 18,
                color: '#fff'
            },
            subtext: data.subTitle,
            link: ''
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var time = '';
                var str = '';
                for (var i of params) {
                    time = i.name.replace(/\n/g, '') + '<br/>';
                    if (i.data == 'null' || i.data == null) {
                        str += i.seriesName + '：无数据' + '<br/>'
                    } else {
                        str += i.seriesName + '：' + i.data  + '%<br/>'
                    }

                }
                return time + str;
            },
            axisPointer: {
                type: 'none'
            },
        },
        legend: {
            right: data.legendRight || '30%',
            top: '12%',
            right: '5%',
            itemGap: 16,
            itemWidth: 10,
            itemHeight: 10,
            data: myData.legendArr,
            textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12,
            }
        },
        grid: {
            x: 30,
            y: 80,
            x2: 30,
            y2: 60,
        },
        xAxis: {
            type: 'category',
            data: data.xAxis,
            axisTick: {
                show: false,
            },

            axisLine: {
                show: true,
                lineStyle: {
                    color: '#1AA1FD',
                },
                symbol: ['none', 'arrow']
            },
            axisLabel: {
                show: true,
                interval: '0',
                textStyle: {
                    lineHeight: 16,
                    padding: [2, 2, 0, 2],
                    height: 50,
                    fontSize: 12,
                },
                rich: {
                    Sunny: {
                        height: 50,
                        // width: 60,
                        padding: [0, 5, 0, 5],
                        align: 'center',
                    },
                },
                formatter: function (params, index) {
                    var newParamsName = "";
                    var splitNumber = 5;
                    var paramsNameNumber = params && params.length;
                    if (paramsNameNumber && paramsNameNumber <= 4) {
                        splitNumber = 4;
                    } else if (paramsNameNumber >= 5 && paramsNameNumber <= 7) {
                        splitNumber = 4;
                    } else if (paramsNameNumber >= 8 && paramsNameNumber <= 9) {
                        splitNumber = 5;
                    } else if (paramsNameNumber >= 10 && paramsNameNumber <= 14) {
                        splitNumber = 5;
                    } else {
                        params = params && params.slice(0, 15);
                    }

                    var provideNumber = splitNumber; // 一行显示几个字
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber) || 0;
                    if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";
                            var start = p * provideNumber;
                            var end = start + provideNumber;
                            if (p == rowNumber - 1) {
                                tempStr = params.substring(start, paramsNameNumber);
                            } else {
                                tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr;
                        }

                    } else {
                        newParamsName = params;
                    }
                    params = newParamsName;
                    return '{Sunny|' + params + '}';
                },
                color: '#1AA1FD',
            },

        },
        yAxis: {
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#1AA1FD',
                },
                symbol: ['none', 'arrow']
            },
            type: 'value',
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#1AA1FD',
                    type: 'solid'
                },
            }
        },
        series: myData.seriesArr
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}


function echart_3() {
	   // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart_3'));
    function showProvince() {
        var geoCoordMap = {
            '仪征市真州镇胥浦社区卫生服务中心': [119.15016174316405,32.28519163978098],
                     '仪征市十二圩卫生院':[119.2274522781372,32.28704193294193],
                     '仪征市马集镇卫生院':[119.17344331741332,32.3588838978223],
              '仪征市真州镇社区卫生服务中心':[119.17728424072266,32.26739424574946],
              '仪征市新城镇卫生院':[119.23931837081908,32.27276467333772],
              '仪征市月塘中心卫生院':[119.04862403869629,32.404168319720185],
              '仪征市刘集镇卫生院':[119.2506694793701,32.43532327810856],
              '仪征市铜山卫生院':[119.09108877182007,32.349476243968404],
              '仪征市青山镇卫生院':[119.12286758422852,32.29752621434635],
              '仪征市陈集镇卫生院':[119.18436527252196,32.48601763026006],
              '仪征市大仪中心卫生院':[119.2045783996582,32.51055792350685],
              '仪征市新集镇卫生院':[119.3305778503418,32.33069426339438]
        };
        var data = [{
                name:'仪征市真州镇胥浦社区卫生服务中心-041006001',
                value:119.150,
                code:'041006001'
            },{
            	name:'仪征市十二圩卫生院-041006002',
            	value:119.227,
            	code:'041006002'
            },{
            	name:'仪征市马集镇卫生院-041006003',
            	value:119.173,
            	code:'041006003'
            }
            ,{
            	name:'仪征市真州镇社区卫生服务中心-041006004',
            	value:119.177,
            	code:'041006004'
            }
            ,{
            	name:'仪征市新城镇卫生院-041006005',
            	value:119.239,
            	code:'041006005'
            },{
            	name:'仪征市月塘中心卫生院-041006006',
            	value:119.048,
            	code:'041006006'
            },{
            	name:'仪征市刘集镇卫生院-041006007',
            	value:119.250,
            	code:'041006007'
            },{
            	name:'仪征市铜山卫生院-041006008',
            	value:119.091,
            	code:'041006008'
            },{
            	name:'仪征市青山镇卫生院-041006009',
            	value:119.124,
            	code:'041006009'
            },{
            	name:'仪征市陈集镇卫生院-041006010',
            	value:119.188,
            	code:'041006010'
            },{
            	name:'仪征市大仪中心卫生院-041006011',
            	value:119.188,
            	code:'041006011'
            },{
            	name:'仪征市新集镇卫生院-041006012',
            	value:119.330,
            	code:'041006012'
            }
            ];
        var max = 480,
            min = 9; // todo
        var maxSize4Pin = 100,
            minSize4Pin = 20;
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
            	var showNames = data[i].name.split("-");
            	var nickName = showNames[0];
            	var nickCode= showNames[1];
                var geoCoord = geoCoordMap[nickName];
                if (geoCoord) {
                    res.push({
                        name: nickName,
                        value: geoCoord.concat(data[i].value),
                        code: data[i].code
                    });
                }
            }
            return res;
        };

        myChart.setOption(option = {
            title: {
                text: '机构分布',
                subtext: '',
                x: 'center',
                textStyle: {
                    color: '#FFF'
                },
                left: '6%',
                top: '10%'
            },
            legend: {
                orient: 'vertical',
                y: 'bottom',
                x: 'right',
                data: ['pm2.5'],
                textStyle: {
                    color: '#fff'
                }
            },
            visualMap: {
                show: false,
                min: 0,
                max: 500,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                seriesIndex: [1],
                inRange: {}
            },
            geo: {
                show: true,
                map: 'guangxi',
                mapType: 'guangxi',
                label: {
                    normal: {},
                    //鼠标移入后查看效果
                    emphasis: {
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                //鼠标缩放和平移
                roam: true,
                itemStyle: {
                    normal: {
                        //          	color: '#ddd',
                        borderColor: 'rgba(147, 235, 248, 1)',
                        borderWidth: 1,
                        areaColor: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.8,
                            colorStops: [{
                                offset: 0,
                                color: 'rgba(175,238,238, 0)' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: 'rgba(	47,79,79, .1)' // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor: 'rgba(128, 217, 248, 1)',
                        shadowOffsetX: -2,
                        shadowOffsetY: 2,
                        shadowBlur: 10
                    },
                    emphasis: {
                        areaColor: '#389BB7',
                        borderWidth: 0
                    }
                }
            },
            series: [{
                    name: 'light',
                    type: 'map',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    itemStyle: {
                        normal: {
                            color: '#F4E925'
                        }
                    }
                },
                {
                    name: '点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin',
                    symbolSize: function (val) {
                        var a = (maxSize4Pin - minSize4Pin) / (max - min);
                        var b = minSize4Pin - a * min;
                        b = maxSize4Pin - a * max;
                        return a * val[2] + b;
                    },
                    label: {
                        normal: {
                            // show: true,
                            // textStyle: {
                            //     color: '#fff',
                            //     fontSize: 9,
                            // }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#F62157', //标志颜色
                        }
                    },
                    zlevel: 6,
                    data: convertData(data),
                },
                {
                    name: 'light',
                    type: 'map',
                    mapType: 'guangxi',
                    geoIndex: 0,
                    aspectScale: 0.75, //长宽比
                    showLegendSymbol: false, // 存在legend时显示
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#031525',
                            borderColor: '#FFFFFF',
                        },
                        emphasis: {
                            areaColor: '#2B91B7'
                        }
                    },
                    animation: false,
                    data: data
                },
                {
                    name: ' ',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 12)),
                    symbolSize: function (val) {
                        return val[2] / 10;
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: '{b}',
                            position: 'right',
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#05C3F9',
                            shadowBlur: 10,
                            shadowColor: '#05C3F9'
                        }
                    },
                    zlevel: 1
                },

            ]
        });
    }
    showProvince();

    // 使用刚指定的配置项和数据显示图表。
     myChart.setOption(option);
     myChart.on('click', function(params){
         $.ajax({
 			url:"../../OverallStatistic/orgDataList",
 			type:"post",
 			dataType:"json",
 			data : {"orgCode":params.data.code},
 			success: function(data){
 				console.log(data);
 				var items = "";
 				var checkDate = data.checkData;
 				if(checkDate != null && checkDate.length > 0){
 				$.each(checkDate,function(index,result){
 					var item = "<tr><td>" + result.orgName + "</td><td>" + result.teamNumber + "</td><td>"+result.realContract+"</td><td>"+result.appointmentPopulation+"</td><td>"+result.appointmentRate+"</td></tr>";
 					items += item;
 				});
 				$("#table_org").append(items);
 				}
 			},
 			error: function(error){
                 layer.msg('未连到服务器')
 			}
 		})

     });
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}

function getContractData(){
	$.ajax({
		url:"../../OverallStatistic/data",
		type:"post",
		dataType:"json",
		success: function(data){
			if(data.code = "10000"){
				//这里是暂时演示用做的数据
				if(data.checkData.contractInfoNumber == 0){
					data.checkData.contractInfoNumber = 1;
				}
				//演示用 暂时注释
				//$("#contractInfoNumber").html(data.checkData.contractInfoNumber);
				//$("#cancleContractNumber").html(data.checkData.cancleContractNumber);
				//$("#appointNumber").html(data.checkData.appointNumber);
				//$("#orgNumber").html(data.checkData.orgNumber);
			}
		},
		error: function(error){
			console.log('未连到服务器');
		}
	});
}

function getoverallData(){
	$.ajax({
		url:"../../OverallStatistic/dataList",
		type:"post",
		dataType:"json",
		success: function(data){
			var html = "";
			if(data.code = "10000"){
				if(data.checkData != null && data.checkData.length > 0){
					for(var i =0;i <data.checkData.length;i++){
						var obj = data.checkData[i];
						//演示用暂时修改
						obj.orgName = '仪征市新集镇卫生院';
						html +="<tr>" + "<td width='10%'>" + obj.personName + "</td>"+ "<td width='20%'>" + obj.doctorName + "</td>"+ "<td width='30%'>" + obj.teamName + "</td>"+ "<td width='40%'>" + obj.orgName + "</td>";
					}
					$("#dataTable").html(html);
				}
			}
		},
		error: function(error){
			console.log('未连到服务器');
		}
	});


}

function getOrgStatisticlData(){
	 $.ajax({
			url:"../../OverallStatistic/orgDataList",
			type:"post",
			dataType:"json",
			data : {"orgCode":"041006"},
			success: function(data){
				console.log(data);
				var items = "";
				var checkDate = data.checkData;
				if(checkDate != null && checkDate.length > 0){
				$.each(checkDate,function(index,result){
					var item = "<tr><td width='40%'>" + result.orgName + "</td><td width='15%'>" + result.teamNumber + "</td><td width='15%'>"+result.realContract+"</td><td width='15%'>"+result.appointmentPopulation+"</td><td width='15%'>"+result.appointmentRate+"</td></tr>";
					items += item;
				});
				$("#table_org").append(items);
				}
			},
			error: function(error){
              layer.msg('未连到服务器')
			}
		});

}