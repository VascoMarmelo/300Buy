from rest_framework import serializers
from app.models import Product, Category, Cart, User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__' 

# Slug
class ProductDetailSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        read_only=True,
        slug_field='title'
    )
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
    cart_products = ProductDetailSerializer(source='product')
    class Meta:
        model = Cart
        fields = ['user', 'id', 'amount', 'paid', 'cart_products']

    def create(self, validated_data):
        print("data:", validated_data)

        new_data = {
            'user' : User.objects.get(id=validated_data['user']),
            'paid' : validated_data['paid'],
            'amount' : validated_data['amount'],
            'product' : Product.objects.get(id=validated_data['cart_products']['id'])
        }

        print("data2: ", new_data)
        return super().create(new_data)




