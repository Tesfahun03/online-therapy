from django.contrib import admin
from .models import User, Profile, Patient, Therapist


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'first_name', 'last_name']
    
class PatientAdmin(admin.ModelAdmin):
    list_display = ['profile']
    
class TherapistAdmin(admin.ModelAdmin):
    list_display = ['profile']



admin.site.register(User, UserAdmin)
admin.site.register( Profile,ProfileAdmin)
admin.site.register( Patient,PatientAdmin)
admin.site.register( Therapist,TherapistAdmin)

