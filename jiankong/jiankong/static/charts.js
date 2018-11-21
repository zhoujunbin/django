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
            for (var i = d.length-50; i < d.length; i++) {
                xinlv.push(d[i][1]);
                xueyang.push(d[i][2]);
                time.push(d[i][0]);
            }
            console.log(d);
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
                myChart.hideLoading();

                var d = data["data"];
                console.log(d[d.length-1][0]);
                console.log(time[time.length-1]);
                console.log("time.length");
                console.log(time.length);
                //对比数据库，实时更新数据
                if (data) {
                    if (d[d.length-1][0]!=time[time.length-1]){
                        xinlv.shift();
                        xinlv.push(d[d.length-1][1]);
                        xueyang.shift();
                        xueyang.push(d[d.length-1][2]);
                        time.shift();
                        time.push(d[d.length-1][0]);
                    }
                }
                var str_time1 = d[d.length-1][0];
                var str_time2 = str_time1.replace('T',' ');
                var str_time = str_time2.replace('Z',' ');
                var message = document.getElementById('message');
                message.innerHTML = '姓名:张三'+'&nbsp&nbsp&nbsp&nbsp'+'监测时间:'+str_time;
                var num = document.getElementById('num');
                num.innerHTML = '心率:'+d[d.length-1][1]+'&nbsp&nbsp&nbsp&nbsp'+'血氧:'+d[d.length-1][2];

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
                    legend: {
                        data:['心率','血氧'],
                        x: 'center'
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
                            max: 200
                        },
                        {
                            gridIndex: 1,
                            name: '血氧(ml/L)',
                            type: 'value',
                            min: 50,
                            max: 200,
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
                            "type": 'line',
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


