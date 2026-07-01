// Hardcoded dataset — 16 material topics (product-spec.md Section 5).
// Scores are blended averages across four stakeholder groups, each weighted 25%.
// Written exactly as specified — no rounding, no modification.

export const PILLARS = {
  E: { code: 'E', label: 'Environmental', color: '#3a8c3f' },
  S: { code: 'S', label: 'Social', color: '#e6a817' },
  G: { code: 'G', label: 'Governance', color: '#c0392b' },
}

export const TOPICS = [
  { name: 'GHG Emissions (Scopes 1, 2, 3)', pillar: 'E', financialRisk: 3.73, impact: 4.30 },
  { name: 'Energy Management & Renewable Transition', pillar: 'E', financialRisk: 3.58, impact: 3.80 },
  { name: 'Water Stewardship', pillar: 'E', financialRisk: 3.28, impact: 3.78 },
  { name: 'Hazardous Materials & Chemical Management', pillar: 'E', financialRisk: 4.03, impact: 4.33 },
  { name: 'Waste Generation & Circular Economy', pillar: 'E', financialRisk: 3.43, impact: 3.88 },
  { name: 'Upstream Supply Chain Emissions (Scope 3 Cat. 1)', pillar: 'E', financialRisk: 3.70, impact: 4.28 },
  { name: 'Air Quality & Process Emissions', pillar: 'E', financialRisk: 3.18, impact: 3.55 },
  { name: 'Product End-of-Life & E-Waste', pillar: 'E', financialRisk: 3.48, impact: 4.13 },
  { name: 'Occupational Health & Safety', pillar: 'S', financialRisk: 3.95, impact: 4.20 },
  { name: 'Labor Rights & Working Conditions', pillar: 'S', financialRisk: 4.43, impact: 4.58 },
  { name: 'Responsible Minerals Sourcing', pillar: 'S', financialRisk: 4.13, impact: 4.55 },
  { name: 'Community Impact & Local Employment', pillar: 'S', financialRisk: 3.13, impact: 3.70 },
  { name: 'Workforce Development & Skills', pillar: 'S', financialRisk: 3.63, impact: 3.35 },
  { name: 'Diversity, Equity & Inclusion', pillar: 'S', financialRisk: 3.20, impact: 3.43 },
  { name: 'ESG Governance & Board Accountability', pillar: 'G', financialRisk: 3.70, impact: 3.48 },
  { name: 'Multi-Jurisdictional Regulatory Compliance & Ethics', pillar: 'G', financialRisk: 4.33, impact: 4.05 },
]
