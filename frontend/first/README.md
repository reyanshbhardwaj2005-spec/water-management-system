# 💧 WaterFlow Management System

A comprehensive React-based water management system for monitoring, tracking, and managing water resources across multiple zones and locations.

## 🎯 Features

### Dashboard
- **Real-time Statistics**: Display total usage, daily average, water quality, and system health
- **Usage Trends**: Visual 7-day trend analysis with charting
- **Top Locations**: Monitor high-consumption areas with progress indicators
- **Recent Activity**: Track all system events and updates in real-time

### Usage Monitor
- **Zone-based Tracking**: Monitor water usage across different zones (Buildings, Irrigation, etc.)
- **Time Range Selection**: View data for today, week, month, or year
- **Hourly Breakdown**: Detailed hour-by-hour consumption analysis
- **Statistics Dashboard**: Peak usage, low usage, average, and efficiency rates
- **Visual Charts**: Interactive bar and line charts for data visualization

### Alerts & Notifications
- **Active Alerts**: High-priority system notifications and warnings
- **Alert Management**: Mark alerts as resolved or dismiss them
- **Alert Categories**: 
  - High usage warnings
  - System errors and malfunctions
  - Maintenance reminders
  - Informational updates
- **Customizable Notifications**: Enable/disable alert types and email notifications

### Reports
- **Multiple Report Types**:
  - Monthly Usage Reports
  - Quarterly Performance Analysis
  - Annual Summary
  - Leak Detection Reports
- **Export Formats**: PDF, CSV, Excel
- **Compliance Tracking**: Monitor usage limits, quality standards, and maintenance schedules
- **Historical Data**: Access previously generated reports

### User Management
- **User Administration**: Add, edit, and delete users
- **Role-Based Access**:
  - Administrator (Full system access)
  - Manager (Data viewing and report creation)
  - Technician (Zone management and maintenance)
  - Monitor (Read-only access)
- **Activity Logging**: Track all user actions and system events

### Settings
- **Organization Configuration**: Manage organization profile and contact info
- **Regional Settings**: Timezone, language, and theme preferences
- **Notification Preferences**: Control alert delivery methods
- **Data Management**: Backup and export functionality
- **System Information**: Version, database size, and API details

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Top navigation bar
│   ├── Navbar.css
│   ├── Sidebar.jsx          # Left navigation sidebar
│   ├── Sidebar.css
│   ├── StatCard.jsx         # Statistics display component
│   ├── StatCard.css
│   ├── ChartPlaceholder.jsx # Chart visualization component
│   └── ChartPlaceholder.css
├── pages/
│   ├── Dashboard.jsx        # Main dashboard page
│   ├── Dashboard.css
│   ├── UsageMonitor.jsx     # Usage tracking page
│   ├── UsageMonitor.css
│   ├── Alerts.jsx           # Alerts management page
│   ├── Alerts.css
│   ├── Reports.jsx          # Reports generation page
│   ├── Reports.css
│   ├── Settings.jsx         # Settings configuration page
│   ├── Settings.css
│   ├── Users.jsx            # User management page
│   └── Users.css
├── App.jsx                   # Main app component with routing
├── App.css
├── main.jsx                 # App entry point
└── index.css                # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend/first
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Technology Stack

- **React 19.2** - UI framework
- **React Router 6** - Client-side routing
- **Vite 8** - Build tool and dev server
- **CSS3** - Styling with modern features

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop browsers (1920px+)
- Tablets (768px - 1024px)
- Mobile devices (320px - 767px)

## 🎯 Key Components

### Navbar
- Sticky top navigation with logo and user profile
- Menu toggle for sidebar
- Responsive hamburger menu on mobile

### Sidebar
- Collapsible navigation menu
- Links to all major sections
- System status indicator
- Smooth animations on mobile

### Dashboard
- Statistical cards showing key metrics
- 7-day usage trend chart
- Top locations breakdown
- Recent activity table

### Charts
- Line charts for trend analysis
- Bar charts for hourly breakdowns
- SVG-based implementation (no external chart library needed)

## 🔄 Data Flow

The application uses React hooks for state management:
- `useState` - Local component state
- `useParams`/`useNavigate` - Router utilities
- Props drilling for component communication

## 🎨 Styling Approach

- **Color Scheme**:
  - Primary: #667eea (purple/blue)
  - Secondary: #764ba2 (deep purple)
  - Background: #f5f7fa (light gray)
  - Text: #2c3e50 (dark blue)

- **Responsive Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🔐 Role-Based Features

Different user roles have access to different features:

| Feature | Admin | Manager | Technician | Monitor |
|---------|-------|---------|------------|---------|
| Dashboard | ✓ | ✓ | ✓ | ✓ |
| Usage Monitor | ✓ | ✓ | ✓ | ✓ |
| Alerts | ✓ | ✓ | ✓ | ✓ |
| Reports | ✓ | ✓ | ✗ | ✓ |
| User Management | ✓ | ✗ | ✗ | ✗ |
| Settings | ✓ | ✗ | ✗ | ✗ |

## 📝 Future Enhancements

- Real-time WebSocket updates
- Advanced data visualization with chart libraries
- User authentication and login
- API integration with backend
- Dark mode support
- Multi-language support
- Mobile app version
- Historical data trending
- Predictive analytics

## 📄 License

This project is part of the WaterFlow Management System suite.

## 👨‍💼 Support

For issues or questions, please contact the development team.
