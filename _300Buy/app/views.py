from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
# from django.contrib.auth import authenticate, login, logout
from .models import User

# Create your views here.


def index(request):
    return render(request, template_name='app/main_page.html')

def app_login(request):
    return render(request, template_name='app/login.html')

def app_register(request):
    return render(request, template_name='app/login.html')