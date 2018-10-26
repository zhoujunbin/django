var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
        title:{

            text:'异步数据加载'
        },
        tooltip:{
            show:true,

        },

        xAxis:{
            type:'category',
            boundaryGap:false,
            data:[],
            splitLine: {
            show: false
            },
        },
        yAxis:{
            boundaryGap:[0,'100%'],
            type:'value',
            min:'dataMin',
            max:'dataMax',
            splitLine: {
            show: false
            },

        },
        series:[{
            name:'参数',
            type:'line',
            data:[]
        }]
    });
    myChart.showLoading();
    var date = [];
    var data = [];

    function update() {
                    $.ajax({
                        type:"get",
                        url:"/charts_update/",
                        data:{},
                        datatype:"json",
                        cache:false,
                        success:function (updatas) {
                            updatas = eval(updatas);
                            if(updatas){


                                    for(var n=0;n<3;n++){

                                        date.shift();
                                        date.push(updatas[n]["time"]);
                                        data.shift();
                                        data.push(updatas[n]["amb05cq04bm_av"]);

                                    }
                                    myChart.setOption({
                                            xAxis:{
                                                data:date
                                            },
                                            series:[
                                                {
                                                    name:"参数",
                                                    data:data,
                                                }
                                            ]});
                                }
                            }
                        });
                 }
    $.ajax({
        type:"get",
        // async:true,
        url:"/charts_data",
        data:{},
        dataType:"json",
        cache:false,
        success:function(result){
            var datas=result;
            if(result){
                result= eval(result);
                var m=0;
                for(var i=0;i<result.length;i++) {
                    if (m < 100) {

                        date.push(result[i]["time"]);
                        data.push(result[i]["amb05cq04bm_av"]);
                        result.shift();
                        m += 1;
                    }
                    else {
                        break;

                    }
                }
                myChart.hideLoading();
                setInterval("update()",6000);
            }
        },
        error:function(errorMsg){
            alert("图表请求数据失败！");
            myChart.hideLoading();
        }
    })