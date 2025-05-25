from rest_framework.routers import DefaultRouter
from .views import BulkMailViewSet

router = DefaultRouter()
router.register(r'', BulkMailViewSet)

app_name = 'bulkmail'
urlpatterns = router.urls