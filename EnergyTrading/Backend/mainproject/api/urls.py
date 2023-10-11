from django.urls import path
from . import views

urlpatterns = [
    path('',views.testview),
    path('register/',views.register),
    path('login/',views.login),
    path('token/refresh/', views.RefreshTokenView.as_view(), name='token_refresh'),
    path('tokentest/',views.tokentest_view),
]
