# backend/apps/contracts/models.py

from django.db import models
from django.utils import timezone


class Contract(models.Model):
    """
    契約情報を表すモデル。

    社員名、働き方、契約期間、案件情報、料金、担当者など、
    契約に関する基本的なデータを管理します。
    """

    class WorkStyle(models.TextChoices):
        """
        働き方の選択肢。

        - REMOTE: リモートワーク
        - ONSITE: 常駐
        - HYBRID: ハイブリッド
        """
        REMOTE = 'remote', 'リモートワーク'
        ONSITE = 'onsite', '常駐'
        HYBRID = 'hybrid', 'ハイブリッド'

    # 社員名。必須、最大255文字
    employee_name = models.CharField(
        '社員名',
        max_length=255,
        default=''
    )
    # 働き方。WorkStyle の choices から選択
    work_style = models.CharField(
        '働き方',
        max_length=20,
        choices=WorkStyle.choices,
        default=WorkStyle.ONSITE
    )
    # 契約開始日。デフォルトは現在日時
    contract_start_date = models.DateField(
        '契約開始日',
        default=timezone.now
    )
    # 契約終了日。デフォルトは現在日時
    contract_end_date = models.DateField(
        '契約終了日',
        default=timezone.now
    )
    # 案件名。必須、最大255文字
    project_name = models.CharField(
        '案件名',
        max_length=255,
        default=''
    )
    # 契約先会社名。必須、最大255文字
    client_company = models.CharField(
        '契約先会社名',
        max_length=255,
        default=''
    )
    # 契約先住所。任意、最大512文字
    client_address = models.CharField(
        '契約先住所',
        max_length=512,
        blank=True,
        default=''
    )
    # 単価（万円/月）。0以上の整数
    unit_price = models.PositiveIntegerField(
        '単価（万円/月）',
        default=0
    )
    # 超過単価（円/時）。0以上の整数
    overtime_unit_price = models.PositiveIntegerField(
        '超過単価（円/時）',
        default=0
    )
    # 控除単価（円/時）。0以上の整数
    deduction_unit_price = models.PositiveIntegerField(
        '控除単価（円/時）',
        default=0
    )
    # 下限労働時間（h/月）。0以上の整数
    working_hours_min = models.PositiveIntegerField(
        '下限時間（h/月）',
        default=0
    )
    # 上限労働時間（h/月）。0以上の整数
    working_hours_max = models.PositiveIntegerField(
        '上限時間（h/月）',
        default=0
    )
    # 支払いサイト（日）。何日後に支払いか
    payment_site_days = models.PositiveIntegerField(
        '支払いサイト（日）',
        default=0
    )
    # レコード作成日時（自動設定）
    created_at = models.DateTimeField(
        '登録日時',
        auto_now_add=True,
        null=True
    )
    # レコード更新日時（自動設定）
    updated_at = models.DateTimeField(
        '更新日時',
        auto_now=True
    )

    def __str__(self):
        """
        管理画面などで表示される文字列表現。
        「社員名 (案件名)」の形式で返す。
        """
        return f"{self.employee_name} ({self.project_name})"


class ContractManager(models.Model):
    """
    契約に紐づく担当者（マネージャー）情報を表すモデル。

    Contract と 1対多 のリレーション。
    """
    # 紐付く Contract
    contract = models.ForeignKey(
        Contract,
        on_delete=models.CASCADE,
        related_name='managers'
    )
    # 担当者氏名
    name = models.CharField(
        '担当者氏名',
        max_length=255
    )
    # 担当者メールアドレス
    email = models.EmailField(
        'メールアドレス'
    )

    def __str__(self):
        """
        「氏名 <メールアドレス>」形式で表示。
        """
        return f"{self.name} <{self.email}>"

class ContractHistory(models.Model):
    """
    契約更新履歴を記録するモデル。

    契約情報が更新されるたびにスナップショットを保存。
    """
    # 対象の契約
    contract = models.ForeignKey(
        Contract,
        on_delete=models.CASCADE,
        related_name='histories'
    )
    # 更新前のフィールド値をJSONとして格納
    snapshot = models.JSONField()
    # 履歴レコード作成日時（自動設定）
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        # 作成日時の降順で並び替え
        ordering = ['-created_at']

    def __str__(self):
        """
        管理画面などで表示される文字列表現。
        「社員名 の履歴 @ 作成日時」
        """
        return f"{self.contract.employee_name} の履歴 @ {self.created_at}"