# backend/apps/contracts/views.py
import json
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.forms.models import model_to_dict
from .models import Contract, ContractHistory
from .serializers import ContractSerializer, ContractHistorySerializer

class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all().order_by('-created_at')
    serializer_class = ContractSerializer

    def perform_update(self, serializer):
        instance = self.get_object()
        snapshot = model_to_dict(instance)
        snapshot_json = json.loads(json.dumps(snapshot, cls=DjangoJSONEncoder))
        ContractHistory.objects.create(
            contract=instance,
            snapshot=snapshot_json
        )
        serializer.save()

class ContractHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContractHistory.objects.all()
    serializer_class = ContractHistorySerializer

class ContractChoicesView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({
            "work_styles": Contract.WorkStyle.choices,
        }, status=status.HTTP_200_OK)