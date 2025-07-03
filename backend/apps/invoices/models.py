from django.db import models
from apps.contracts.models import Contract
from django.utils import timezone

class Invoice(models.Model):
    """
    請求書情報を表すモデル。

    請求書番号、登録番号、契約先会社名及び情報、支払い情報、日付など、
    請求書に関する基本的なデータを管理します。
    """

    # 請求書番号。必須、最大50文字
    invoice_number = models.CharField(max_length=50, verbose_name='請求書番号',default='')
    # 登録番号。必須、最大50文字
    registration_number = models.CharField(max_length=50, verbose_name='登録番号', default  ='')
    # 金融機関名。必須、最大100文字
    bank_name = models.CharField(max_length=100, verbose_name='金融機関名', default='')
    # 支店名。必須、最大100文字
    branch_name = models.CharField(max_length=100, verbose_name='支店名', default='')
    # 口座番号。必須、最大20文字
    account_number = models.CharField(max_length=20, verbose_name='口座番号', default='')
    # 口座名義。必須、最大100文字
    account_holder = models.CharField(max_length=100, verbose_name='口座名義', default='')
    # 送信日。デフォルトは現在日時
    sent_date = models.DateField(
        verbose_name='送信日',
        default=timezone.now
    )
    # 支払期日。必須、デフォルトは現在日時
    payment_due_date = models.DateField(
        verbose_name='支払期日',
        default=timezone.now
    )
    
    # 外部キー引用ブロック
    contract = models.ForeignKey(
        Contract,
        on_delete=models.CASCADE,
        related_name='invoices',
        verbose_name='契約',
        null=True,
        blank=True,
    )
    
    class Meta:
        verbose_name = '請求基本情報'
        verbose_name_plural = '請求基本情報'

    def __str__(self):
        return f"{self.contract.client_company}"
   
    
class InvoiceItem(models.Model):
    """
    請求明細行を表すモデル。
    各請求書に関連する品目、数量、単価などの詳細を管理します。
    """
    basic = models.ForeignKey(
        Invoice,
        on_delete=models.CASCADE,
        related_name='items',
        verbose_name='請求基本情報',
    )
    description = models.CharField('品目', max_length=255)
    quantity = models.PositiveIntegerField('数量', default=1)
    unit_price = models.DecimalField('単価', max_digits=10, decimal_places=2)
    
    @property
    def amount(self):
        return self.quantity * self.unit_price

    class Meta:
        verbose_name = '請求明細行'
        verbose_name_plural = '請求明細行'

    def __str__(self):
        return f"{self.description} x{self.quantity}"