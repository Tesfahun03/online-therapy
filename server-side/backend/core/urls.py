from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register-therapist/', views.TherapistRegisterView.as_view(), name='therapist_register'),
    path('register-patient/', views.PatientRegisterView.as_view(), name='patient_register'),
    path('therapists/<int:user_id>/', views.TherapistDetailView.as_view(), name='therapist_detail'),
    path('patients/<int:user_id>/', views.PatientDetailView.as_view(), name='patient_detail'),
    path('', views.getRoutes),

    # Get profile
    path("profile/<int:pk>/", views.ProfileDetail.as_view()),
    path("search/<username>/", views.SearchUser.as_view()),

]