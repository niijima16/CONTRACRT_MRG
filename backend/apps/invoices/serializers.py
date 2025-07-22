# backend/apps/invoices/serializers.py

from rest_framework import serializers
from apps.invoices.models import Invoice, InvoiceItem

class InvoiceItemSerializer(serializers.ModelSerializer):
    """
    InvoiceItem（請求明細行）モデルのシリアライザ。

    - id: 明細行の一意識別子
    - description: 品目名
    - quantity: 数量
    - unit_price: 単価
    """
    class Meta:
        model = InvoiceItem
        fields = ['id', 'description', 'quantity', 'unit_price']


class InvoiceSerializer(serializers.ModelSerializer):
    """
    Invoice（請求基本情報）モデルのシリアライザ。

    - ネストで InvoiceItemSerializer を items フィールドに定義し、
      請求書とその明細を一括で入出力できるようにする。
    - create() と update() をオーバーライドして、ネストされた明細の作成・更新処理を実装。
    """
    # ネストされた明細一覧
    items = InvoiceItemSerializer(many=True)

    class Meta:
        model = Invoice
        fields = [
            'id',
            'invoice_number',
            'registration_number',
            'bank_name',
            'branch_name',
            'account_number',
            'account_holder',
            'sent_date',
            'payment_due_date',
            'contract',
            'items',
        ]

    def create(self, validated_data):
        """
        新規請求書の作成処理。

        1. validated_data から 'items' を取り出し（pop）
        2. Invoice インスタンスを作成
        3. 取り出した items_data をループし、各明細行を InvoiceItem として作成
        4. 生成した Invoice を返却
        """
        items_data = validated_data.pop('items')
        # Invoice 本体を作成
        invoice = Invoice.objects.create(**validated_data)

        # ネストされた明細行をまとめて作成
        for row in items_data:
            InvoiceItem.objects.create(basic=invoice, **row)

        return invoice

    def update(self, instance, validated_data):
        """
        既存請求書の更新処理。

        1. validated_data から 'items' を取り出し（pop）
        2. 親クラスの update() で Invoice 本体を更新
        3. 既存の明細行をすべて削除
        4. 新しい items_data をループし、InvoiceItem を再作成
        5. 更新済みの Invoice インスタンスを返却
        """
        items_data = validated_data.pop('items')

        # Invoice 本体を更新
        instance = super().update(instance, validated_data)

        # 明細行をクリアして新規作成
        instance.items.all().delete()
        for row in items_data:
            InvoiceItem.objects.create(basic=instance, **row)

        return instance