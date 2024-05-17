from django.urls import path
from . import views
from communication.views import TherapistAppointments, PatientAppointments, TherapistAvailabilityViewSet, TherapistNotification, PatientNotification
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'therapist/(?P<therapist_id>\d+)/appointments', TherapistAppointments, basename='therapist-appointments')
router.register(r'patient/(?P<patient_id>\d+)/appointments', PatientAppointments, basename='patient-appointments')
router.register(r'therapist/(?P<therapist_id>\d+)/availability', TherapistAvailabilityViewSet, basename='therapist-availability')
router.register(r'therapist/(?P<therapist_id>\d+)/notification', TherapistNotification, basename='therapist-notification')
router.register(r'patient/(?P<patient_id>\d+)/notification', PatientNotification, basename='[patient]-availability')

urlpatterns = router.urls + [
    path('', views.getRoutes),
    # Chat/Text Messaging Functionality
    path("my-messages/<user_id>/", views.MyInbox.as_view()),
    path("get-messages/<sender_id>/<reciever_id>/", views.GetMessages.as_view()),
    path("send-messages/", views.SendMessages.as_view()),
    
    
    path('book-appointment/', views.AppointmentsViewSet.as_view(), name='appointments'),
    path('room-insights/', views.RoomInsightsAPIView.as_view(), name='room_insights'),
]

