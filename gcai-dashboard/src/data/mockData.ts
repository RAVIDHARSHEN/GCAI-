import { ThreatData, CitizenAwarenessMetric, MitigationPathway } from '../types';

export const mockThreats: ThreatData[] = [
  {
    id: '1',
    threatType: 'Climate Change',
    location: { region: 'Asia-Pacific', country: 'Philippines', coordinates: [12.8797, 121.7740] },
    emergencyLevel: 'High',
    maturityLevel: 'Critical',
    severity: 8,
    title: 'Severe Typhoon Season Impact',
    description: 'Unprecedented typhoon activity threatening coastal regions with catastrophic flooding and displacement.',
    sources: ['NOAA', 'Philippine Weather Service', 'UN Climate Report'],
    lastUpdated: new Date('2024-01-15'),
    trend: 'increasing',
    affectedPopulation: 2500000,
    confidenceLevel: 92
  },
  {
    id: '2',
    threatType: 'Pandemic & Health',
    location: { region: 'Africa', country: 'Democratic Republic of Congo', coordinates: [-4.0383, 21.7587] },
    emergencyLevel: 'Medium',
    maturityLevel: 'Escalating',
    severity: 6,
    title: 'Ebola Outbreak Containment Challenge',
    description: 'Limited healthcare infrastructure hampering containment efforts in remote regions.',
    sources: ['WHO', 'CDC', 'Médecins Sans Frontières'],
    lastUpdated: new Date('2024-01-14'),
    trend: 'stable',
    affectedPopulation: 150000,
    confidenceLevel: 85
  },
  {
    id: '3',
    threatType: 'Armed Conflict',
    location: { region: 'Middle East', country: 'Syria', coordinates: [34.8021, 38.9968] },
    emergencyLevel: 'High',
    maturityLevel: 'Critical',
    severity: 9,
    title: 'Regional Instability Escalation',
    description: 'Cross-border tensions and refugee crisis creating regional security concerns.',
    sources: ['UN Security Council', 'UNHCR', 'International Crisis Group'],
    lastUpdated: new Date('2024-01-16'),
    trend: 'increasing',
    affectedPopulation: 5200000,
    confidenceLevel: 88
  },
  {
    id: '4',
    threatType: 'Economic Collapse',
    location: { region: 'South America', country: 'Venezuela', coordinates: [6.4238, -66.5897] },
    emergencyLevel: 'High',
    maturityLevel: 'Critical',
    severity: 7,
    title: 'Hyperinflation and Social Unrest',
    description: 'Economic collapse leading to mass migration and regional destabilization.',
    sources: ['IMF', 'World Bank', 'Inter-American Development Bank'],
    lastUpdated: new Date('2024-01-13'),
    trend: 'stable',
    affectedPopulation: 28000000,
    confidenceLevel: 91
  },
  {
    id: '5',
    threatType: 'Climate Change',
    location: { region: 'Europe', country: 'Netherlands', coordinates: [52.1326, 5.2913] },
    emergencyLevel: 'Medium',
    maturityLevel: 'Emerging',
    severity: 5,
    title: 'Sea Level Rise Infrastructure Threat',
    description: 'Accelerating sea level rise challenging existing flood defense systems.',
    sources: ['European Environment Agency', 'Dutch Delta Works', 'IPCC'],
    lastUpdated: new Date('2024-01-12'),
    trend: 'increasing',
    affectedPopulation: 8500000,
    confidenceLevel: 94
  },
  {
    id: '6',
    threatType: 'Pandemic & Health',
    location: { region: 'North America', country: 'United States', coordinates: [39.8283, -98.5795] },
    emergencyLevel: 'Low',
    maturityLevel: 'Emerging',
    severity: 3,
    title: 'Antibiotic Resistance Monitoring',
    description: 'Rising antibiotic resistance patterns requiring enhanced surveillance.',
    sources: ['CDC', 'NIH', 'WHO Global AMR Surveillance'],
    lastUpdated: new Date('2024-01-11'),
    trend: 'stable',
    affectedPopulation: 50000,
    confidenceLevel: 76
  },
  {
    id: '7',
    threatType: 'Armed Conflict',
    location: { region: 'Africa', country: 'Mali', coordinates: [17.5707, -3.9962] },
    emergencyLevel: 'Medium',
    maturityLevel: 'Escalating',
    severity: 6,
    title: 'Insurgency and Peacekeeping Challenge',
    description: 'Persistent insurgency affecting regional stability and humanitarian access.',
    sources: ['UN Peacekeeping', 'African Union', 'ECOWAS'],
    lastUpdated: new Date('2024-01-10'),
    trend: 'increasing',
    affectedPopulation: 1200000,
    confidenceLevel: 82
  },
  {
    id: '8',
    threatType: 'Economic Collapse',
    location: { region: 'Asia-Pacific', country: 'Sri Lanka', coordinates: [7.8731, 80.7718] },
    emergencyLevel: 'Medium',
    maturityLevel: 'Escalating',
    severity: 6,
    title: 'Currency Crisis and Social Impact',
    description: 'Severe currency devaluation causing food and fuel shortages.',
    sources: ['Central Bank of Sri Lanka', 'IMF', 'Asian Development Bank'],
    lastUpdated: new Date('2024-01-09'),
    trend: 'decreasing',
    affectedPopulation: 22000000,
    confidenceLevel: 87
  }
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