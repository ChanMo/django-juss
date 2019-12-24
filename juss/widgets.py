import logging

from django.conf import settings
from django.core.files.storage import default_storage
from django.forms.widgets import ClearableFileInput, Select, Textarea

logger = logging.getLogger(__name__)

class RichTextWidget(Textarea):
    class Media:
        js = ('bower_components/tinymce/tinymce.min.js',
                'juss/widgets/richtext.js')

class JFileInputWidget(ClearableFileInput):
    template_name = 'juss/widgets/jfileinput.html'


class JMSelectWidget(Select):
    template_name = 'juss/widgets/jmselect.html'

    class Media:
        css = {
            'all': ('juss/widgets/micromodal.css',)
        }
        js = ('https://unpkg.com/micromodal/dist/micromodal.min.js', 'juss/widgets/jfileselect.js')

    def create_option(self, name, value, label, selected, index, subindex=None, attrs=None):
        data = super().create_option(name, value, label, selected, index, subindex=None, attrs=None)
        data['url'] = default_storage.url(value.replace(settings.MEDIA_ROOT, ''))

        return data

    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)
        context['widget']['optgroups'] = self.optgroups(name, context['widget']['value'], attrs)

        value = context['widget']['value'][0]

        if value:
            context['widget']['url'] = default_storage.url(value.replace(settings.MEDIA_ROOT, ''))

        return context
