from django.contrib.admin import AdminSite
from django.conf import settings

class JussAdminSite(AdminSite):
    login_bg = None

    def each_context(self, request):
        context = super().each_context(request)
        context['login_bg'] = self.login_bg
        return context
