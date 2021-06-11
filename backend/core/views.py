from django.shortcuts import render
from .serializers import EmployeeSerializer, DesignationSerializer, DepartmentSerializer 
from rest_framework import viewsets      
from .models import Employee, Designation, Department               


class EmployeeView(viewsets.ModelViewSet):  
    serializer_class = EmployeeSerializer   
    # emp = Employee.objects.first()
    queryset = Employee.objects.all()     


class DesignationView(viewsets.ModelViewSet):  
    serializer_class = DesignationSerializer   
    queryset = Designation.objects.all()     


class DepartmentView(viewsets.ModelViewSet):  
    serializer_class = DepartmentSerializer   
    queryset = Department.objects.all()     
