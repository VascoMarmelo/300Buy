from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.ListCATEGORY.as_view()),
    path('categories/<int:category_id>/', views.DetailCATEGORY.as_view()),
    path('carts/', views.DetailCART.as_view()),
    path('filldb/', views.FillDB.as_view())
]