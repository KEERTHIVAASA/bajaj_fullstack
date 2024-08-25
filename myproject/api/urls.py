from django.urls import path
from .views import MyAPIView

urlpatterns = [
    path('api/endpoint/', MyAPIView.as_view(), name='my_api_endpoint'),
]
