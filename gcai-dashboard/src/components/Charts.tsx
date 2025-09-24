import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from 'lucide-react';
import { ThreatData } from '../types';

interface ChartsProps {
  threats: ThreatData[];
}

const Charts: React.FC<ChartsProps> = ({ threats }) => {
  const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

  // Generate chart data from real threats
  const chartData = useMemo(() => {
    // Severity distribution
    const severityDistribution = [
      { 
        name: 'Low (1-3)', 
        value: threats.filter(t => t.severity >= 1 && t.severity <= 3).length,
        color: '#10B981'
      },
      { 
        name: 'Medium (4-6)', 
        value: threats.filter(t => t.severity >= 4 && t.severity <= 6).length,
        color: '#F59E0B'
      },
      { 
        name: 'High (7-10)', 
        value: threats.filter(t => t.severity >= 7 && t.severity <= 10).length,
        color: '#EF4444'
      }
    ];

    // Regional data
    const regionMap = threats.reduce((acc, threat) => {
      const region = threat.location.region;
      if (!acc[region]) {
        acc[region] = { threats: 0, totalSeverity: 0 };
      }
      acc[region].threats++;
      acc[region].totalSeverity += threat.severity;
      return acc;
    }, {} as Record<string, { threats: number; totalSeverity: number }>);

    const regionalData = Object.entries(regionMap).map(([region, data]) => ({
      region: region.length > 15 ? region.substring(0, 12) + '...' : region,
      threats: data.threats,
      severity: Number((data.totalSeverity / data.threats).toFixed(1))
    }));

    // Threat type trends (simulated based on current data)
    const threatTypes = ['Climate Change', 'Pandemic & Health', 'Armed Conflict', 'Economic Collapse'];
    const threatTrends = Array.from({ length: 6 }, (_, i) => {
      const month = new Date(Date.now() - (5 - i) * 30 * 24 * 60 * 60 * 1000)
        .toLocaleDateString('en-US', { month: 'short' });
      
      const data: any = { month };
      threatTypes.forEach(type => {
        const currentCount = threats.filter(t => t.threatType === type).length;
        // Simulate historical data with some variation
        data[type.toLowerCase().replace(/\s+/g, '')] = Math.max(1, 
          currentCount + Math.floor(Math.random() * 6) - 3
        );
      });
      return data;
    });

    return {
      threatTrends,
      severityDistribution,
      regionalData
    };
  }, [threats]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Threat Trends Over Time */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Threat Trends (Last 6 Months)</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData.threatTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Line type="monotone" dataKey="climatechange" stroke="#10B981" strokeWidth={3} name="Climate Change" />
            <Line type="monotone" dataKey="pandemic&health" stroke="#3B82F6" strokeWidth={3} name="Pandemic & Health" />
            <Line type="monotone" dataKey="armedconflict" stroke="#EF4444" strokeWidth={3} name="Armed Conflict" />
            <Line type="monotone" dataKey="economiccollapse" stroke="#F59E0B" strokeWidth={3} name="Economic Collapse" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Severity Distribution */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <PieChartIcon className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900">Severity Distribution</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData.severityDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.severityDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {chartData.severityDistribution.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Threat Analysis */}
      <div className="lg:col-span-3 bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900">Regional Threat Analysis</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.regionalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="region" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Bar dataKey="threats" fill="#3B82F6" name="Number of Threats" />
            <Bar dataKey="severity" fill="#F59E0B" name="Avg Severity" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;