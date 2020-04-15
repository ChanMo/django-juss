import logging
from django.contrib.postgres.forms import SimpleArrayField, JSONField
from django.forms.fields import URLField, CharField
from .widgets import *

logger = logging.getLogger(__name__)

class RichTextField(CharField):
    #widget = RichTextWidget
    def __init__(self, **kwargs):
        kwargs.update({'widget': RichTextWidget()})
        return super().__init__(**kwargs)

class ImageChoiceField(CharField):
    #widget = JImageWidget
    def __init__(self, **kwargs):
        kwargs.update({'widget': JImageWidget()})
        return super().__init__(**kwargs)

class MultipleImageField(SimpleArrayField):
    widget = MultipleImageWidget

class JSONEditField(JSONField):
    widget = JSONWidget
