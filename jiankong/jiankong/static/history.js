/**
 * Created by Lenovo on 2018/12/12.
 */
    //在浏览器控制台中测试是否进入此文件
    console.log('进入charts.js');

//以下为病人“心率”和“血氧”实时检测图像绘制
    //初始化一个图表
    var  myChart = echarts.init(document.getElementById('main'));

  // 为echarts对象加载数据
    myChart.showLoading();

    var time=[];
    var xinlv=[];
    var xueyang=[];

    $.ajax({
        type: "post",
        url: "/datainfo/",
        data: {},
        dataType: "json",
        success: function (data) {
            console.log(data);
            var d = data["data"];
            for (var i = 0; i < d.length; i++) {
                xinlv.push(d[i][1]);
                xueyang.push(d[i][2]);
                time.push(d[i][0]);
            }
            // console.log(d);
        }
    })

    // console.log("血氧");
    // console.log(xueyang);
    // console.log("心率");
    // console.log(xinlv);
    // console.log("时间");
    // console.log(time);

    setInterval(function(){
        $.ajax({
            type: "post",
            url: "/datainfo/",
            data: {},
            dataType: "json",
            success: function (data) {
                myChart.hideLoading();

                var d = data["data"];

                myChart.setOption({
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                           // restore: {},
                            saveAsImage: {}
                        }
                    },
                    tooltip:{
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            animation: false
                        }
                    },
                    axisPointer: {
                        link: {xAxisIndex: 'all'}
                    },
                    // legend: {
                    //     data:['心率','血氧'],
                    //     x: 'center'
                    // },
                    grid: [{
                        left: 50,
                        right: 50,
                        height: '35%'
                    }, {
                        left: 50,
                        right: 50,
                        top: '57%',
                        height: '35%'
                    }],
                    xAxis:[
                        {
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: false},
                            data: time.map(function (str){
                                var str1 = str.substr(11,8);
                                // var str2 = str1.replace('Z',' ');
                                return str1;
                            })
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: false},
                            data: time.map(function (str){
                                var str1 = str.substr(11,8);
                                // var str2 = str1.replace('Z',' ');
                                return str1;
                            }),
                        }
                    ],
                    yAxis: [
                        {
                            name: '心率(次/min)',
                            type: 'value',
                            min: 50,
                            max: 150
                        },
                        {
                            gridIndex: 1,
                            name: '血氧饱和度(%)',
                            type: 'value',
                            min: 50,
                            max: 100,
                        }
                    ],
                    series: [
                        {
                            "name": "心率",
                            "type": "line",
                            "markArea": {
                                silent: true,
                                data: [[{
                                    yAxis: 60
                                },{ yAxis: 100
                                }]]
                            },
                            smooth: true,
                            "data": xinlv
                        },
                        {
                            "name": "血氧饱和度",
                            "type": 'line',
                            xAxisIndex:1,
                            yAxisIndex:1,
                            "markArea": {
                                silent: true,
                                data: [[{
                                    yAxis: 90
                                },{ yAxis: 100
                                }]]
                            },
                            smooth:true,
                            "data": xueyang
                        }
                    ]
                });

            }
        })
    },400);


