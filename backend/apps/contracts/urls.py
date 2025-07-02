"""
契約アプリのURL設定モジュール。
このファイルでは、契約情報、契約履歴、選択肢取得用のエンドポイントを定義しています。
"""

from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ContractViewSet, ContractHistoryViewSet, ContractChoicesView

# DefaultRouter を使うことで ViewSet の標準的な CRUD URL を自動生成します
router = DefaultRouter()
# /contracts/ — 契約情報の一覧取得、作成、詳細取得、更新、削除を担当
router.register(r'contracts', ContractViewSet)
# /histories/ — 契約履歴の一覧取得、詳細取得のみ（ReadOnlyModelViewSet）
router.register(r'histories', ContractHistoryViewSet)

# router.urls で生成されたルートに加え、以下を追加
urlpatterns = router.urls + [
    # /choices/ — フロントエンドで使う働き方などの選択肢を返却する API
    path(
        'choices/',
        ContractChoicesView.as_view(),
        name='contract-choices'
    ),
]