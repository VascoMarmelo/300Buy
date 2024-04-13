from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.ListCATEGORY.as_view()),
]