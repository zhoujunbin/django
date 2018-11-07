# Generated by Django 2.1.2 on 2018-11-07 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MyTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('gender', models.BooleanField(default=False)),
                ('date', models.DateTimeField()),
                ('xinlv', models.IntegerField()),
                ('xueyang', models.IntegerField()),
                ('xinlv_abnormal', models.BooleanField(default=False)),
                ('xueyang_abnormal', models.BooleanField(default=False)),
                ('isDelete', models.BooleanField(default=False)),
            ],
        ),
    ]
