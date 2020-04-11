import logging
from django.contrib.postgres.fields import ArrayField, JSONField
from django.db import models
from . import forms
from . import widgets

logger = logging.getLogger(__name__)


class MultipleImageField(ArrayField):
    def __init__(self, base_field=None, size=2, **kwargs):
        super().__init__(models.URLField(), size, **kwargs)

    def formfield(self, **kwargs):
        return super().formfield(**{
            'form_class': forms.MultipleImageField,
            'base_field': self.base_field.formfield(),
            'max_length': self.size,
            **kwargs,
        })


class JSONEditField(JSONField):
    def __init__(self, verbose_name=None, name=None, encoder=None, template={}, **kwargs):
        if encoder and not callable(encoder):
            raise ValueError("The encoder parameter must be a callable object.")
        self.encoder = encoder
        self.template = template
        super().__init__(verbose_name, name, **kwargs)


    def formfield(self, **kwargs):
        res = super().formfield(**{
            'form_class': forms.JSONEditField,
            **kwargs
        })
        res.widget.attrs.update({'template':self.template})
        return res

    def widget_attrs(self, widget):
        attrs = super().widget_attrs(widget)
        attrs.setdefault('template', 'teststst')
        return attrs
