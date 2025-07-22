# backend/apps/usermanager/serializers.py

from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model  = CustomUser
        fields = ['id', 'email', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        # email と password のみを使ってユーザー作成
        return CustomUser.objects.create_user(
            email=validated_data['email'],
            password=password
        )