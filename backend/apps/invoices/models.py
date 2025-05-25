from django.db import models

class Invoice(models.Model):
    invoice_number = models.CharField(max_length=50)
    issue_date = models.DateField()
    due_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.invoice_number