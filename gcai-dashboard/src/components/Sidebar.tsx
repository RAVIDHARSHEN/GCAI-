import React from 'react';
import { FilterState } from '../types';
import { Filter, Globe, AlertTriangle, TrendingUp } from 'lucide-react';

interface SidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  threatCount?: number;
  lastUpdated?: Date | null;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange, threatCount = 0, lastUpdated }) => {
  const threatTypes = ['All', 'Climate Change', 'Pandemic & Health', 'Armed Conflict', 'Economic Collapse'];
  const locations = ['All', 'Global', 'Asia-Pacific', 'Europe', 'North America', 'Africa', 'Middle East', 'South America'];
  const emergencyLevels = ['All', 'Low', 'Medium', 'High'];
  const maturityLevels = ['All', 'Emerging', 'Escalating', 'Critical'];

  return (
    <div className="bg-gray-900 text-white w-80 h-full p-6 overflow-y-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold">GCAI Dashboard</h1>
        </div>
        <p className="text-gray-400 text-sm">Global Crisis Anticipator Initiative</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>

        {/* Threat Type Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            Threat Type
          </label>
          <select
            value={filters.threatType}
            onChange={(e) => onFilterChange('threatType', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {threatTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-green-400" />
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Emergency Level Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            Emergency Level
          </label>
          <select
            value={filters.emergencyLevel}
            onChange={(e) => onFilterChange('emergencyLevel', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {emergencyLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Maturity Level Filter */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            Threat Maturity
          </label>
          <select
            value={filters.maturityLevel}
            onChange={(e) => onFilterChange('maturityLevel', e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {maturityLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Real-time Stats */}
        <div className="border-t border-gray-700 pt-6">
          <h3 className="text-sm font-medium mb-3 text-gray-400">REAL-TIME STATUS</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Active Threats</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${threatCount > 5 ? 'bg-red-600' : threatCount > 2 ? 'bg-yellow-600' : 'bg-green-600'}`}>
                {threatCount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">GitHub Sources</span>
              <span className="bg-blue-600 px-2 py-1 rounded text-xs font-medium">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Data Freshness</span>
              <span className="bg-green-600 px-2 py-1 rounded text-xs font-medium">
                {lastUpdated ? Math.floor((Date.now() - lastUpdated.getTime()) / 60000) : 0}m
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">API Status</span>
              <span className="bg-green-600 px-2 py-1 rounded text-xs font-medium">Active</span>
            </div>
          </div>
          
          {lastUpdated && (
            <div className="mt-4 p-3 bg-gray-800 rounded text-xs">
              <div className="text-gray-400 mb-1">Last Update:</div>
              <div className="text-white">{lastUpdated.toLocaleTimeString()}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;