# backend/apps/usermanager/views.py

from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import CustomUser
from .serializers import CustomUserSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]