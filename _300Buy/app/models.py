from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    email = models.EmailField(max_length=100)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Categeory(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.title}'


class Product(models.Model):
    title = models.CharField(max_length=100)
    category = models.ForeignKey(Categeory, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return f'{self.title}'
    

class Cart(models.Model):
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cart')
    paid = models.BooleanField(default=False)
    amount = models.IntegerField()

    def __str__(self):
        return f'{self.title}'