# backend/apps/usermanager/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)
from .views import CustomUserViewSet

router = DefaultRouter()
router.register(r'', CustomUserViewSet, basename='customuser')

urlpatterns = [
    # ログイン： email + password → アクセス／リフレッシュ トークン返却
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # リフレッシュ： refresh_token → 新しいアクセス／リフレッシュ トークン
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # （必要なら）ログアウトでリフレッシュトークンを無効化
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),

    # ユーザー CRUD（一覧・詳細取得は認証後のみ）
    path('', include(router.urls)),
]