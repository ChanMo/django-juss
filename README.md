# DjangoJuss

一个简单的django后台模板

## Quick start

1. 下载`django-juss`

```bash
$ pip install django-juss
```

2. 修改`settings.py`

```
INSTALLED_APPS = [
    'juss',
    'django.contrib.admin',
    ...
]

...

MIDDLEWARE = [
    ...
    'juss.middlewares.LeftMenuMiddleware',
]
```

## 内置Widgets

1. RichTextWidget

使用`tinymce`的富文本编辑

2. JFileInputWidget

扩展默认的FileInput, 增加缩略图展示

3. JMSelectWidget

扩展默认的FilePathField, 增加可视化图片选择
