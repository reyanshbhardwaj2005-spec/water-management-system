from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum, Avg, Max, Min, Count
from django.utils.dateparse import parse_date

from .models import (
    UserProfile, WaterZone, WaterUsage, Alert, Report,
    SystemSettings, ActivityLog, Compliance
)
from .serializers import (
    UserSerializer, UserProfileSerializer, WaterZoneSerializer,
    WaterUsageSerializer, AlertSerializer, ReportSerializer,
    SystemSettingsSerializer, ActivityLogSerializer, ComplianceSerializer,
    DashboardStatsSerializer, UsageReportSerializer
)


class UserViewSet(viewsets.ModelViewSet):
    """API endpoint for users"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering_fields = ['username', 'date_joined']


class UserProfileViewSet(viewsets.ModelViewSet):
    """API endpoint for user profiles"""
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def my_profile(self, request):
        """Get current user's profile"""
        try:
            profile = request.user.profile
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['put'])
    def update_my_profile(self, request):
        """Update current user's profile"""
        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WaterZoneViewSet(viewsets.ModelViewSet):
    """API endpoint for water zones"""
    queryset = WaterZone.objects.filter(is_active=True)
    serializer_class = WaterZoneSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']

    @action(detail=True, methods=['get'])
    def usage_stats(self, request, pk=None):
        """Get usage statistics for a specific zone"""
        zone = self.get_object()
        last_24h = timezone.now() - timedelta(days=1)
        
        usage_data = WaterUsage.objects.filter(
            zone=zone,
            measurement_time__gte=last_24h
        ).aggregate(
            total=Sum('usage_liters'),
            peak=Max('usage_liters'),
            low=Min('usage_liters'),
            avg=Avg('usage_liters'),
            count=Count('id')
        )
        
        return Response({
            'zone_id': zone.id,
            'zone_name': zone.name,
            'total_usage_24h': usage_data['total'] or 0,
            'peak_usage': usage_data['peak'] or 0,
            'low_usage': usage_data['low'] or 0,
            'average_usage': usage_data['avg'] or 0,
            'measurements': usage_data['count'] or 0
        })


class WaterUsageViewSet(viewsets.ModelViewSet):
    """API endpoint for water usage records"""
    queryset = WaterUsage.objects.all()
    serializer_class = WaterUsageSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['measurement_time', 'usage_liters']

    def get_queryset(self):
        """Filter by zone if provided"""
        queryset = super().get_queryset()
        zone_id = self.request.query_params.get('zone')
        if zone_id:
            queryset = queryset.filter(zone_id=zone_id)
        return queryset

    @action(detail=False, methods=['get'])
    def trend(self, request):
        """Get usage trend for last 7 days"""
        days = int(request.query_params.get('days', 7))
        start_date = timezone.now() - timedelta(days=days)
        
        zone_id = request.query_params.get('zone')
        if zone_id:
            usages = WaterUsage.objects.filter(
                zone_id=zone_id,
                measurement_time__gte=start_date
            )
        else:
            usages = WaterUsage.objects.filter(measurement_time__gte=start_date)
        
        trend_data = []
        for i in range(days):
            date = start_date + timedelta(days=i)
            daily_usage = usages.filter(
                measurement_time__date=date.date()
            ).aggregate(total=Sum('usage_liters'))['total'] or 0
            trend_data.append({
                'date': date.date(),
                'usage': daily_usage
            })
        
        return Response(trend_data)


class AlertViewSet(viewsets.ModelViewSet):
    """API endpoint for alerts"""
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'message']
    ordering_fields = ['created_at', 'severity']

    def get_queryset(self):
        """Filter by status if provided"""
        queryset = super().get_queryset()
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset

    @action(detail=True, methods=['post'])
    def resolve(self, request, pk=None):
        """Resolve an alert"""
        alert = self.get_object()
        alert.status = 'resolved'
        alert.resolved_at = timezone.now()
        alert.resolved_by = request.user
        alert.save()
        serializer = self.get_serializer(alert)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get all active alerts"""
        alerts = self.queryset.filter(status='active')
        page = self.paginate_queryset(alerts)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(alerts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def count(self, request):
        """Get count of active alerts"""
        active_count = self.queryset.filter(status='active').count()
        resolved_count = self.queryset.filter(status='resolved').count()
        return Response({
            'active': active_count,
            'resolved': resolved_count,
            'total': active_count + resolved_count
        })


class ReportViewSet(viewsets.ModelViewSet):
    """API endpoint for reports"""
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'report_type']

    def perform_create(self, serializer):
        """Set the current user as generator"""
        serializer.save(generated_by=self.request.user)

    @action(detail=False, methods=['get'])
    def by_type(self, request):
        """Get reports by type"""
        report_type = request.query_params.get('type')
        if report_type:
            reports = self.queryset.filter(report_type=report_type)
            page = self.paginate_queryset(reports)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            serializer = self.get_serializer(reports, many=True)
            return Response(serializer.data)
        return Response({'error': 'type parameter required'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def monthly(self, request):
        """Generate monthly usage report"""
        now = timezone.now()
        start_date = now.replace(day=1)
        end_date = now

        total_usage = WaterUsage.objects.filter(
            measurement_time__date__gte=start_date.date(),
            measurement_time__date__lte=end_date.date()
        ).aggregate(Sum('usage_liters'))['usage_liters__sum'] or 0

        zone_breakdown = []
        zones = WaterZone.objects.filter(is_active=True)
        for zone in zones:
            zone_usage = WaterUsage.objects.filter(
                zone=zone,
                measurement_time__date__gte=start_date.date()
            ).aggregate(Sum('usage_liters'))['usage_liters__sum'] or 0
            zone_breakdown.append({
                'zone': zone.name,
                'usage': zone_usage,
                'percentage': (zone_usage / total_usage * 100) if total_usage > 0 else 0
            })

        return Response({
            'report_type': 'monthly',
            'period': f"{start_date.date()} to {end_date.date()}",
            'total_usage': total_usage,
            'zone_breakdown': zone_breakdown
        })


class SystemSettingsViewSet(viewsets.ModelViewSet):
    """API endpoint for system settings"""
    queryset = SystemSettings.objects.all()
    serializer_class = SystemSettingsSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get', 'put'])
    def current(self, request):
        """Get or update current system settings"""
        try:
            settings = SystemSettings.objects.first()
            if not settings:
                settings = SystemSettings.objects.create(
                    organization_email='admin@watermanagement.com',
                    api_endpoint='http://localhost:8000/api/'
                )
        except Exception:
            settings = SystemSettings.objects.create(
                organization_email='admin@watermanagement.com',
                api_endpoint='http://localhost:8000/api/'
            )

        if request.method == 'PUT':
            serializer = self.get_serializer(settings, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(settings)
        return Response(serializer.data)


class ActivityLogViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for activity logs"""
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['user__username', 'action', 'description']
    ordering_fields = ['timestamp', 'user']


class ComplianceViewSet(viewsets.ModelViewSet):
    """API endpoint for compliance tracking"""
    queryset = Compliance.objects.all()
    serializer_class = ComplianceSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['category', 'description']
    ordering_fields = ['category', 'status', 'percentage']


# Dashboard API Views
class DashboardViewSet(viewsets.ViewSet):
    """Dashboard statistics and overview"""
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get dashboard statistics"""
        now = timezone.now()
        last_24h = now - timedelta(days=1)
        
        # Calculate total and daily usage
        total_usage = WaterUsage.objects.filter(
            measurement_time__gte=last_24h
        ).aggregate(Sum('usage_liters'))['usage_liters__sum'] or 0
        
        daily_avg = WaterUsage.objects.aggregate(
            Avg('usage_liters')
        )['usage_liters__avg'] or 0
        
        # Get water quality and system health
        quality = WaterUsage.objects.filter(
            measurement_time__gte=last_24h
        ).aggregate(Avg('quality_percentage'))['quality_percentage__avg'] or 100
        
        # System health based on active alerts
        active_alerts = Alert.objects.filter(status='active').count()
        system_health = max(100 - (active_alerts * 5), 0)
        
        stats = {
            'total_usage': total_usage,
            'daily_average': daily_avg,
            'water_quality': int(quality),
            'system_health': int(system_health),
            'active_alerts': active_alerts,
            'total_zones': WaterZone.objects.filter(is_active=True).count(),
        }
        
        serializer = DashboardStatsSerializer(stats)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def top_zones(self, request):
        """Get top consuming zones"""
        last_7d = timezone.now() - timedelta(days=7)
        
        zones = WaterZone.objects.filter(is_active=True)
        zone_usage = []
        
        for zone in zones:
            usage = WaterUsage.objects.filter(
                zone=zone,
                measurement_time__gte=last_7d
            ).aggregate(Sum('usage_liters'))['usage_liters__sum'] or 0
            zone_usage.append({'zone': zone.name, 'usage': usage})
        
        # Sort and return top 4
        zone_usage.sort(key=lambda x: x['usage'], reverse=True)
        return Response(zone_usage[:4])

    @action(detail=False, methods=['get'])
    def activity_log(self, request):
        """Get recent activity"""
        activities = ActivityLog.objects.all()[:20]
        serializer = ActivityLogSerializer(activities, many=True)
        return Response(serializer.data)

