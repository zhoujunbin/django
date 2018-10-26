from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse

from .models import MyTable
import json

def index(request):
    return render(request, 'myApp/data.html')

from django.http import JsonResponse
def datainfo(request):
    stus = MyTable.objects.all()
    list = []
    for stu in stus:
        list.append([stu.date,stu.xinlv,stu.xueyang])
    print(list)
    return JsonResponse({"data":list})
