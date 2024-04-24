from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.ListCATEGORY.as_view()),
    path('products/', views.ListPRODUCT.as_view()),
    path('products/<int:product_id>/', views.DetailPRODUCT.as_view()),
    path('products/<str:product_title>/', views.SearchPRODUCT.as_view()),
    path('categories/<int:category_id>/', views.DetailCATEGORY.as_view()),
    path('carts/', views.DetailCART.as_view()),
    path('filldb/', views.FillDB.as_view())
]