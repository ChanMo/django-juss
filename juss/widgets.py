import logging

from django.conf import settings
from django.core.files.storage import default_storage
from django.forms.widgets import ClearableFileInput, Select, Textarea, URLInput, TextInput

logger = logging.getLogger(__name__)

class HtmlEditor(Textarea):
    def __init__(self, *args, **kwargs):
        super(HtmlEditor, self).__init__(*args, **kwargs)
        self.attrs['class'] = 'html-editor'

    class Media:
        css = {
            'all': (
                'bower_components/codemirror/lib/codemirror.css',
            )
        }
        js = (
            'bower_components/codemirror/lib/codemirror.js',
            'bower_components/codemirror/mode/xml/xml.js',
            'bower_components/codemirror/mode/htmlmixed/htmlmixed.js',
            'juss/widgets/htmleditor.js'
        )

class RichTextWidget(Textarea):
    def __init__(self, *args, **kwargs):
        super(RichTextWidget, self).__init__(*args, **kwargs)
        self.attrs['class'] = 'richtext'

    class Media:
        js = ('bower_components/tinymce/tinymce.min.js',
                'juss/widgets/richtext.js')


class JFileInputWidget(ClearableFileInput):
    template_name = 'juss/widgets/jfileinput.html'

class JImageWidget(TextInput):
    " 单图 "
    template_name = 'juss/widgets/jimage.html'

class MultipleImageWidget(TextInput):
    " 多图 "
    template_name = 'juss/widgets/multiple_image.html'


class JSONWidget(Textarea):
    " JSON "
    template_name = 'juss/widgets/json.html'

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
