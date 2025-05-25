from django.db import models

class Client(models.Model):
    name = models.CharField(max_length=100)
    contact_person = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    address = models.TextField()

    def __str__(self):
        return self.name