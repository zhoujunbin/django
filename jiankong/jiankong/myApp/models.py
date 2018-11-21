from django.db import models

# Create your models here.

class MyTable(models.Model):
    name = models.CharField(max_length=20)
    gender = models.BooleanField(default=False)
    date = models.CharField(max_length=20)
    xinlv = models.IntegerField()
    xueyang = models.IntegerField()
    xinlv_abnormal = models.BooleanField(default=False)
    xueyang_abnormal = models.BooleanField(default=False)
    isDelete = models.BooleanField(default=False)