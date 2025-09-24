# GCAI Dashboard - Real-time Crisis Intelligence

A professional dashboard application for the Global Crisis Anticipator Initiative (GCAI) that fetches real-time data from GitHub repositories to simulate threat intelligence monitoring.

## 🚀 Features

### Real-time Data Integration
- **GitHub API Integration**: Fetches live data from multiple GitHub repositories
- **Automatic Updates**: Data refreshes every 5 minutes automatically
- **Manual Refresh**: Click the refresh button for immediate updates
- **Caching System**: Intelligent caching to reduce API calls and improve performance

### Data Sources
The dashboard monitors several GitHub repositories to simulate different threat types:
- **Technology Infrastructure**: React, VS Code, TensorFlow, Kubernetes
- **Economic Systems**: Node.js, Angular, Elasticsearch
- **Critical Infrastructure**: Apache Kafka and other enterprise systems

### Data Transformation
Real GitHub metrics are converted into threat intelligence:
- **Severity Calculation**: Based on issue count, repository health, and activity
- **Emergency Levels**: Derived from severity scores (Low/Medium/High)
- **Maturity Assessment**: Based on critical issues and repository stability
- **Affected Population**: Calculated from stars, forks, and watchers
- **Confidence Levels**: Generated from data freshness and completeness

### Dashboard Views
1. **📊 Table View**: Comprehensive threat details with sorting and filtering
2. **📈 Charts View**: Interactive visualizations of trends and distributions
3. **🗂️ Cards View**: Intelligence-style cards with detailed threat information
4. **🗺️ Map View**: Geographic visualization of threat hotspots

### Professional Features
- **Real-time Status Indicators**: Live connection status and data freshness
- **Error Handling**: Graceful degradation when APIs are unavailable
- **Loading States**: Professional loading indicators during data fetches
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Professional Styling**: Clean, modern analytics dashboard appearance

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom professional themes
- **Charts**: Recharts for interactive data visualizations
- **Icons**: Lucide React for consistent iconography
- **HTTP Client**: Axios for GitHub API requests
- **State Management**: React Hooks with custom real-time data hook

## 📡 Real-time Architecture

### Data Flow
1. **GitHub Service**: Manages API requests and caching
2. **Data Adapters**: Transform GitHub data into threat intelligence format
3. **Real-time Hook**: Handles automatic updates and state management
4. **Component Updates**: Real-time UI updates when new data arrives

### GitHub Data Mapping
```typescript
GitHub Repository → Threat Intelligence
├── Issues Count → Severity Level
├── Recent Activity → Threat Trend
├── Critical Labels → Emergency Level
├── Repository Age → Maturity Level
└── Community Size → Affected Population
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gcai-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Access the dashboard**
   - Open http://localhost:3000 in your browser
   - The dashboard will automatically begin fetching real-time data

## 🎯 Key Components

### Real-time Data Hook (`useRealTimeData`)
- Manages automatic data fetching every 5 minutes
- Handles loading states and error recovery
- Provides manual refresh functionality
- Caches data to improve performance

### GitHub Service (`githubService`)
- Fetches repository information, issues, and commits
- Converts GitHub metrics into threat intelligence
- Implements rate limiting and error handling
- Provides intelligent caching with expiration

### Professional Dashboard Components
- **Sidebar**: Dynamic filters with real-time statistics
- **Data Tables**: Sortable, filterable threat information
- **Interactive Charts**: Real-time visualization updates
- **Intelligence Cards**: Detailed threat analysis cards
- **World Map**: Geographic threat distribution

## 🌐 API Integration

The dashboard uses the GitHub REST API v3:
- **No authentication required** for public repositories
- **Rate limiting**: 60 requests per hour per IP
- **Caching**: 5-minute cache to optimize API usage
- **Fallback**: Graceful degradation if API is unavailable

## 📊 Data Simulation

Since this is a demonstration application, real GitHub repository data is creatively mapped to simulate crisis intelligence:

- **Repository issues** represent emerging threats
- **Critical/Security labels** indicate high-priority situations
- **Recent commits** show response activities
- **Community engagement** represents affected populations
- **Repository health** maps to threat severity

## 🔄 Auto-refresh Mechanism

- **Automatic Updates**: Every 5 minutes
- **Smart Caching**: Reduces redundant API calls
- **Background Updates**: Non-blocking UI updates
- **Error Recovery**: Automatic retry on failures
- **User Control**: Manual refresh available

## 🎨 Professional Design

The dashboard features a professional analytics interface:
- **Dark sidebar** with real-time status indicators
- **Clean data tables** with interactive sorting
- **Modern charts** with hover interactions
- **Responsive grid layouts** for all screen sizes
- **Consistent color coding** for threat levels

## 🚀 Deployment

For production deployment:
1. Build the application: `npm run build`
2. Deploy the `build` folder to your hosting platform
3. Configure environment variables for API keys (if needed)
4. Set up monitoring for API rate limits

## 📝 License

This project is created for demonstration purposes to showcase real-time data integration and professional dashboard design.