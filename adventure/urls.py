from django.conf.urls import url
from . import api

urlpatterns = [
    url('post', api.post),
]
