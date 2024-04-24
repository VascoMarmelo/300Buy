from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView, status
from rest_framework.response import Response

from app.models import Product, Category, Cart
from .serializers import CategorySerializer, ProductDetailSerializer, CategoryDetailSerializer, CartDetailSerializer
from django.core.management import call_command


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
    

class ListPRODUCT(APIView):
    """Details a PRODUCT lists."""

    def get(self, request):
        product = Product.objects
        serializer = ProductDetailSerializer(product, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            

class DetailPRODUCT(APIView):
    """Details a CATEGORY list"""

    def get(self, request, product_id):
        product = get_object_or_404(Product, pk=product_id)
        serializer = ProductDetailSerializer(product, many=False)
        return Response(serializer.data)
    
    def put(self, request, product_id):
        product = get_object_or_404(Product, pk=product_id)
        serializer = ProductDetailSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SearchPRODUCT(APIView):
    """Details a PRODUCT lists."""

    def get(self, request, product_title):
        products = Product.objects.filter(title__startswith=product_title)
        serializer = ProductDetailSerializer(products, many=True)
        return Response(serializer.data)
 

class DetailCATEGORY(APIView):
    """Details a CATEGORY list"""

    def get(self, request, category_id):
        category = get_object_or_404(Category, pk=category_id)
        serializer = CategoryDetailSerializer(category, many=False)
        return Response(serializer.data)

    '''
    def delete(self, request, category_id):
        category = get_object_or_404(Category, pk=category_id)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    '''

    def put(self, request, category_id):
        category = get_object_or_404(Category, pk=category_id)
        serializer = CategoryDetailSerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DetailCART(APIView):
    """Details a CART list"""

    def get(self, request):
        cart = Cart.objects.filter(user=request.user)
        serializer = CartDetailSerializer(cart, many=True)
        return Response(serializer.data)

    def post(self, request):
        request.data['user'] = request.user.id
        serializer = CartDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class FillDB(APIView):

    def get(self, request):
        call_command('loaddata', 'inidb.json')
        return Response("DB restarted")