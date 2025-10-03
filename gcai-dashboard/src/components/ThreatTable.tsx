import React from 'react';
import { ThreatData } from '../types';
import { AlertTriangle, TrendingUp, TrendingDown, Minus, MapPin, Clock } from 'lucide-react';

interface ThreatTableProps {
  threats: ThreatData[];
}

const ThreatTable: React.FC<ThreatTableProps> = ({ threats }) => {
  const getSeverityColor = (severity: number) => {
    if (severity >= 7) return 'text-red-500';
    if (severity >= 4) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getEmergencyLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMaturityLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Escalating': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Emerging': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-green-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Active Threats ({threats.length})
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Threat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emergency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maturity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affected</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {threats.map((threat) => (
              <tr key={threat.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{threat.title}</div>
                    <div className="text-sm text-gray-500">{threat.threatType}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-900">{threat.location.country}</div>
                      <div className="text-xs text-gray-500">{threat.location.region}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`text-lg font-bold ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}/10
                    </div>
                    <div className="text-xs text-gray-500">{threat.confidenceLevel}% conf.</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getEmergencyLevelColor(threat.emergencyLevel)}`}>
                    {threat.emergencyLevel}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getMaturityLevelColor(threat.maturityLevel)}`}>
                    {threat.maturityLevel}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    {getTrendIcon(threat.trend)}
                    <span className="text-sm text-gray-600 capitalize">{threat.trend}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {(threat.affectedPopulation / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs text-gray-500">people</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {threat.lastUpdated.toLocaleDateString()}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {threats.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No threats match the current filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ThreatTable;