from rest_framework.routers import DefaultRouter
from .views import ContractViewSet

router = DefaultRouter()
router.register(r'', ContractViewSet)

app_name = 'contracts'
urlpatterns = router.urls