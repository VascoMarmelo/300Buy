from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='app_index'),
    path('login/', views.app_login, name='app_login'),
    path('register/', views.app_register, name='app_register'),
]