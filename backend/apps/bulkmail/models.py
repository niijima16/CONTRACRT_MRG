from django.db import models

class BulkMail(models.Model):
    subject = models.CharField(max_length=255)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    recipient_count = models.PositiveIntegerField()

    def __str__(self):
        return self.subject