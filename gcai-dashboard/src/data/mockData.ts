import { ThreatData, CitizenAwarenessMetric, MitigationPathway } from '../types';

// Real-time data will be fetched from GitHub API
// This file now only contains static reference data for metrics and pathways

export const mockThreats: ThreatData[] = [
  // This array is now populated by real-time GitHub data
];

export const citizenAwarenessMetrics: CitizenAwarenessMetric[] = [
  { metric: 'Global Threat Awareness', current: 73, previous: 68, trend: 'up', unit: '%' },
  { metric: 'Crisis Preparedness Level', current: 45, previous: 42, trend: 'up', unit: '%' },
  { metric: 'Information Trust Score', current: 62, previous: 65, trend: 'down', unit: '%' },
  { metric: 'Community Engagement', current: 38, previous: 35, trend: 'up', unit: '%' },
  { metric: 'Response Readiness', current: 51, previous: 49, trend: 'up', unit: '%' }
];

export const mitigationPathways: MitigationPathway[] = [
  {
    id: '1',
    title: 'Early Warning System Enhancement',
    description: 'Implement AI-powered prediction models and community alert networks to improve crisis anticipation and response times.',
    urgency: 'High',
    effectiveness: 85,
    stakeholders: ['Government Agencies', 'Tech Companies', 'Local Communities', 'International Organizations']
  },
  {
    id: '2',
    title: 'Regional Cooperation Framework',
    description: 'Establish cross-border coordination mechanisms for shared threat management and resource allocation.',
    urgency: 'Medium',
    effectiveness: 72,
    stakeholders: ['Regional Bodies', 'National Governments', 'UN Agencies', 'NGOs']
  },
  {
    id: '3',
    title: 'Community Resilience Building',
    description: 'Strengthen local capacity through training, infrastructure development, and resource stockpiling.',
    urgency: 'High',
    effectiveness: 78,
    stakeholders: ['Local Governments', 'Community Leaders', 'Education Institutions', 'Health Services']
  },
  {
    id: '4',
    title: 'Information Warfare Countermeasures',
    description: 'Deploy fact-checking systems and media literacy programs to combat misinformation during crises.',
    urgency: 'Medium',
    effectiveness: 65,
    stakeholders: ['Media Organizations', 'Tech Platforms', 'Education Sector', 'Civil Society']
  }
];

export const chartData = {
  threatTrends: [
    { month: 'Jan', climate: 15, pandemic: 8, conflict: 12, economic: 6 },
    { month: 'Feb', climate: 18, pandemic: 6, conflict: 14, economic: 8 },
    { month: 'Mar', climate: 22, pandemic: 4, conflict: 16, economic: 12 },
    { month: 'Apr', climate: 25, pandemic: 5, conflict: 18, economic: 15 },
    { month: 'May', climate: 28, pandemic: 7, conflict: 20, economic: 18 },
    { month: 'Jun', climate: 32, pandemic: 9, conflict: 22, economic: 20 }
  ],
  severityDistribution: [
    { name: 'Low (1-3)', value: 25, color: '#10B981' },
    { name: 'Medium (4-6)', value: 45, color: '#F59E0B' },
    { name: 'High (7-10)', value: 30, color: '#EF4444' }
  ],
  regionalData: [
    { region: 'Asia-Pacific', threats: 12, severity: 6.5 },
    { region: 'Europe', threats: 8, severity: 4.2 },
    { region: 'North America', threats: 6, severity: 3.8 },
    { region: 'Africa', threats: 15, severity: 7.1 },
    { region: 'Middle East', threats: 11, severity: 7.8 },
    { region: 'South America', threats: 9, severity: 6.2 }
  ]
};