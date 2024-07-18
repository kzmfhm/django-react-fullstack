from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title

class Item(models.Model):
   
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=50,default='')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to="images",default='')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="items")

    def __str__(self):
        return self.name

  
