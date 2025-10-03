import React from 'react';
import { ThreatData, CitizenAwarenessMetric, MitigationPathway } from '../types';
import { FileText, ArrowRight, TrendingUp, TrendingDown, Minus, Users, Target, Lightbulb } from 'lucide-react';

interface BottomSectionProps {
  filteredThreats: ThreatData[];
  citizenMetrics: CitizenAwarenessMetric[];
  pathways: MitigationPathway[];
}

const BottomSection: React.FC<BottomSectionProps> = ({ filteredThreats, citizenMetrics, pathways }) => {
  const generateSituationSummary = () => {
    const threatCount = filteredThreats.length;
    const highSeverityCount = filteredThreats.filter(t => t.severity >= 7).length;
    const criticalMaturityCount = filteredThreats.filter(t => t.maturityLevel === 'Critical').length;
    const totalAffected = filteredThreats.reduce((sum, t) => sum + t.affectedPopulation, 0);
    
    const mostCommonThreatType = filteredThreats.reduce((acc, threat) => {
      acc[threat.threatType] = (acc[threat.threatType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const dominantThreat = Object.keys(mostCommonThreatType).reduce((a, b) => 
      mostCommonThreatType[a] > mostCommonThreatType[b] ? a : b, 
      Object.keys(mostCommonThreatType)[0]
    );

    return `Current analysis reveals ${threatCount} active threats across monitored regions, with ${highSeverityCount} classified as high severity (7+/10). ${criticalMaturityCount} threats have reached critical maturity levels, requiring immediate attention. Primary concern areas center around ${dominantThreat.toLowerCase()} threats, affecting approximately ${(totalAffected / 1000000).toFixed(1)} million people globally. Cross-regional patterns indicate escalating instability with interconnected risk factors spanning multiple threat domains. Enhanced monitoring protocols are recommended for emerging hotspots showing rapid deterioration in stability indicators.`;
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Situation Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Situation Summary</h3>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-gray-700 leading-relaxed">
            {generateSituationSummary()}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span className="font-medium">Generated:</span>
            <span>{new Date().toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Confidence:</span>
            <span className="text-green-600 font-medium">94%</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Sources:</span>
            <span>47 intelligence feeds</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proposed Pathways */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">Proposed Pathways</h3>
          </div>
          <div className="space-y-4">
            {pathways.map((pathway) => (
              <div key={pathway.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{pathway.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(pathway.urgency)}`}>
                    {pathway.urgency}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{pathway.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Effectiveness:</span> {pathway.effectiveness}%
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-gray-500 mb-1">Key Stakeholders:</div>
                  <div className="flex flex-wrap gap-1">
                    {pathway.stakeholders.slice(0, 3).map((stakeholder, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {stakeholder}
                      </span>
                    ))}
                    {pathway.stakeholders.length > 3 && (
                      <span className="text-xs text-gray-500">+{pathway.stakeholders.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Citizen Awareness Metrics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900">Citizen Awareness Metrics</h3>
          </div>
          <div className="space-y-4">
            {citizenMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{metric.metric}</span>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Previous: {metric.previous}{metric.unit} → Current: {metric.current}{metric.unit}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{metric.current}{metric.unit}</div>
                  <div className={`text-xs font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.trend === 'up' ? '+' : metric.trend === 'down' ? '-' : ''}
                    {Math.abs(metric.current - metric.previous)}{metric.unit}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary Insights */}
          <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Key Insights</span>
            </div>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Global threat awareness increased by 5% this quarter</li>
              <li>• Crisis preparedness remains below optimal threshold</li>
              <li>• Information trust declined, requiring enhanced communication</li>
              <li>• Community engagement shows positive upward trend</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSection;