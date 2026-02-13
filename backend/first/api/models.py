from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Role choices
ROLE_CHOICES = [
    ('admin', 'Administrator'),
    ('manager', 'Manager'),
    ('technician', 'Technician'),
    ('monitor', 'Monitor'),
]

ALERT_TYPE_CHOICES = [
    ('warning', 'Warning'),
    ('error', 'Error'),
    ('info', 'Info'),
]

ALERT_STATUS_CHOICES = [
    ('active', 'Active'),
    ('resolved', 'Resolved'),
]


class UserProfile(models.Model):
    """Extended user profile with roles and preferences"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='monitor')
    organization = models.CharField(max_length=255, default='Water Management Corp')
    phone = models.CharField(max_length=20, blank=True)
    timezone = models.CharField(max_length=50, default='UTC')
    language = models.CharField(max_length=10, default='en')
    theme = models.CharField(max_length=10, choices=[('light', 'Light'), ('dark', 'Dark')], default='light')
    notifications_enabled = models.BooleanField(default=True)
    email_alerts = models.BooleanField(default=True)
    daily_reports = models.BooleanField(default=False)
    auto_backup = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.get_role_display()})"


class WaterZone(models.Model):
    """Water management zones/locations"""
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    zone_type = models.CharField(
        max_length=50,
        choices=[
            ('building', 'Building'),
            ('outdoor', 'Outdoor Area'),
            ('irrigation', 'Irrigation System'),
            ('other', 'Other'),
        ],
        default='building'
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class WaterUsage(models.Model):
    """Track water usage measurements"""
    zone = models.ForeignKey(WaterZone, on_delete=models.CASCADE, related_name='usage_records')
    usage_liters = models.FloatField()
    measurement_time = models.DateTimeField()
    is_peak = models.BooleanField(default=False)
    quality_percentage = models.IntegerField(default=100, help_text="Water quality percentage")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-measurement_time']
        indexes = [
            models.Index(fields=['zone', '-measurement_time']),
        ]

    def __str__(self):
        return f"{self.zone.name} - {self.usage_liters}L at {self.measurement_time}"


class Alert(models.Model):
    """System alerts and notifications"""
    zone = models.ForeignKey(WaterZone, on_delete=models.CASCADE, related_name='alerts', null=True, blank=True)
    title = models.CharField(max_length=255)
    message = models.TextField()
    alert_type = models.CharField(max_length=20, choices=ALERT_TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=ALERT_STATUS_CHOICES, default='active')
    severity = models.IntegerField(default=1, help_text="Severity level 1-5")
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    resolved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='resolved_alerts')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.get_status_display()}"


class Report(models.Model):
    """Generated system reports"""
    REPORT_TYPE_CHOICES = [
        ('monthly', 'Monthly Usage Report'),
        ('quarterly', 'Quarterly Performance'),
        ('annual', 'Annual Summary'),
        ('leak_detection', 'Leak Detection'),
        ('compliance', 'Compliance Report'),
    ]

    title = models.CharField(max_length=255)
    report_type = models.CharField(max_length=50, choices=REPORT_TYPE_CHOICES)
    description = models.TextField(blank=True)
    generated_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='generated_reports')
    start_date = models.DateField()
    end_date = models.DateField()
    total_usage = models.FloatField(default=0)
    efficiency_rate = models.FloatField(default=0)
    data = models.JSONField(default=dict, help_text="Report summary data")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.created_at.date()})"


class SystemSettings(models.Model):
    """Global system settings"""
    organization_name = models.CharField(max_length=255, default='Water Management Corp')
    organization_email = models.EmailField()
    organization_phone = models.CharField(max_length=20, blank=True)
    system_version = models.CharField(max_length=20, default='1.0.0')
    database_size = models.CharField(max_length=50, default='0 GB')
    api_endpoint = models.URLField(max_length=500)
    maintenance_mode = models.BooleanField(default=False)
    last_backup = models.DateTimeField(null=True, blank=True)
    auto_backup_enabled = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "System Settings"

    def __str__(self):
        return f"System Settings - {self.organization_name}"


class ActivityLog(models.Model):
    """Track user activities"""
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='activities')
    action = models.CharField(max_length=255)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.user.username} - {self.action} ({self.timestamp})"


class Compliance(models.Model):
    """Track compliance status"""
    COMPLIANCE_CHOICES = [
        ('pass', 'Pass'),
        ('warning', 'Warning'),
        ('fail', 'Fail'),
    ]

    category = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=COMPLIANCE_CHOICES)
    percentage = models.IntegerField(default=100)
    last_checked = models.DateTimeField(auto_now=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['category']
        verbose_name_plural = "Compliance"

    def __str__(self):
        return f"{self.category} - {self.get_status_display()}"

