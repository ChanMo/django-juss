from django.contrib.postgres.forms import SimpleArrayField, JSONField
from .widgets import *

class MultipleImageField(SimpleArrayField):
    widget = MultipleImageWidget


class JSONEditField(JSONField):
    widget = JSONWidget
