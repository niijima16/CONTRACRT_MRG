# backend/apps/contracts/models.py
from django.db import models
from django.utils import timezone


class Contract(models.Model):
    class WorkStyle(models.TextChoices):
        REMOTE = 'remote', 'リモートワーク'
        ONSITE = 'onsite', '常駐'
        HYBRID = 'hybrid', 'ハイブリッド'

    employee_name = models.CharField('社員名', max_length=255, default='')
    work_style = models.CharField('働き方', max_length=20, choices=WorkStyle.choices, default=WorkStyle.ONSITE)
    contract_start_date = models.DateField('契約開始日', default=timezone.now)
    contract_end_date = models.DateField('契約終了日', default=timezone.now)
    project_name = models.CharField('案件名', max_length=255, default='')
    client_company = models.CharField('契約先会社名', max_length=255, default='')
    client_address = models.CharField('契約先住所', max_length=512, blank=True, default='')
    unit_price = models.PositiveIntegerField('単価（万円/月）', default=0)
    overtime_unit_price = models.PositiveIntegerField('超過単価（円/時）', default=0)
    deduction_unit_price = models.PositiveIntegerField('控除単価（円/時）', default=0)
    working_hours_min = models.PositiveIntegerField('下限時間（h/月）', default=0)
    working_hours_max = models.PositiveIntegerField('上限時間（h/月）', default=0)
    payment_site_days = models.PositiveIntegerField('支払いサイト（日）', default=0)
    created_at = models.DateTimeField('登録日時', auto_now_add=True, null=True) 
    updated_at = models.DateTimeField('更新日時', auto_now=True)

    def __str__(self):
        return f"{self.employee_name} ({self.project_name})"


class ContractManager(models.Model):
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='managers')
    name = models.CharField('担当者氏名', max_length=255)
    email = models.EmailField('メールアドレス')

    def __str__(self):
        return f"{self.name} <{self.email}>"


class ContractHistory(models.Model):
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='histories')
    snapshot = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.contract.employee_name} の履歴 @ {self.created_at}"