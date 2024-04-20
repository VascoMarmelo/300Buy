from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from .models import User

# Create your views here.


def index(request):
    return render(request, template_name='app/main_page.html')


def app_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        print(username, password)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('app_index')
    return render(request, template_name='app/login.html')


def app_logout(request):
    logout(request)
    return redirect('app_login')