import React from 'react';
import { ThreatData } from '../types';
import { AlertTriangle, MapPin, Users, Eye, Clock, ExternalLink } from 'lucide-react';

interface ThreatCardsProps {
  threats: ThreatData[];
}

const ThreatCards: React.FC<ThreatCardsProps> = ({ threats }) => {
  const getSeverityColor = (severity: number) => {
    if (severity >= 7) return 'border-red-500 bg-red-50';
    if (severity >= 4) return 'border-yellow-500 bg-yellow-50';
    return 'border-green-500 bg-green-50';
  };

  const getEmergencyBadgeColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-600';
      case 'Medium': return 'bg-yellow-600';
      case 'Low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  // Show top 6 most severe threats
  const topThreats = threats
    .sort((a, b) => b.severity - a.severity)
    .slice(0, 6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {topThreats.map((threat) => (
        <div 
          key={threat.id} 
          className={`bg-white rounded-lg shadow-lg border-l-4 ${getSeverityColor(threat.severity)} p-6 hover:shadow-xl transition-shadow`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getEmergencyBadgeColor(threat.emergencyLevel)}`}>
                {threat.emergencyLevel}
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{threat.severity}/10</div>
              <div className="text-xs text-gray-500">Severity</div>
            </div>
          </div>

          {/* Title and Type */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {threat.title}
          </h3>
          <p className="text-sm text-blue-600 font-medium mb-3">{threat.threatType}</p>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {threat.description}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">{threat.location.country}, {threat.location.region}</span>
          </div>

          {/* Affected Population */}
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">
              {(threat.affectedPopulation / 1000000).toFixed(1)}M people affected
            </span>
          </div>

          {/* Confidence and Update */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{threat.confidenceLevel}% confidence</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">
                {threat.lastUpdated.toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Sources */}
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 mb-1">Sources:</p>
                <div className="flex flex-wrap gap-1">
                  {threat.sources.slice(0, 2).map((source, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {source}
                    </span>
                  ))}
                  {threat.sources.length > 2 && (
                    <span className="text-xs text-gray-500">+{threat.sources.length - 2} more</span>
                  )}
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-800 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Maturity Level */}
          <div className="mt-3">
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
              threat.maturityLevel === 'Critical' ? 'bg-purple-100 text-purple-800' :
              threat.maturityLevel === 'Escalating' ? 'bg-orange-100 text-orange-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {threat.maturityLevel} Threat
            </span>
          </div>
        </div>
      ))}
      
      {topThreats.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-500">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No threat intelligence cards to display.</p>
        </div>
      )}
    </div>
  );
};

export default ThreatCards;