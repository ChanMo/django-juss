import logging
import re

from django.conf import settings
from django.contrib import admin
from django.urls import reverse
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)

def check_url(base, url):
    " 判断当前选中菜单 "

    if base == '/admin/':
        return base == url
    elif base:
        return base in url
    else:
        return False

def get_normal_app_model(app_list, index, current):
    " 根据applabel获取label和链接 "
    children = []

    for item in app_list[index]['models']:
        children.append({
            'label': item['name'],
            'path': item['admin_url'],
            'active': check_url(item['admin_url'], current)
            })

    return children

def get_app_model(app_list, name, current):
    " 根据app.model 获取对应的label和链接 "
    app, model_name = name.split('.')

    for item in app_list:
        if app.upper() == item['app_label'].upper():
            for model in item['models']:

                if model['object_name'].upper() == model_name.upper():
                    label = item['label'] if 'label' in item.keys() else model['name']
                    path = model['admin_url']

                    return {'label':label,
                            'path':path,
                            'active':check_url(path, current)}

class LeftMenuMiddleware(MiddlewareMixin):


    def process_template_response(self, request, response):
        login_bg = getattr(settings, 'JUSS_LOGIN_BG', None)
        if getattr(response, 'context_data'):
            response.context_data['login_bg'] = login_bg

        if not request.user.is_authenticated or not re.match(r'\/admin\/*', request.path_info):
            return response

        if not 'available_apps' in response.context_data:
            return response

        app_list = response.context_data['available_apps']
        new_menu = []
        current = request.path_info
        menu = getattr(settings, 'JUSS_LEFT_MENU', False)

        if menu:
            for i, item in enumerate(menu):
                new_menu.append({
                    'label':item['label'],
                    'children': []
                    })

                for link in item['children']:

                    if 'model' in link:
                        model = get_app_model(app_list, link['model'], current)

                        if model:
                            new_menu[-1]['children'].append({
                                'label': link['label'] if 'label' in link.keys() else model['label'],
                                'path': model['path'],
                                'active': model['active']
                                })
                    else:
                        new_menu[-1]['children'].append({
                            'label': link['label'],
                            'path': link['path'],
                            'active': check_url(link['path'], current)
                        })

                if not new_menu[-1]['children']:
                    del new_menu[-1]

        else:

            for i, item in enumerate(app_list):
                new_menu.append({
                    'label': item['name'],
                    'children': get_normal_app_model(app_list, i, current),
                    })

        response.context_data['juss_left_menu'] = new_menu

        return response
