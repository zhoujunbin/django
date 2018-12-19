/**
 * Created by Lenovo on 2018/12/12.
 */
    //在浏览器控制台中测试是否进入此文件
    console.log('进入charts.js');

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

    setInterval(function(){
        $.ajax({
            type: "post",
            url: "/datainfo/",
            data: {},
            dataType: "json",
            success: function (data) {
                var d = data["data"];
                var str_time1 = d[d.length-1][0];
                var str_time2 = str_time1.replace('T',' ');
                var str_time = str_time2.replace('Z',' ');
                var message2 = document.getElementById('message1');
                message2.innerHTML = '&nbsp&nbsp姓名:&nbsp&nbsp张三';
                var time2 = document.getElementById('time1');
                time2.innerHTML ='&nbsp&nbsp时间:&nbsp&nbsp'+str_time;
                var xinlv2 = document.getElementById('xinlv1');
                xinlv2.innerHTML = '&nbsp&nbsp心率(次/分):&nbsp&nbsp'+d[d.length-1][1];
                var xueyang2 = document.getElementById('xueyang1');
                xueyang2.innerHTML = '&nbsp&nbsp血氧饱和度(%):&nbsp&nbsp'+d[d.length-1][2];
            }
        })
    },200);



