# backend/apps/invoices/views.py
from rest_framework import viewsets
from rest_framework.exceptions import MethodNotAllowed
from .models import Invoice, InvoiceItem
from .serializers import InvoiceSerializer, InvoiceItemSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    """
    請求書情報の CRUD を提供します。
      - list/retrieve: Invoice 一覧・詳細
      - update/partial_update: 既存 Invoice の更新
      - destroy: Invoice の削除
    （POST /invoices/ は 405 を返すようにしています）
    """
    queryset = Invoice.objects.all().order_by('-sent_date')
    serializer_class = InvoiceSerializer

    # これで create (POST) を受け付けない
    def create(self, request, *args, **kwargs):
        raise MethodNotAllowed('POST')

class InvoiceItemViewSet(viewsets.ModelViewSet):
    """
    請求明細の CRUD を提供します。
      - list/retrieve/create/update/destroy すべて可能
    """
    queryset = InvoiceItem.objects.all()
    serializer_class = InvoiceItemSerializer