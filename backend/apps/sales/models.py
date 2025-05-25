from django.db import models

class SalesRecord(models.Model):
    date = models.DateField()
    salesperson = models.CharField(max_length=100)
    client = models.CharField(max_length=100)
    revenue = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.date} - {self.salesperson}"