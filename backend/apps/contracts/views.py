from django.shortcuts import render

from rest_framework import viewsets
from .models import Contract
from .serializers import ContractSerializer

class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer