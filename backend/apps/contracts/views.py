# backend/apps/contracts/views.py

import json
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.forms.models import model_to_dict

from .models import Contract, ContractHistory
from .serializers import ContractSerializer, ContractHistorySerializer


class ContractViewSet(viewsets.ModelViewSet):
    """
    契約情報のCRUD操作を提供するViewSet。

    - list/retrieve: 契約一覧・詳細を取得
    - create: 新規契約を追加
    - update/partial_update: 契約情報を更新（履歴をContractHistoryに保存）
    - destroy: 契約を削除
    """
    queryset = Contract.objects.all().order_by('-created_at')
    serializer_class = ContractSerializer

    def perform_update(self, serializer):
        """
        更新前の契約情報をスナップショットとして履歴モデルに保存してから更新を実行。

        1. self.get_object() で既存インスタンスを取得
        2. model_to_dict() で辞書化
        3. DjangoJSONEncoder を使ってJSON互換にシリアライズし、parseしてPythonオブジェクト化
        4. ContractHistory に保存
        5. serializer.save() で実際の更新をコミット
        """
        # 更新対象契約インスタンス
        instance = self.get_object()

        # 現在のフィールド値を辞書化
        snapshot = model_to_dict(instance)

        # 日付フィールドなども含めてJSON互換に変換
        snapshot_json = json.loads(json.dumps(snapshot, cls=DjangoJSONEncoder))

        # 履歴モデルに保存
        ContractHistory.objects.create(
            contract=instance,
            snapshot=snapshot_json
        )

        # 本体更新を実行
        serializer.save()


class ContractHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ContractHistory の一覧取得・詳細取得のみを許可するViewSet。

    契約履歴の閲覧用途に限定（作成・更新・削除は行わない）。
    """
    queryset = ContractHistory.objects.all()
    serializer_class = ContractHistorySerializer


class ContractChoicesView(APIView):
    """
    フロントエンド用に、契約の選択肢情報（列挙型など）を返却するAPIView。

    GET /api/contracts/choices/ で利用可能。
    """
    def get(self, request, *args, **kwargs):
        """
        - work_styles: Contractモデルで定義した働き方の選択肢一覧を返却
        - ステータスコード 200 OK
        """
        return Response({
            "work_styles": Contract.WorkStyle.choices,
        }, status=status.HTTP_200_OK)