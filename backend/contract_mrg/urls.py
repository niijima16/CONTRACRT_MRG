from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.contracts.urls')), 
    path('invoices/', include('apps.invoices.urls')),
    path('sales/', include('apps.sales.urls')),
    path('clients/', include('apps.clients.urls')),
    path('bulkmail/', include('apps.bulkmail.urls')),
    path('notifications/', include('apps.notifications.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
]