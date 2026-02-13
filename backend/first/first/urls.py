"""
URL configuration for first project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import views

# Create router and register viewsets
router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')
router.register(r'profiles', views.UserProfileViewSet, basename='userprofile')
router.register(r'zones', views.WaterZoneViewSet, basename='waterzone')
router.register(r'usage', views.WaterUsageViewSet, basename='waterusage')
router.register(r'alerts', views.AlertViewSet, basename='alert')
router.register(r'reports', views.ReportViewSet, basename='report')
router.register(r'settings', views.SystemSettingsViewSet, basename='systemsettings')
router.register(r'activity', views.ActivityLogViewSet, basename='activitylog')
router.register(r'compliance', views.ComplianceViewSet, basename='compliance')
router.register(r'dashboard', views.DashboardViewSet, basename='dashboard')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]
