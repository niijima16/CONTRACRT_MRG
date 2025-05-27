# backend/apps/contracts/admin.py

from django.contrib import admin
from .models import Contract, ContractManager, ContractHistory


class ContractManagerInline(admin.TabularInline):
    model = ContractManager
    extra = 1


@admin.register(Contract)
class ContractAdmin(admin.ModelAdmin):
    list_display = (
        'employee_name', 'project_name', 'client_company',
        'contract_start_date', 'contract_end_date', 'created_at'
    )
    search_fields = ('employee_name', 'project_name', 'client_company')
    list_filter = ('work_style',)
    inlines = [ContractManagerInline]


@admin.register(ContractHistory)
class ContractHistoryAdmin(admin.ModelAdmin):
    list_display = ('contract', 'created_at')
    readonly_fields = ('snapshot', 'created_at')