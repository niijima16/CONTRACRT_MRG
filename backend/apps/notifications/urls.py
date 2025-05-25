from rest_framework.routers import DefaultRouter
from .views import NotificationViewSet

router = DefaultRouter()
router.register(r'', NotificationViewSet)

app_name = 'notification'
urlpatterns = router.urls