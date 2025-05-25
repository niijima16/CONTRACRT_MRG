from django.db import models

class Contract(models.Model):
    title = models.CharField(max_length=255)
    client_name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.title