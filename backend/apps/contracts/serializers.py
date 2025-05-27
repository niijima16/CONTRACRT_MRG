# /backend/apps/contracts/serializers.py

from rest_framework import serializers
from .models import Contract, ContractManager, ContractHistory

class ContractManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractManager
        fields = ['id', 'name', 'email']

class ContractSerializer(serializers.ModelSerializer):
    managers = ContractManagerSerializer(many=True)

    class Meta:
        model = Contract
        fields = '__all__'

    def create(self, validated_data):
        managers_data = validated_data.pop('managers')
        contract = Contract.objects.create(**validated_data)
        for manager_data in managers_data:
            ContractManager.objects.create(contract=contract, **manager_data)
        return contract

    def update(self, instance, validated_data):
        managers_data = validated_data.pop('managers')
        instance = super().update(instance, validated_data)
        instance.managers.all().delete()
        for manager_data in managers_data:
            ContractManager.objects.create(contract=instance, **manager_data)
        return instance

class ContractHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractHistory
        fields = '__all__'