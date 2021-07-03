from django.db import models
from django.contrib.auth.models import User, Group


class Designation(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name


class Department(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name


class Employee(models.Model):
    active = models.BooleanField(default=True)
    employee = models.OneToOneField(User, on_delete=models.CASCADE)
    designation = models.ForeignKey(Designation, blank=True, null=True, on_delete=models.CASCADE)
    dept = models.ForeignKey(Department, blank=True, null=True, on_delete=models.CASCADE)
    mobile = models.CharField(max_length=20, blank=True, null=True)
    alternate_phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(max_length=500, blank=True, null=True)
    joining_date = models.DateField(blank=True, null=True)
    created_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        print("Employee", self.employee.get_full_name())
        return self.employee.get_full_name()