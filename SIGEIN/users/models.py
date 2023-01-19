from django.core import validators
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.models import Group


class UserRoles(models.Model):

    ROLE_CHOICES = (
        ("admin", "admin"),
        ("manager", "manager"),
        ("operator", "operator"),
        ("client", "client"),
        ("root", "root")
    )

    role = models.CharField(unique=True, max_length=20, choices=ROLE_CHOICES, blank=False, null=True, default=None)   

    def __str__(self):
        return self.role



class CustomUserManager(BaseUserManager):

    def create_user(self, email, password, first_name, last_name, phone_number, role, **extra_fields):
                
        if not email:
            raise ValueError('The Email field must be set')
        if not first_name:
            raise ValueError('The firts_name field must be set')            
        if not last_name:
            raise ValueError('The last_name field must be set')


        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, phone_number=phone_number, role=role, **extra_fields)
        user.set_password(password)        
        user.save()
        print("ejecutando create_user de customUserManager")
        print("password: ", user.password)
       
        return user
    

    def create_superuser(self, email, password, first_name, last_name, phone_number, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)        

        # Remove the 'role' field from the extra_fields dictionary
        extra_fields.pop('role', None)

        user_role = UserRoles.objects.filter( role='root' )
        user_role = user_role[0]          
        extra_fields['role'] = user_role 
        
        return self.create_user(email, password, first_name, last_name, phone_number, **extra_fields)



class CustomUser(AbstractUser, PermissionsMixin):
    
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=200, validators=[validators.MinLengthValidator(8)])
    first_name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=30, blank=False)
    phone_number = models.CharField(max_length=10, validators=[validators.MinLengthValidator(10)], blank=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    role = models.ForeignKey(UserRoles, on_delete=models.SET_NULL, null=True)
    
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number', 'role']

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        self.username = self.email
        print("ejecutando save de customusers")
        super().save(*args, **kwargs)
        #executing_CustomUser_save_signal.connect(sender=CustomUser, request=request, user=user)



@receiver(post_save, sender=CustomUser)
def add_user_to_group(sender, instance, created, **kwargs):
    if not created:
        instance.groups.clear()

    if instance.role.__str__() == 'admin':
        group = Group.objects.get(name='admins')
        instance.groups.add(group)
    if instance.role.__str__() == 'manager':
        group = Group.objects.get(name='managers')
        instance.groups.add(group)
    elif instance.role.__str__() == 'operator':            
        group = Group.objects.get(name='operators')
        instance.groups.add(group)
    elif instance.role.__str__() == 'client':
        group = Group.objects.get(name='clients')
        instance.groups.add(group)

                        