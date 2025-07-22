# backend/apps/contracts/serializers.py
from rest_framework import serializers
from .models import Contract, ContractManager, ContractHistory


class ContractManagerSerializer(serializers.ModelSerializer):
    """
    ContractManagerモデルのシリアライザ。

    契約ごとの担当者情報（氏名、メールアドレス）を入出力可能にする。
    """
    class Meta:
        model = ContractManager
        # id, name, emailフィールドのみを扱う
        fields = ['id', 'name', 'email']


class ContractSerializer(serializers.ModelSerializer):
    """
    Contractモデルのシリアライザ。

    - managersフィールドはネストされたContractManagerSerializerを利用し、多対一の担当者情報を扱う。
    - create/updateメソッドをオーバーライドして、マネージャー情報を適切に生成・更新する。
    """
    managers = ContractManagerSerializer(many=True)

    class Meta:
        model = Contract
        # Contractモデルの全フィールドを扱う
        fields = '__all__'

    def create(self, validated_data):
        """
        新規契約作成時の処理。

        1. validated_dataからmanagersデータを取り出す
        2. Contractインスタンスを作成
        3. 各マネージャーデータを元にContractManagerを作成し、契約に紐付け
        """
        managers_data = validated_data.pop('managers')
        contract = Contract.objects.create(**validated_data)
        for manager_data in managers_data:
            ContractManager.objects.create(contract=contract, **manager_data)
        return contract

    def update(self, instance, validated_data):
        """
        既存契約更新時の処理。

        1. validated_dataからmanagersデータを取り出す
        2. Contractの基本フィールドを更新
        3. 既存の関連ContractManagerをすべて削除
        4. 新しいmanagersデータで再作成
        """
        managers_data = validated_data.pop('managers')
        # Contract本体の更新
        instance = super().update(instance, validated_data)
        # 担当者を一旦クリアして新規登録
        instance.managers.all().delete()
        for manager_data in managers_data:
            ContractManager.objects.create(contract=instance, **manager_data)
        return instance


class ContractHistorySerializer(serializers.ModelSerializer):
    """
    ContractHistoryモデルのシリアライザ。

    - 保存されたスナップショットデータをそのまま返す。
    """
    class Meta:
        model = ContractHistory
        fields = '__all__'