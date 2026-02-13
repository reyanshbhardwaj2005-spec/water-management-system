"""
Django shell script to create sample data for the Water Management System.
Run with: python manage.py shell < create_sample_data.py
"""

from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
from api.models import (
    UserProfile, WaterZone, WaterUsage, Alert, Report,
    SystemSettings, Compliance
)

# Create Users
print("Creating users...")
users_data = [
    {'username': 'admin', 'password': 'admin123', 'role': 'admin', 'name': 'Admin User'},
    {'username': 'manager', 'password': 'manager123', 'role': 'manager', 'name': 'Sarah Manager'},
    {'username': 'technician', 'password': 'tech123', 'role': 'technician', 'name': 'Mike Technician'},
    {'username': 'monitor', 'password': 'monitor123', 'role': 'monitor', 'name': 'Emily Monitor'},
]

for user_data in users_data:
    user, created = User.objects.get_or_create(
        username=user_data['username'],
        defaults={
            'email': f"{user_data['username']}@watermanagement.com",
            'first_name': user_data['name'].split()[0],
            'last_name': user_data['name'].split()[1] if len(user_data['name'].split()) > 1 else '',
        }
    )
    if created:
        user.set_password(user_data['password'])
        user.save()
        print(f"  Created user: {user_data['username']}")
    
    # Update profile
    profile, _ = UserProfile.objects.get_or_create(user=user)
    profile.role = user_data['role']
    profile.save()
    print(f"  Set role: {user_data['role']}")

# Create Water Zones
print("\nCreating water zones...")
zones_data = [
    {'name': 'Building A', 'type': 'building', 'desc': 'Main office building'},
    {'name': 'Building B', 'type': 'building', 'desc': 'Secondary office building'},
    {'name': 'Building C', 'type': 'building', 'desc': 'Warehouse building'},
    {'name': 'Outdoor Area', 'type': 'outdoor', 'desc': 'Courtyard and parking areas'},
    {'name': 'Irrigation System', 'type': 'irrigation', 'desc': 'Landscape irrigation'},
]

zones = []
for zone_data in zones_data:
    zone, created = WaterZone.objects.get_or_create(
        name=zone_data['name'],
        defaults={
            'description': zone_data['desc'],
            'zone_type': zone_data['type'],
        }
    )
    zones.append(zone)
    if created:
        print(f"  Created zone: {zone_data['name']}")

# Create Usage Records
print("\nCreating usage records...")
now = timezone.now()
for zone in zones:
    for day in range(7, 0, -1):
        for hour in range(0, 24, 4):
            measurement_time = now - timedelta(days=day, hours=hour)
            usage = WaterUsage.objects.create(
                zone=zone,
                usage_liters=50 + (day * 10) + (hour * 2),
                measurement_time=measurement_time,
                quality_percentage=90 + (day % 3),
                is_peak=(8 <= hour <= 18)
            )
print(f"  Created usage records for all zones")

# Create Alerts
print("\nCreating alerts...")
admin_user = User.objects.get(username='admin')
alerts_data = [
    {'title': 'High Water Usage', 'type': 'warning', 'zone': zones[0], 'severity': 3, 'status': 'active'},
    {'title': 'System Malfunction', 'type': 'error', 'zone': zones[4], 'severity': 5, 'status': 'active'},
    {'title': 'Maintenance Required', 'type': 'warning', 'zone': zones[2], 'severity': 2, 'status': 'active'},
    {'title': 'Routine Maintenance', 'type': 'info', 'zone': zones[1], 'severity': 1, 'status': 'resolved'},
]

for alert_data in alerts_data:
    alert, created = Alert.objects.get_or_create(
        title=alert_data['title'],
        defaults={
            'message': f"Alert: {alert_data['title']} detected in {alert_data['zone'].name}",
            'alert_type': alert_data['type'],
            'status': alert_data['status'],
            'severity': alert_data['severity'],
            'zone': alert_data['zone'],
            'resolved_at': now - timedelta(hours=2) if alert_data['status'] == 'resolved' else None,
            'resolved_by': admin_user if alert_data['status'] == 'resolved' else None,
        }
    )
    if created:
        print(f"  Created alert: {alert_data['title']}")

# Create Reports
print("\nCreating reports...")
admin = User.objects.get(username='admin')
start_date = (now - timedelta(days=30)).date()
end_date = now.date()

report_data = [
    {'title': 'June Monthly Report', 'type': 'monthly'},
    {'title': 'Q2 Quarterly Report', 'type': 'quarterly'},
    {'title': 'Leak Detection Report', 'type': 'leak_detection'},
]

for rpt in report_data:
    report, created = Report.objects.get_or_create(
        title=rpt['title'],
        defaults={
            'report_type': rpt['type'],
            'description': f"Generated {rpt['type']} water management report",
            'generated_by': admin,
            'start_date': start_date,
            'end_date': end_date,
            'total_usage': 45000 + (len(zones) * 1000),
            'efficiency_rate': 92.5,
            'data': {
                'zones': len(zones),
                'measurements': 168,
                'peak_hours': 8,
            }
        }
    )
    if created:
        print(f"  Created report: {rpt['title']}")

# Create System Settings
print("\nCreating system settings...")
settings, created = SystemSettings.objects.get_or_create(
    organization_name='Water Management Corp',
    defaults={
        'organization_email': 'admin@watermanagement.com',
        'organization_phone': '+1-555-0123',
        'system_version': '1.0.0',
        'database_size': '1.2 GB',
        'api_endpoint': 'http://localhost:8000/api/',
        'maintenance_mode': False,
        'last_backup': now,
        'auto_backup_enabled': True,
    }
)
if created:
    print(f"  Created system settings")

# Create Compliance Records
print("\nCreating compliance records...")
compliance_data = [
    {'category': 'Usage Limits', 'status': 'pass', 'pct': 85},
    {'category': 'Quality Standards', 'status': 'pass', 'pct': 95},
    {'category': 'Maintenance Schedule', 'status': 'pass', 'pct': 100},
    {'category': 'Peak Usage Monitoring', 'status': 'warning', 'pct': 75},
]

for comp in compliance_data:
    compliance, created = Compliance.objects.get_or_create(
        category=comp['category'],
        defaults={
            'description': f"Compliance tracking for {comp['category']}",
            'status': comp['status'],
            'percentage': comp['pct'],
            'notes': 'Regular monitoring in progress'
        }
    )
    if created:
        print(f"  Created compliance: {comp['category']}")

print("\n✅ Sample data creation completed!")
print("\nCreated:")
print(f"  - {len(users_data)} users")
print(f"  - {len(zones)} water zones")
print(f"  - ~140 usage records")
print(f"  - {len(alerts_data)} alerts")
print(f"  - {len(report_data)} reports")
print(f"  - 1 system settings")
print(f"  - {len(compliance_data)} compliance records")
print("\nYou can now login with:")
print("  - Username: admin / Password: admin123")
print("  - Username: manager / Password: manager123")
print("  - Username: technician / Password: tech123")
print("  - Username: monitor / Password: monitor123")
