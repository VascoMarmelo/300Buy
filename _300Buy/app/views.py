from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password

from .models import User, Category, Product, Cart

# Create your views here.


def index(request):
    return render(request, template_name='app/main_page.html')

def app_login(request):
    return render(request, template_name='app/login.html')

def app_register(request):
    if request.method == 'POST':
        user_email = request.POST.get('email')
        user_first_name = request.POST.get('first name')
        user_last_name = request.POST.get('last name')
        user_username = request.POST.get('username')
        user_password = request.POST.get('password')
        hashed_password = make_password(user_password)

        user = User(email=user_email, first_name=user_first_name, last_name=user_last_name, username=user_username, password=hashed_password)
        user.save()
        if user is not None:
            login(request, user)
            return redirect('app_index')
    return render(request, template_name='app/register.html')


def app_logout(request):
    logout(request)
    return redirect('app_login')


def add_product(request, category_id):
    if request.user.is_superuser:
        product_title = request.POST.get('product_title')
        category = get_object_or_404(Category, pk=category_id)
        product = Product(title=product_title, category=category)
        product.save()
        return redirect('app_index') # Temporário


