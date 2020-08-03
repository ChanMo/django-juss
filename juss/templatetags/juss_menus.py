import logging
import re

from django import template
from django.conf import settings

register = template.Library()
logger = logging.getLogger(__name__)

def check_url(base, url):
    " 判断当前选中菜单 "

    if base == '/admin/':
        return re.match('^.*\/admin\/(\?.*)?$', url)
        #return base == url
    elif base:
        return base in url
    else:
        return False


def get_default_menus(app_list, index, current=None):
    " 根据applabel获取label和链接 "
    children = []

    for item in app_list[index]['models']:
        children.append({
            'label': item['name'],
            'path': item['admin_url'],
            'active': check_url(item['admin_url'], current)
            })

    return children


def get_custom_menus(app_list, name, current=None):
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
                            'active':check_url(path, current)
                            }


@register.inclusion_tag('juss/juss_menus.html', takes_context=True)
def juss_menus(context, current=None):

    if 'available_apps' not in context:
        return
    app_list = context['available_apps']
    menu = getattr(settings, 'JUSS_LEFT_MENU', False)
    new_menu = []


    if menu:
        for i, item in enumerate(menu):
            new_menu.append({
                'label':item['label'],
                'children': []
                })

            for link in item['children']:

                if 'model' in link:
                    model = get_custom_menus(app_list, link['model'], current)

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
                'children': get_default_menus(app_list, i, current),
                })

    return {
        'juss_menus_data': new_menu
    }
