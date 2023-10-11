from django.contrib import admin
from .models import MyUser  # Import your User model

class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username')  # Define which fields to display in the admin list view

# Register the User model with the UserAdmin class
admin.site.register(MyUser, UserAdmin)