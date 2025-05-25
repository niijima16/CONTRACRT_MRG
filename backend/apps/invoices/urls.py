from rest_framework.routers import DefaultRouter
from .views import InvoiceViewSet

router = DefaultRouter()
router.register(r'', InvoiceViewSet)

app_name = 'invoice'
urlpatterns = router.urls