from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView, status
from rest_framework.response import Response

from app.models import Product, Category, Cart
from .serializers import CategorySerializer, CategoryDetailSerializer


class ListCATEGORY(APIView):
    """List all CATEGORY lists."""

    def get(self, request):
        category = Category.objects
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)