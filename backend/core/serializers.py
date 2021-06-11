from django.db.models import fields
from rest_framework import serializers
from .models import User, Employee, Department, Designation


class EmployeeSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='employee.email')
    first_name = serializers.CharField(source='employee.first_name')
    last_name = serializers.CharField(source='employee.last_name')

    class Meta:
        model = Employee
        # fields = '__all__'
        fields = ('id' ,'email', 'first_name', 'last_name', 'mobile', 'joining_date', 'dept', 'designation')
    
    def create(self, validated_data):
        """
        {'employee': {'email': 'laxmikant@test.com', 'first_name': 'Laxmikant', 'last_name': 'Ratnaparkhi'}, 'mobile': '9767547164', 'joining_date': 
        datetime.date(2021, 12, 12), 'dept': <Department: Production>, 'designation': 
        <Designation: Engineer>
        """
        print("validated_data", validated_data)
        user_data = validated_data.pop('employee')
        user = User.objects.create(
            username=user_data.get('email'), 
            email=user_data.pop('email'),
            first_name=user_data.pop('first_name'),
            last_name=user_data.pop('last_name'),
        )
        validated_data['employee'] = user
        instance = Employee.objects.create(**validated_data)
        # instance.employee = user
        return instance



class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('id' ,'name')

class DesignationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Designation
        fields = ('id' ,'name')