from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    UserProfile, WaterZone, WaterUsage, Alert, Report,
    SystemSettings, ActivityLog, Compliance
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    role_display = serializers.CharField(source='get_role_display', read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'id', 'user', 'role', 'role_display', 'organization', 'phone',
            'timezone', 'language', 'theme', 'notifications_enabled',
            'email_alerts', 'daily_reports', 'auto_backup', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class WaterZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterZone
        fields = ['id', 'name', 'description', 'zone_type', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class WaterUsageSerializer(serializers.ModelSerializer):
    zone_name = serializers.CharField(source='zone.name', read_only=True)

    class Meta:
        model = WaterUsage
        fields = ['id', 'zone', 'zone_name', 'usage_liters', 'measurement_time', 
                  'is_peak', 'quality_percentage', 'created_at']
        read_only_fields = ['id', 'created_at']


class AlertSerializer(serializers.ModelSerializer):
    zone_name = serializers.CharField(source='zone.name', read_only=True, allow_null=True)
    alert_type_display = serializers.CharField(source='get_alert_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    resolved_by_name = serializers.CharField(source='resolved_by.get_full_name', read_only=True, allow_null=True)

    class Meta:
        model = Alert
        fields = [
            'id', 'zone', 'zone_name', 'title', 'message', 'alert_type',
            'alert_type_display', 'status', 'status_display', 'severity',
            'created_at', 'resolved_at', 'resolved_by', 'resolved_by_name'
        ]
        read_only_fields = ['id', 'created_at', 'resolved_at', 'resolved_by']


class ReportSerializer(serializers.ModelSerializer):
    generated_by_name = serializers.CharField(source='generated_by.get_full_name', read_only=True, allow_null=True)
    report_type_display = serializers.CharField(source='get_report_type_display', read_only=True)

    class Meta:
        model = Report
        fields = [
            'id', 'title', 'report_type', 'report_type_display', 'description',
            'generated_by', 'generated_by_name', 'start_date', 'end_date',
            'total_usage', 'efficiency_rate', 'data', 'created_at'
        ]
        read_only_fields = ['id', 'created_at', 'generated_by', 'generated_by_name']


class SystemSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemSettings
        fields = [
            'id', 'organization_name', 'organization_email', 'organization_phone',
            'system_version', 'database_size', 'api_endpoint', 'maintenance_mode',
            'last_backup', 'auto_backup_enabled', 'updated_at'
        ]
        read_only_fields = ['id', 'updated_at', 'system_version', 'database_size']


class ActivityLogSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True, allow_null=True)

    class Meta:
        model = ActivityLog
        fields = ['id', 'user', 'user_name', 'action', 'description', 'timestamp', 'ip_address']
        read_only_fields = ['id', 'timestamp']


class ComplianceSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Compliance
        fields = ['id', 'category', 'description', 'status', 'status_display', 
                  'percentage', 'last_checked', 'notes']
        read_only_fields = ['id', 'last_checked']


class DashboardStatsSerializer(serializers.Serializer):
    """Serializer for dashboard statistics"""
    total_usage = serializers.FloatField()
    daily_average = serializers.FloatField()
    water_quality = serializers.IntegerField()
    system_health = serializers.IntegerField()
    active_alerts = serializers.IntegerField()
    total_zones = serializers.IntegerField()


class UsageReportSerializer(serializers.Serializer):
    """Serializer for usage reports"""
    zone_name = serializers.CharField()
    total_usage = serializers.FloatField()
    peak_usage = serializers.FloatField()
    low_usage = serializers.FloatField()
    average_usage = serializers.FloatField()
    percentage = serializers.FloatField()
