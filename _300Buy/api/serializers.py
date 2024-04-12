from rest_framework import serializers
from app.models import List, Item

#ANTIGO
class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = '__all__' #['title'] -> Só mete o titulo
#ANTIGO
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__' #['title'] -> Só mete o titulo
#ANTIGO
class ListDetailSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)
    class Meta:
        model = List
        fields = ['id', 'title', 'items']

