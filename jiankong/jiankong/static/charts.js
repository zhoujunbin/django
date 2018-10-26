    //在浏览器控制台中测试是否进入此文件
    console.log('888888888888');

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
            var d = data["data"];
            for (var i = 0; i < d.length; i++) {
                xinlv.push(d[i][1]);
                xueyang.push(d[i][2]);
                time.push(d[i][0]);
            }
        }
    })

    console.log("血氧");
    console.log(xueyang);
    console.log("心率");
    console.log(xinlv);
    console.log("时间");
    console.log(time);

    setInterval(function(){
        $.ajax({
            type: "post",
            url: "/datainfo/",
            data: {},
            dataType: "json",
            success: function (data) {
                // console.log(data);
                myChart.hideLoading();

                var d = data["data"];
                console.log(d[d.length-1][0]);
                console.log(time[time.length-1]);
                if (data) {
                    if (d[d.length-1][0]!=time[time.length-1]){
                        xinlv.shift();
                        xinlv.push(d[d.length-1][1]);
                        xueyang.shift();
                        xueyang.push(d[d.length-1][1]);
                        time.shift();
                        time.push(d[d.length-1][0]);
                    }
                }

                // console.log("心率");
                // console.log(xinlv);
                // console.log("时间");
                // console.log(time);

                myChart.setOption({
                    title : {
                        text: '病人心率、血氧实时监测',
                        //subtext: '数据来自西安兰特水电测控技术有限公司',
                        x: 'center',
                        //align: 'right'
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            restore: {},
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
                    legend: {
                        data:['心率','血氧'],
                        x: 'left'
                    },
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
                                var str1 = str.replace('T','\n');
                                var str2 = str1.replace('Z',' ');
                                return str2;
                            })
                        },
                        {
                            gridIndex: 1,
                            // show: false;
                            type: 'category',
                            boundaryGap: false,
                            axisLine: {onZero: false},
                            data: time.map(function (str){
                                var str1 = str.replace('T','\n');
                                var str2 = str1.replace('Z',' ');
                                return str2;
                            }),
                            // position: 'top'
                        }
                    ],
                    yAxis: [
                        {
                            name: '心率(次/min)',
                            type: 'value',
                            // position: 'left',
                            min: 0,
                            max: 200
                        },
                        {
                            gridIndex: 1,
                            name: '血氧(ml/L)',
                            // nameLocation: 'start',
                            type: 'value',
                            //position: 'right',
                            min: 0,
                            max: 200,
                            // inverse: true
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
                            "data": xinlv
                        },
                        {
                            "name": "血氧",
                            "type": 'bar',
                            xAxisIndex:1,
                            yAxisIndex:1,
                            "markArea": {
                                silent: true,
                                data: [[{
                                    yAxis: 110
                                },{ yAxis: 180
                                }]]
                            },
                            "data": xueyang
                        }
                    ]
                });

            }
        })
    },2000);


