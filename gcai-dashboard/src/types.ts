export interface ThreatData {
  id: string;
  threatType: 'Climate Change' | 'Pandemic & Health' | 'Armed Conflict' | 'Economic Collapse';
  location: {
    region: string;
    country: string;
    coordinates?: [number, number];
  };
  emergencyLevel: 'Low' | 'Medium' | 'High';
  maturityLevel: 'Emerging' | 'Escalating' | 'Critical';
  severity: number; // 1-10 scale
  title: string;
  description: string;
  sources: string[];
  lastUpdated: Date;
  trend: 'increasing' | 'decreasing' | 'stable';
  affectedPopulation: number;
  confidenceLevel: number; // 1-100 percentage
}

export interface FilterState {
  threatType: string;
  location: string;
  emergencyLevel: string;
  maturityLevel: string;
}

export interface CitizenAwarenessMetric {
  metric: string;
  current: number;
  previous: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

export interface MitigationPathway {
  id: string;
  title: string;
  description: string;
  urgency: 'Low' | 'Medium' | 'High';
  effectiveness: number; // 1-100 percentage
  stakeholders: string[];
}