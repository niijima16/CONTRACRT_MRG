# backend/apps/invoices/urls.py
from rest_framework.routers import DefaultRouter
from .views import InvoiceViewSet,InvoiceItemViewSet

router = DefaultRouter()

# /invoices/ — 請求書の一覧取得、作成、詳細取得、更新、削除を担当
router.register(r'invoices', InvoiceViewSet)
# /invoice-items/ — 請求書明細の一覧取得、作成、詳細取得、更新、削除を担当
router.register(r'invoice-items', InvoiceItemViewSet)

app_name = 'invoice'
urlpatterns = router.urls
