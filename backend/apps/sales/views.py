from django.shortcuts import render

from rest_framework import viewsets
from .models import SalesRecord
from .serializers import SalesRecordSerializer

class SalesRecordViewSet(viewsets.ModelViewSet):
    queryset = SalesRecord.objects.all()
    serializer_class = SalesRecordSerializer