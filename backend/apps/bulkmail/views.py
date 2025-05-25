from django.shortcuts import render

from rest_framework import viewsets
from .models import BulkMail
from .serializers import BulkMailSerializer

class BulkMailViewSet(viewsets.ModelViewSet):
    queryset = BulkMail.objects.all()
    serializer_class = BulkMailSerializer