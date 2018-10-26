from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
from charts.models import Sfhd130Cols
import json,time
from django.db.models import Avg
from .forms import AddForm
# 方法
#时间戳转标准时间
def time_change(date):
    date = time.localtime(date)
    return time.strftime('%Y-%m-%d %H:%M:%S',date)

# 这是查数据库
def data_lists(cols,nums):
    '''
    :param cols:  ['time','t58te01a_av']
    :param nums:  行数  [100,200]
    :return:
    '''
    data_1 = list(Sfhd130Cols.objects.values(cols[0],cols[1])[nums[0]:nums[1]])
    nums_1 = []
    for i in data_1:
        nums_1.append(i[cols[1]])
    return nums_1
#list 格式化
def lists_way(lists):
    '''
    :param lists:  [1,2,3,4]
    :return:
    '''
    m = []
    for i in lists:
        m.append([i])
    return m
# lists 添加 内层lists
def lists_into_way(lists,m):
    '''
    :param lists: 要添加的lists
    :param m:  被添加的 lists
    :return:
    '''
    q = 0
    for i in m:
        i.append(lists[q])
        q+=1
    return m


def index(request):

    return render(request,'charts/index.html')

def charts_data(request):
    # b = Sfhd130Cols.objects.all().order_by('-time').values('time', 'amb05cq04bm_av')[:100]
    #

    b = Sfhd130Cols.objects.order_by('-time').values('time', 'amb05cq04bm_av')[10:110]
    # b = b.reverse() #从数据库读取数据后 queryset格式要先倒序才能list列表化
    b = list(b)
    # print(b, "hello")
    for lis in b:
        lis['time'] = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(lis['time']))

    lists = json.dumps(b[::-1], indent=4)


        # lis['time'] = time_change(lis['time'])
    return HttpResponse(lists)

def charts_update(request):
    b = Sfhd130Cols.objects.order_by('-time').values('time', 'amb05cq04bm_av')[:6]
    # b = b.reverse()  # 从数据库读取数据后 queryset格式要先倒序才能list列表化
    b = list(b)
    # print(b, "hello")
    for lis in b:
        lis['time'] = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(lis['time']))
    lists = json.dumps(b, indent=4)

    return HttpResponse(lists)



# [  [ ]  ]
def scatter_data(request):
    # 1
    # 1
    cols_1 = ['time', 't58te01a_av']
    nums_1 = [2000, 3500]
    cols_2 = ['time', 'amb03cv03e02_av']
    data_1 = data_lists(cols_1, nums_1)  # 除氧器温度 x
    data_2 = data_lists(cols_2, nums_1)  # 磨煤机E出口温度设定 y
    nums_1 = lists_way(data_1)  # 格式化 【【】， 【】，。。 】
    m = lists_into_way(data_2, nums_1)

    lists1 = m
    # 2
    nums_2 = [3500, 5000]
    data_12 = data_lists(cols_1, nums_2)  # 除氧器温度 x
    data_22 = data_lists(cols_2, nums_2)  # 磨煤机E出口温度设定 y
    nums_12 = lists_way(data_12)
    m2 = lists_into_way(data_22, nums_12)
    lists2 = m2
    lists = json.dumps([lists1,lists2],indent=4)
    return HttpResponse(lists)


def leida_data(request):
    nums = [[0, 30],[40,70],[80,110]]
    lists = []
    for ii in nums:
        cols_1 = ['time','am23sig0202_av']
        data_1 = data_lists(cols_1,ii)
        lists_1 = lists_way(data_1)
        cols_2 = ['time','b01te01a_av']
        data_2 = data_lists(cols_2,ii)
        cols_3 = ['time', 't31pt04b_av']
        data_3 = data_lists(cols_3,ii)
        cols_4 = ['time', 'e92vr01pv01_av']
        data_4 = data_lists(cols_4,ii)
        cols_5 = ['time', 't31pt04b_av']
        data_5 = data_lists(cols_5,ii)
        cols_6 = ['time', 'b06ft12aa_av']
        data_6 = data_lists(cols_6,ii)
        s = [data_2,data_3,data_4,data_5,data_6]
        for i in s:
            lists_1= lists_into_way(i, lists_1)
        q = 1
        for i in lists_1:
            i.append(q)
            q+=1
        lists.append(lists_1)

    lists = json.dumps(lists,indent=4)
    return HttpResponse(lists)

def mianji_data(request):
    lists = list(Sfhd130Cols.objects.order_by('-time').values('time','am23sig0202_av')[:10000])
    dates = []
    datas = []
    for lis in lists:
        lis['time'] = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(lis['time']))
        dates.append(lis['time'])
        datas.append(lis['am23sig0202_av'])
    datas = datas[::-1]
    dates = dates[::-1]
    lists = json.dumps([dates,datas], indent=4)
    return HttpResponse(lists)

def model_css(request):
    if request == 'GET':
        return render(request,'charts/model_css.html')