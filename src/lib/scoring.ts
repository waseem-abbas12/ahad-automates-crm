import { Lead, OpportunityLevel, Outreach, Appointment } from '../types/crm';

export function calculateOpportunityScore(lead: Partial<Lead>): number {
  let score = 30; // base score

  // Website Quality (+15 for Good, +5 for Fair, +0 for Poor/None)
  if (lead.website_quality === 'Good') score += 15;
  else if (lead.website_quality === 'Fair') score += 5;

  // Paid Ads Signals (+15 each if actively spending on traffic)
  if (lead.google_ads_running) score += 15;
  if (lead.meta_ads_running) score += 15;

  // Modern Operations Signals
  if (lead.online_booking === 'Yes') score += 10;
  if (lead.service_24_7 === 'Yes') score += 5;

  // Social Proof & Reputation
  if ((lead.reviews_count ?? 0) >= 20) score += 5;
  if ((lead.rating ?? 0) >= 4.5) score += 5;

  return Math.max(0, Math.min(100, score));
}

export function getOpportunityLevel(score: number): OpportunityLevel {
  if (score >= 70) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
}

export interface JourneyMilestones {
  contacted: boolean;
  opened: boolean;
  replied: boolean;
  interested: boolean;
  booked: boolean;
  won: boolean;
}

export function calculateMilestones(
  lead: Lead, 
  outreachList: Outreach[] = [], 
  appointmentsList: Appointment[] = []
): JourneyMilestones {
  const leadOutreach = outreachList.filter(o => o.lead_id === lead.id);
  const leadAppointments = appointmentsList.filter(a => a.lead_id === lead.id);

  const contacted = leadOutreach.length > 0 || !!lead.last_contact_at || lead.pipeline_stage !== 'New';
  const opened = leadOutreach.some(o => o.opened) || false;
  const replied = leadOutreach.some(o => o.replied) || ['Replied', 'Interested', 'Call Booked', 'Proposal', 'Won'].includes(lead.pipeline_stage);
  const interested = !!lead.interested_at || ['Interested', 'Call Booked', 'Proposal', 'Won'].includes(lead.pipeline_stage);
  const booked = leadAppointments.length > 0 || ['Call Booked', 'Proposal', 'Won'].includes(lead.pipeline_stage);
  const won = lead.pipeline_stage === 'Won';

  return { contacted, opened, replied, interested, booked, won };
}

export function formatRelativeTime(dateString?: string): string {
  if (!dateString) return 'Never';
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatCurrency(amount: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
