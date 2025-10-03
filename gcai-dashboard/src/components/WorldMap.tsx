import React from 'react';
import { ThreatData } from '../types';
import { Map, MapPin, AlertTriangle } from 'lucide-react';

interface WorldMapProps {
  threats: ThreatData[];
}

const WorldMap: React.FC<WorldMapProps> = ({ threats }) => {
  // Group threats by region for the simplified map view
  const threatsByRegion = threats.reduce((acc, threat) => {
    const region = threat.location.region;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(threat);
    return acc;
  }, {} as Record<string, ThreatData[]>);

  const getRegionSeverity = (regionThreats: ThreatData[]) => {
    if (regionThreats.length === 0) return 0;
    return regionThreats.reduce((sum, threat) => sum + threat.severity, 0) / regionThreats.length;
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 7) return 'bg-red-500';
    if (severity >= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getSeverityRingColor = (severity: number) => {
    if (severity >= 7) return 'ring-red-300';
    if (severity >= 4) return 'ring-yellow-300';
    return 'ring-green-300';
  };

  // Regional coordinates for simplified visualization
  const regionCoordinates = {
    'Asia-Pacific': { x: 75, y: 40 },
    'Europe': { x: 50, y: 25 },
    'North America': { x: 20, y: 30 },
    'Africa': { x: 50, y: 60 },
    'Middle East': { x: 55, y: 45 },
    'South America': { x: 30, y: 75 }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Map className="w-5 h-5 text-indigo-500" />
        <h3 className="text-lg font-semibold text-gray-900">Global Threat Hotspots</h3>
      </div>
      
      {/* Simplified World Map Visualization */}
      <div className="relative w-full h-96 bg-blue-50 rounded-lg overflow-hidden">
        {/* Background world map silhouette */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
            {/* Simplified continent shapes */}
            <path d="M15 25 L35 20 L45 35 L25 40 Z" fill="#6B7280" /> {/* North America */}
            <path d="M25 65 L40 70 L35 85 L20 80 Z" fill="#6B7280" /> {/* South America */}
            <path d="M45 20 L65 25 L60 40 L45 35 Z" fill="#6B7280" /> {/* Europe */}
            <path d="M45 50 L65 55 L60 75 L45 70 Z" fill="#6B7280" /> {/* Africa */}
            <path d="M55 40 L65 35 L70 50 L60 55 Z" fill="#6B7280" /> {/* Middle East */}
            <path d="M70 30 L90 35 L85 55 L75 50 Z" fill="#6B7280" /> {/* Asia-Pacific */}
          </svg>
        </div>

        {/* Threat Markers */}
        {Object.entries(threatsByRegion).map(([region, regionThreats]) => {
          const coords = regionCoordinates[region as keyof typeof regionCoordinates];
          if (!coords) return null;
          
          const avgSeverity = getRegionSeverity(regionThreats);
          const threatCount = regionThreats.length;
          
          return (
            <div
              key={region}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            >
              {/* Pulsing ring for high severity threats */}
              {avgSeverity >= 6 && (
                <div className={`absolute inset-0 rounded-full ${getSeverityRingColor(avgSeverity)} ring-4 animate-ping`}></div>
              )}
              
              {/* Main threat marker */}
              <div className={`w-6 h-6 rounded-full ${getSeverityColor(avgSeverity)} border-2 border-white shadow-lg flex items-center justify-center relative z-10`}>
                <span className="text-white text-xs font-bold">{threatCount}</span>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                  <div className="font-medium">{region}</div>
                  <div>{threatCount} threat{threatCount !== 1 ? 's' : ''}</div>
                  <div>Avg Severity: {avgSeverity.toFixed(1)}/10</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Low (1-3)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Medium (4-6)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">High (7-10)</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {threats.length} active threats monitored
        </div>
      </div>

      {/* Quick Regional Summary */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(threatsByRegion).map(([region, regionThreats]) => {
          const avgSeverity = getRegionSeverity(regionThreats);
          return (
            <div key={region} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-900">{region}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">{regionThreats.length} threats</span>
                <span className={`text-xs font-medium ${
                  avgSeverity >= 7 ? 'text-red-600' :
                  avgSeverity >= 4 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {avgSeverity.toFixed(1)}/10
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorldMap;