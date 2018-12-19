from django.conf.urls import url, include
from . import views
urlpatterns = [
    url(r'^history/$',views.history),
    url(r'^$',views.index),
    url(r'^datainfo/$',views.datainfo),
]