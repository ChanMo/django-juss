from django.contrib.admin import AdminSite
from django.conf import settings

class JussAdminSite(AdminSite):
    login_bg = None
    search_url = None

    def each_context(self, request):
        context = super().each_context(request)
        context['login_bg'] = self.login_bg
        context['search_url'] = self.search_url
        return context
