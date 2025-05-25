# apps/bulkmail/serializers.py

from rest_framework import serializers
from .models import BulkMail

class BulkMailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BulkMail
        fields = '__all__'