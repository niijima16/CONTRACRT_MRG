# apps/notifications/models.py

from django.db import models

class Notification(models.Model):
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"通知 ({self.created_at.strftime('%Y-%m-%d %H:%M')})"