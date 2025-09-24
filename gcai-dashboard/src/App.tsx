import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import ThreatTable from './components/ThreatTable';
import Charts from './components/Charts';
import ThreatCards from './components/ThreatCards';
import WorldMap from './components/WorldMap';
import BottomSection from './components/BottomSection';
import { FilterState } from './types';
import { mockThreats, citizenAwarenessMetrics, mitigationPathways } from './data/mockData';
import { BarChart3, Table, Grid3X3, Map } from 'lucide-react';

type ViewMode = 'table' | 'charts' | 'cards' | 'map';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    threatType: 'All',
    location: 'All',
    emergencyLevel: 'All',
    maturityLevel: 'All'
  });

  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredThreats = useMemo(() => {
    return mockThreats.filter(threat => {
      if (filters.threatType !== 'All' && threat.threatType !== filters.threatType) return false;
      if (filters.location !== 'All' && filters.location !== 'Global') {
        if (threat.location.region !== filters.location && threat.location.country !== filters.location) return false;
      }
      if (filters.emergencyLevel !== 'All' && threat.emergencyLevel !== filters.emergencyLevel) return false;
      if (filters.maturityLevel !== 'All' && threat.maturityLevel !== filters.maturityLevel) return false;
      return true;
    });
  }, [filters]);

  const renderMainContent = () => {
    switch (viewMode) {
      case 'table':
        return <ThreatTable threats={filteredThreats} />;
      case 'charts':
        return <Charts />;
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar filters={filters} onFilterChange={handleFilterChange} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Crisis Intelligence Dashboard</h1>
              <p className="text-gray-600 mt-1">
                {filteredThreats.length} active threats • Last updated: {new Date().toLocaleString()}
              </p>
            </div>
            
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

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
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
  );
}

export default App;