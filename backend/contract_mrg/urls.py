# backend/contract_mrg/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # 管理サイトへのアクセス
    path('admin/', admin.site.urls),

    # 契約情報アプリケーションのエンドポイントをまとめて /api/contracts/ 以下にマウント
    # apps.contracts.urls には ViewSet を利用した contracts/ および histories/、choices/ が含まれる
    path('api/', include('apps.contracts.urls')),

    # 請求書関連エンドポイント（apps.invoices.urls）
    path('invoices/', include('apps.invoices.urls')),

    # 売上関連エンドポイント（apps.sales.urls）
    path('sales/', include('apps.sales.urls')),

    # クライアント情報エンドポイント（apps.clients.urls）
    path('clients/', include('apps.clients.urls')),

    # 一斉メール送信機能エンドポイント（apps.bulkmail.urls）
    path('bulkmail/', include('apps.bulkmail.urls')),

    # 通知機能エンドポイント（apps.notifications.urls）
    path('notifications/', include('apps.notifications.urls')),

    # Django 標準の認証ビュー（ログイン／ログアウト／パスワード管理など）
    path('accounts/', include('django.contrib.auth.urls')),
]