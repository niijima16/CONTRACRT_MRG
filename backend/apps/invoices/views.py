from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models.models import Invoice
from .serializers import InvoiceSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer