# 🌊 WaterFlow Backend API - Setup Guide

## Overview

This is a complete Django REST Framework backend for the WaterFlow Water Management System. It provides comprehensive APIs for managing water resources, users, alerts, reports, and system configuration.

## 📦 Installation

### Step 1: Navigate to Backend Directory
```bash
cd d:\hello\backend\first
```

### Step 2: Activate Virtual Environment (if using .venv)
```bash
# Windows
.venv\Scripts\activate

# Linux/Mac
source .venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Apply Migrations
```bash
python manage.py migrate
```

### Step 5: Create Admin User
```bash
python manage.py createsuperuser
```
Follow the prompts to create an admin account.

### Step 6: Create Sample Data (Optional)
```bash
python manage.py shell < create_sample_data.py
```

## 🚀 Running the Server

### Development Server
```bash
python manage.py runserver
```

The API will be available at: `http://localhost:8000/api/`
Admin panel: `http://localhost:8000/admin/`

## 📋 API Endpoints

### Authentication & Users
- `GET /api/users/` - List all users
- `POST /api/users/` - Create new user
- `GET /api/users/{id}/` - Get user details
- `PUT /api/users/{id}/` - Update user
- `DELETE /api/users/{id}/` - Delete user

- `GET /api/profiles/` - List all user profiles
- `GET /api/profiles/my_profile/` - Get current user's profile
- `PUT /api/profiles/update_my_profile/` - Update current user's profile
- `GET /api/profiles/{id}/` - Get user profile details
- `PUT /api/profiles/{id}/` - Update user profile

### Water Zones
- `GET /api/zones/` - List all water zones
- `POST /api/zones/` - Create new zone
- `GET /api/zones/{id}/` - Get zone details
- `PUT /api/zones/{id}/` - Update zone
- `DELETE /api/zones/{id}/` - Delete zone
- `GET /api/zones/{id}/usage_stats/` - Get zone usage statistics

### Water Usage
- `GET /api/usage/` - List usage records
- `POST /api/usage/` - Create usage record
- `GET /api/usage/{id}/` - Get usage record details
- `PUT /api/usage/{id}/` - Update usage record
- `GET /api/usage/trend/?days=7` - Get 7-day usage trend
- `GET /api/usage/trend/?zone=1&days=30` - Get zone-specific trend

### Alerts
- `GET /api/alerts/` - List all alerts
- `POST /api/alerts/` - Create new alert
- `GET /api/alerts/{id}/` - Get alert details
- `PUT /api/alerts/{id}/` - Update alert
- `DELETE /api/alerts/{id}/` - Delete alert
- `POST /api/alerts/{id}/resolve/` - Resolve an alert
- `GET /api/alerts/active/` - Get all active alerts
- `GET /api/alerts/count/` - Get alert counts

### Reports
- `GET /api/reports/` - List all reports
- `POST /api/reports/` - Create new report
- `GET /api/reports/{id}/` - Get report details
- `PUT /api/reports/{id}/` - Update report
- `GET /api/reports/by_type/?type=monthly` - Get reports by type
- `GET /api/reports/monthly/` - Generate monthly report

### System Settings
- `GET /api/settings/` - List all settings
- `GET /api/settings/current/` - Get current settings
- `PUT /api/settings/current/` - Update current settings

### Activity Logs
- `GET /api/activity/` - List all activities
- `GET /api/activity/{id}/` - Get activity details

### Compliance
- `GET /api/compliance/` - List all compliance records
- `POST /api/compliance/` - Create compliance record
- `GET /api/compliance/{id}/` - Get compliance details
- `PUT /api/compliance/{id}/` - Update compliance

### Dashboard
- `GET /api/dashboard/stats/` - Get dashboard statistics
- `GET /api/dashboard/top_zones/` - Get top consuming zones
- `GET /api/dashboard/activity_log/` - Get recent activity

## 🔐 Authentication

The API uses token-based authentication. To authenticate:

1. Login via Django admin panel
2. All API requests must include the session cookie or token header

## 📊 Database Models

### UserProfile
- User account with role-based access control
- 4 roles: Administrator, Manager, Technician, Monitor
- Preferences: timezone, language, theme, notification settings

### WaterZone
- Represents water distribution zones/locations
- Types: Building, Outdoor Area, Irrigation System
- Track usage metrics per zone

### WaterUsage
- Records water consumption measurements
- Timestamp-based tracking
- Quality percentage per measurement
- Peak/normal usage classification

### Alert
- System notifications and warnings
- 3 types: Warning, Error, Info
- 2 statuses: Active, Resolved
- Severity levels 1-5

### Report
- Generated usage and compliance reports
- 5 report types: Monthly, Quarterly, Annual, Leak Detection, Compliance
- Includes detailed usage breakdown

### SystemSettings
- Global system configuration
- Organization information
- Backup and maintenance settings

### ActivityLog
- User action tracking
- Timestamp and IP logging
- Audit trail for compliance

### Compliance
- Compliance status tracking
- Multiple compliance categories
- Pass/Warning/Fail status

## 🛠️ Configuration

### CORS Settings (in settings.py)
The backend is configured to accept requests from:
- `http://localhost:3000` (React dev server)
- `http://localhost:5173` (Vite dev server)
- `http://127.0.0.1:5173` (Local Vite)

### Database
Currently using SQLite (`db.sqlite3`). For production, configure:
- PostgreSQL
- MySQL
- Other supported databases

## 📝 Sample Data

To create sample data, you can use the Django shell:

```bash
python manage.py shell
```

Then execute commands to create zones, users, usage records, etc.

## 🧪 Testing

Run tests with:
```bash
python manage.py test
```

## 📦 Project Structure

```
backend/first/
├── manage.py
├── db.sqlite3
├── requirements.txt
│
├── first/ (Project settings)
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
└── api/ (Main app)
    ├── models.py (Database models)
    ├── serializers.py (API serializers)
    ├── views.py (API viewsets)
    ├── urls.py (URL routing)
    ├── admin.py (Admin configuration)
    ├── signals.py (Signal handlers)
    ├── apps.py
    ├── tests.py
    └── migrations/ (Database migrations)
```

## 🔧 Common Commands

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Run shell
python manage.py shell

# Collect static files
python manage.py collectstatic

# Run tests
python manage.py test

# Reset database
python manage.py flush
```

## 🚀 Deployment

### Production Checklist
- [ ] Set `DEBUG = False` in settings.py
- [ ] Update `ALLOWED_HOSTS`
- [ ] Use a production database (PostgreSQL recommended)
- [ ] Set a strong `SECRET_KEY`
- [ ] Configure HTTPS/SSL
- [ ] Set up proper CORS origins
- [ ] Configure email backend for alerts
- [ ] Set up static files serving
- [ ] Configure logging
- [ ] Set up monitoring

### Deploy with Gunicorn
```bash
pip install gunicorn
gunicorn first.wsgi:application --bind 0.0.0.0:8000
```

## 📞 API Response Format

### Success Response
```json
{
  "id": 1,
  "name": "Building A",
  "zone_type": "building",
  "is_active": true,
  "created_at": "2024-02-10T10:30:00Z",
  "updated_at": "2024-02-13T14:52:00Z"
}
```

### Error Response
```json
{
  "error": "Error message describing what went wrong"
}
```

### Paginated Response
```json
{
  "count": 100,
  "next": "http://api/resource/?page=2",
  "previous": null,
  "results": [...]
}
```

## 🔒 Security

- Change default secret key in production
- Never expose sensitive information in logs
- Use HTTPS in production
- Implement rate limiting
- Validate all input data
- Use strong password policies
- Keep dependencies updated

## 📖 Additional Resources

- Django Documentation: https://docs.djangoproject.com
- Django REST Framework: https://www.django-rest-framework.org
- CORS Documentation: https://github.com/adamchainz/django-cors-headers
- PostgreSQL Setup: https://www.postgresql.org

## ✅ Troubleshooting

### Migration Errors
```bash
python manage.py makemigrations api
python manage.py migrate
```

### Static Files Issues
```bash
python manage.py collectstatic --noinput
```

### Database Locked
```bash
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

### Port Already in Use
```bash
python manage.py runserver 8001
```

## 📞 Support

For issues or questions about the backend:
1. Check the Django documentation
2. Review the API endpoints documentation
3. Check server logs: `python manage.py runserver --verbosity 3`

---

**Backend is ready! Start the server and connect your React frontend.** 🚀
