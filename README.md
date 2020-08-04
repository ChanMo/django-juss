# DjangoJuss

> 一个简单的django后台模板

## Screenshots

![Login](./login.png)
![Index](./index.png)
![ChangeList](./changelist.png)
![ChangeForm](./changeform.png)


## Quick start

1. 下载`django-juss`

```bash
$ pip install django-juss
```

2. 在`settings`中修改`INSTALLED_APPS`

```python
INSTALLED_APPS = [
    'juss',
    #'django.contrib.admin',
    'juss.apps.JussAdminConfig',
    ...
]
```

3. 可选: 添加自定义菜单(如果未设置, 则显示默认布局)

```python
JUSS_LEFT_MENU = [
    {'label':'仪表板', 'children':[
        {'label':'首页', 'path':'/admin/'},
    ]},
    {'label':'认证和授权', 'children':[
        {'model':'account.user'},
        {'model':'account.group'},
    ]}
]

```

4. 可选: 设置登录页面背景图片

在`urls.py`中添加

```
from django.contrib import admin

admin.site.login_bg = 'https://example.jpg'

urlpatterns = [
    ...
    path('admin/', admin.site.urls),
    ...
]
```


## 版本说明

* v0.2.0 (2020/08/03)
  配色样式更新, 移除fields, forms等, 只专注admin样式

* v0.1.8 (2020/05/20)
  使用template tag 代替middleware

* v0.1.7
  多图增加上传

* v0.1.6
  调整样式细节

* v0.1.5
  增加`ImageChoiceField`, `RichTextField`
  增加可折叠左侧菜单

* v0.1.4
  增加`JSONEditField`, `MultipleImageField`

* v0.1.3
  增加`JImageWidget`
  增加自定义登录页面背景图`JUSS_LOGIN_BG`
