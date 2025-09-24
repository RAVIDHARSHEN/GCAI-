import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import ThreatTable from './components/ThreatTable';
import Charts from './components/Charts';
import ThreatCards from './components/ThreatCards';
import WorldMap from './components/WorldMap';
import BottomSection from './components/BottomSection';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { FilterState } from './types';
import { citizenAwarenessMetrics, mitigationPathways } from './data/mockData';
import { useRealTimeData } from './hooks/useRealTimeData';
import { BarChart3, Table, Grid3X3, Map, RefreshCw, AlertCircle, Wifi } from 'lucide-react';

type ViewMode = 'table' | 'charts' | 'cards' | 'map';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    threatType: 'All',
    location: 'All',
    emergencyLevel: 'All',
    maturityLevel: 'All'
  });

  const [viewMode, setViewMode] = useState<ViewMode>('table');
  
  // Use real-time data hook
  const { threats: realTimeThreats, loading, error, lastUpdated, refresh } = useRealTimeData();

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredThreats = useMemo(() => {
    return realTimeThreats.filter(threat => {
      if (filters.threatType !== 'All' && threat.threatType !== filters.threatType) return false;
      if (filters.location !== 'All' && filters.location !== 'Global') {
        if (threat.location.region !== filters.location && threat.location.country !== filters.location) return false;
      }
      if (filters.emergencyLevel !== 'All' && threat.emergencyLevel !== filters.emergencyLevel) return false;
      if (filters.maturityLevel !== 'All' && threat.maturityLevel !== filters.maturityLevel) return false;
      return true;
    });
  }, [filters, realTimeThreats]);

  const renderMainContent = () => {
    switch (viewMode) {
      case 'table':
        return <ThreatTable threats={filteredThreats} />;
      case 'charts':
        return <Charts threats={filteredThreats} />;
      case 'cards':
        return <ThreatCards threats={filteredThreats} />;
      case 'map':
        return <WorldMap threats={filteredThreats} />;
      default:
        return <ThreatTable threats={filteredThreats} />;
    }
  };

  const getViewModeButtonClass = (mode: ViewMode) => {
    const baseClass = "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors";
    if (viewMode === mode) {
      return `${baseClass} bg-blue-600 text-white`;
    }
    return `${baseClass} bg-white text-gray-600 hover:bg-gray-50 border border-gray-200`;
  };

  // Show loading state
  if (loading && realTimeThreats.length === 0) {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <LoadingSpinner size="large" message="Loading real-time threat intelligence from GitHub repositories..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar 
          filters={filters} 
          onFilterChange={handleFilterChange}
          threatCount={realTimeThreats.length}
          lastUpdated={lastUpdated}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">GCAI Crisis Intelligence Dashboard</h1>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">Live Data</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-gray-600">
                    {filteredThreats.length} active threats from GitHub repositories
                  </p>
                  {lastUpdated && (
                    <p className="text-sm text-gray-500">
                      Last updated: {lastUpdated.toLocaleString()}
                    </p>
                  )}
                  {error && (
                    <div className="flex items-center gap-1 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center gap-3">
                {/* Refresh Button */}
                <button
                  onClick={refresh}
                  disabled={loading}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
                    loading 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Updating...' : 'Refresh'}
                </button>

                {/* View Mode Selector */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => setViewMode('table')}
                    className={getViewModeButtonClass('table')}
                  >
                    <Table className="w-4 h-4" />
                    Table
                  </button>
                  <button 
                    onClick={() => setViewMode('charts')}
                    className={getViewModeButtonClass('charts')}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Charts
                  </button>
                  <button 
                    onClick={() => setViewMode('cards')}
                    className={getViewModeButtonClass('cards')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                    Cards
                  </button>
                  <button 
                    onClick={() => setViewMode('map')}
                    className={getViewModeButtonClass('map')}
                  >
                    <Map className="w-4 h-4" />
                    Map
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6">
              {/* Loading overlay for data refresh */}
              {loading && realTimeThreats.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
                  <LoadingSpinner size="small" />
                  <span className="text-blue-800 text-sm">Updating threat intelligence...</span>
                </div>
              )}

              {/* Main Data Display */}
              <div>
                {renderMainContent()}
              </div>

              {/* Bottom Section */}
              <BottomSection 
                filteredThreats={filteredThreats}
                citizenMetrics={citizenAwarenessMetrics}
                pathways={mitigationPathways}
              />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;