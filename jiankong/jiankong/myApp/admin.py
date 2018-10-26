from django.contrib import admin

# Register your models here.

from .models import MyTable

#register
class MyTableAdmin(admin.ModelAdmin):
    #def Delete(self):
    #   if self.isDelete:
    #        return "是"
    #    else:
    #        return "否"
    #Delete.short_description = "是否删除"
    def gname(self):
        return self.name
    gname.short_description = "姓名"
    def ggender(self):
        if self.gender:
            return "女"
        else:
            return "男"
    ggender.short_description = "性别"
    def gdate(self):
        return self.date
    gdate.short_description = "日期"
    def gxinlv(self):
        return self.xinlv
    gxinlv.short_description = "心率"
    def gxinlv_abnormal(self):
        if self.xinlv_abnormal:
            return "是"
        else:
            return "否"
    gxinlv_abnormal.short_description = "心率异常"
    def gxueyang(self):
        return self.xueyang
    gxueyang.short_description = "血氧"
    def gxueyang_abnormal(self):
        if self.xueyang_abnormal:
            return "是"
        else:
            return "否"
    gxueyang_abnormal.short_description = "血氧异常"
    #list page setting
    list_display = ['pk',gname,ggender,gdate,gxinlv,gxinlv_abnormal,gxueyang,gxueyang_abnormal]
    #list_display = ['pk',name,date,xinlv,xueyang,Delete]
    list_filter = ['name','date','xinlv_abnormal','xueyang_abnormal']
    list_per_page = 5
    
    #add, modify page settings
    fieldsets=[
        ("num",{"fields":['xinlv', 'xueyang','xinlv_abnormal','xueyang_abnormal']}),
        ("base",{"fields":["name", "gender", "date"]})
    ]
    #action button setting
    actions_on_top = False
    actions_on_bottom = True

admin.site.register(MyTable, MyTableAdmin)







