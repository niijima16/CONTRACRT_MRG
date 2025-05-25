from rest_framework.routers import DefaultRouter
from .views import SalesRecordViewSet

router = DefaultRouter()
router.register(r'', SalesRecordViewSet)

app_name = 'salesrecord'
urlpatterns = router.urls