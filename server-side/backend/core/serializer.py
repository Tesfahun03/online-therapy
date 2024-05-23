from .models import User, Profile, Patient, Therapist
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # These are claims
        token['first_name'] = user.profile.first_name
        token['last_name'] = user.profile.last_name
        token['username'] = user.username
        token['email'] = user.email
        token['user_type'] = user.profile.user_type
        
        # ...
        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']

        )

        user.set_password(validated_data['password'])
        user.save()

        return user
    
    
class ProfileSerializer(serializers.ModelSerializer):
    user = RegisterSerializer()
    class Meta:
        model = Profile
        fields = ['user', 'user_id', 'user_type', 'first_name', 'last_name', \
                    'image', 'bio', 'prefered_language', "age", 'gender', 'martial_status', \
                        'phone', 'city', 'region','publicKey' ]
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')

        user_serializer = RegisterSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        
        profile = Profile.objects.create(user=user, **validated_data)
        return profile
    

class PatientSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    
    class Meta:
        model = Patient
        fields =['profile', 'occupation', 'has_paid']

    def create(self, validated_data):
        user_data = validated_data.pop('profile')

        user_serializer = ProfileSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        profile = user_serializer.save()
        
        patient = Patient.objects.create(profile=profile, **validated_data)
        return patient
    
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        
        # Update profile if profile data is provided
        if profile_data:
            profile_serializer = ProfileSerializer(instance.profile, data=profile_data)
            if profile_serializer.is_valid():
                profile_serializer.save()

        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        return instance


class TherapistSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)

    class Meta:
        model = Therapist
        fields =['profile', 'specialization', 'experience', 'licenses', 'religion', \
                    'rating', 'paymentRate', 'totalBalance', 'withdrawableBalance']

    def create(self, validated_data):
        user_data = validated_data.pop('profile')
        
        user_serializer = ProfileSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        profile = user_serializer.save()
        
        therapist = Therapist.objects.create(profile=profile, **validated_data)
        return therapist

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        
        # Update profile if profile data is provided
        if profile_data:
            profile_serializer = ProfileSerializer(instance.profile, data=profile_data)
            if profile_serializer.is_valid():
                profile_serializer.save()

        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        return instance

