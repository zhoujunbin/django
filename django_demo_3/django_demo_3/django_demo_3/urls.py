"""django_demo_3 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from charts import views as charts_views
urlpatterns = [
    url(r'^model_css/$',charts_views.model_css,name='model_css'),
    url(r'^mianji_data/$',charts_views.mianji_data,name='mianji_data'),
    url(r'^leida_data/$',charts_views.leida_data,name='leida_data'),
    url(r'^scatter_data/$',charts_views.scatter_data,name='scatter_data'),
    url(r'^charts_update/$',charts_views.charts_update,name='charts_update'),
    url(r'^charts_data/$',charts_views.charts_data,name='charts_data'),
    url(r'^index/$',charts_views.index,name='index'),
    url(r'^admin/', admin.site.urls),
]
