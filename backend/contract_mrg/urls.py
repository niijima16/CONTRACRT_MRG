# backend/contract_mrg/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/contracts/', include('apps.contracts.urls')),
    path('api/invoices/', include('apps.invoices.urls')),
    path('api/sales/', include('apps.sales.urls')),
    path('api/clients/', include('apps.clients.urls')),
    path('api/bulkmail/', include('apps.bulkmail.urls')),
    path('api/notifications/', include('apps.notifications.urls')),
    path('api/accounts/', include('django.contrib.auth.urls')),
]
