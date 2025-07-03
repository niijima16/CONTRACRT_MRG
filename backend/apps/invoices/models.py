from django.db import models
from contracts.models import Contract

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
        auto_now_add=True
    )
    # 支払期日。必須、デフォルトは現在日時
    payment_due_date = models.DateField(
        verbose_name='支払期日',
        default=models.DateField.auto_now_add
    )
    
    
    # 外部キー引用ブロック
    contract = models.ForeignKey(
        Contract,
        on_delete=models.CASCADE,
        related_name='invoices',
        verbose_name='契約'
    )

    def __str__(self):
        return self.invoice_number