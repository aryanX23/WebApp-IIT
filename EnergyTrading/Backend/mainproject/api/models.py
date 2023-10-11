from django.db import models

# Create your models here.
import uuid

class MyUser(models.Model):
    # Use AutoField as the primary key
    
    email = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=300)
    usercode=models.CharField(max_length=100,unique=True)
    meta = {
        'collection': 'UserUI_Users',
        'verbose_name': 'Custom User',
    }
    
    def __str__(self):
        return self.username