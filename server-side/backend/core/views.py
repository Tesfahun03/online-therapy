from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import OuterRef, Subquery
from django.db.models import Q

from core.models import User, Profile, Patient, Therapist

from core.serializer import MyTokenObtainPairSerializer, RegisterSerializer, ProfileSerializer, \
                                UserSerializer, PatientSerializer, TherapistSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class PatientRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = PatientSerializer

class TherapistRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = TherapistSerializer
    
class TherapistDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Therapist.objects.all()
    serializer_class = TherapistSerializer
    
    def get_object(self):
        user_id = self.kwargs.get('user_id')

        try:
            therapist = Therapist.objects.get(profile__user_id=user_id)
            return therapist
        except Therapist.DoesNotExist:
            raise Http404
        
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        # Update specific attributes only
        specific_attributes = {'specialization', 'experience', 'licenses', 'religion'}
        for attr in specific_attributes:
            if attr in request.data:
                setattr(instance, attr, request.data[attr])

        # Update the nested Profile instance
        profile_data = request.data.get('profile', {})
        profile_serializer = ProfileSerializer(instance.profile, data=profile_data, partial=True)
        if profile_serializer.is_valid():
            profile_serializer.save()
        else:
            return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_update(serializer)
        return Response(serializer.data)

# List of all patients and therapists
class TherapistDetailViews(generics.ListAPIView):
    queryset = Therapist.objects.all()
    serializer_class = TherapistSerializer    
class PatientDetailViews(generics.ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer        
    
#################################################        

class PatientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    
    def get_object(self):
        user_id = self.kwargs.get('user_id')

        try:
            patient = Patient.objects.get(profile__user_id=user_id)
            return patient
        except Patient.DoesNotExist:
            raise Http404
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        # Update specific attributes only
        specific_attributes = {'occupation', 'has_paid'}
        for attr in specific_attributes:
            if attr in request.data:
                setattr(instance, attr, request.data[attr])

        # Update the nested Profile instance
        profile_data = request.data.get('profile', {})
        profile_serializer = ProfileSerializer(instance.profile, data=profile_data, partial=True)
        if profile_serializer.is_valid():
            profile_serializer.save()
        else:
            return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_update(serializer)
        return Response(serializer.data)


# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/core/token/',
        '/core/register-patient/',
        '/core/register-therapist/',
        '/core/token/refresh/'
    ]
    return Response(routes)




class ProfileDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]  

    def get_object(self):
        user_id = self.kwargs.get('pk')

        try:
            profile = Profile.objects.get(user_id=user_id)
            return profile
        except Profile.DoesNotExist:
            raise Http404

class SearchUser(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]  

    def list(self, request, *args, **kwargs):
        username = self.kwargs['username']
        logged_in_user = self.request.user
        users = Profile.objects.filter(Q(user__username__icontains=username) | Q(first_name__icontains=username) | Q(user__email__icontains=username) & 
                                       ~Q(user=logged_in_user))

        if not users.exists():
            return Response(
                {"detail": "No users found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)



