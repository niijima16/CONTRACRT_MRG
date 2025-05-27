# backend/apps/contracts/urls.py

from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ContractViewSet, ContractHistoryViewSet, ContractChoicesView

router = DefaultRouter()
router.register(r'contracts', ContractViewSet)
router.register(r'histories', ContractHistoryViewSet)

urlpatterns = router.urls + [
    path('choices/', ContractChoicesView.as_view(), name='contract-choices'),
]