from django.contrib import admin
from charts.models import Sfhd130Cols
# Register your models here.
@admin.register(Sfhd130Cols)
class Sfhd130ColsAdmin(admin.ModelAdmin):
    list_display = ('amb05cq04bm_av','o2ref_av','am22mcs0103_av')

class MyModelAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super(MyModelAdmin, self).get_queryset(request)
        if request.user.is_superuser:
            return qs
        else:
            return qs.filter(author=request.user)

admin.AdminSite.site_header = 'Sfhd'
admin.AdminSite.site_title = 'Sfhd_chart'