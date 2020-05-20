from django.apps import AppConfig
from django.contrib.admin.apps import AdminConfig


class JussConfig(AppConfig):
    name = 'juss'

class JussAdminConfig(AdminConfig):
    default_site = 'juss.admin.JussAdminSite'
