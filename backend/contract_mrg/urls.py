# backend/contract_mrg/urls.py

from django.contrib import admin
from django.urls import path, include
# 開発用の静的ファイルの提供
from django.conf import settings
from django.conf.urls.static import static

# for JWT authentication.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # 管理サイト
    path('admin/', admin.site.urls),

    # ユーザーマネージャーアプリ (/api/users/)
    path('api/users/', include('apps.usermanager.urls')),
    
    # APIルーティング
    # 契約情報アプリ (/api/contracts/)
    path('api/contracts/', include('apps.contracts.urls')),

    # 請求書アプリ (/api/invoices/)
    path('api/invoices/', include('apps.invoices.urls')),

    # 営業情報 (/api/sales/)
    path('api/sales/', include('apps.sales.urls')),

    # 契約先情報アプリ (/api/clients/)
    path('api/clients/', include('apps.clients.urls')),

    # 一斉メール送信アプリ (/api/bulkmail/)
    path('api/bulkmail/', include('apps.bulkmail.urls')),

    # 通知アプリ (/api/notifications/)
    path('api/notifications/', include('apps.notifications.urls')),

    # 認証（ログイン／ログアウトなど） (/api/accounts/)
    path('api/accounts/', include('django.contrib.auth.urls')),
    
    # JWT認証エンドポイント
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)