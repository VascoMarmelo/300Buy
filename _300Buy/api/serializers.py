from rest_framework import serializers
from app.models import Product, Category, Cart

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__' 

class ProductDetailSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.title')
    class Meta:
        model = Product
        fields = ['id', 'title', 'category']      

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CategoryDetailSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'title', 'products']


class CartDetailSerializer(serializers.ModelSerializer):
    cart_products = ProductSerializer(source='product')
    class Meta:
        model = Cart
        fields = ['user', 'id', 'amount', 'paid', 'cart_products']



