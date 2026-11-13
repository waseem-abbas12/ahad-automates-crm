export type PipelineStage = 
  | 'New'
  | 'Researched'
  | 'Ready to Contact'
  | 'Contacted'
  | 'Replied'
  | 'Interested'
  | 'Call Booked'
  | 'Proposal'
  | 'Won'
  | 'Lost';

export type LeadSource = 
  | 'Google Maps'
  | 'Facebook Ads'
  | 'Referral'
  | 'Manual'
  | 'LinkedIn'
  | 'Inbound'
  | 'Website';

export type LeadStatus = 'Active' | 'Paused' | 'Disqualified';

export type OpportunityLevel = 'High' | 'Medium' | 'Low';

export type WebsiteQuality = 'Good' | 'Fair' | 'Poor' | 'None';

export type OutreachChannel = 'Email' | 'Phone' | 'WhatsApp' | 'SMS' | 'LinkedIn' | 'Other';

export type OutreachOutcome = 
  | 'No Response'
  | 'Sent'
  | 'Replied'
  | 'Interested'
  | 'Not Interested'
  | 'Call Booked'
  | 'Wrong Contact'
  | 'Other';

export type TaskType = 
  | 'Follow-up'
  | 'Call'
  | 'Email'
  | 'Demo'
  | 'Proposal'
  | 'Research'
  | 'Other';

export type TaskPriority = 'Low' | 'Medium' | 'High';

export type AppointmentType = 'Discovery Call' | 'Demo' | 'Follow-up Call' | 'Closing Call';

export type AppointmentStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'No Show';

export interface Lead {
  id: string;
  business_name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  lead_source: LeadSource;
  pipeline_stage: PipelineStage;
  lead_status: LeadStatus;
  opportunity_score: number;
  opportunity_level: OpportunityLevel;
  google_ads_running?: boolean | null;
  meta_ads_running?: boolean | null;
  website_quality?: WebsiteQuality;
  service_24_7?: 'Yes' | 'No' | 'Unknown';
  online_booking?: 'Yes' | 'No' | 'Unknown';
  search_city?: string;
  reviews_count?: number;
  rating?: number;
  google_maps_url?: string;
  last_post_date?: string;
  owner_role?: string;
  owner_confidence?: string;
  found_date?: string;
  notes?: string;
  last_contact_at?: string;
  interested_at?: string;
  deal_value?: number;
  social_facebook?: string;
  social_instagram?: string;
  social_linkedin?: string;
  social_twitter?: string;
  owner_linkedin?: string;
  followup_stage?: number; // 0 = not contacted yet, 1 = 1st follow-up, 2 = 2nd, 3 = 3rd, 4 = finished
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  lead_id?: string;
  lead_name?: string;
  title: string;
  task_type: TaskType;
  priority: TaskPriority;
  due_date: string;
  status: 'Pending' | 'Completed';
  completed_at?: string;
  created_at: string;
}

export interface Outreach {
  id: string;
  lead_id: string;
  channel: OutreachChannel;
  outcome: OutreachOutcome;
  contact_date: string;
  sent_at: string;
  message?: string;
  notes?: string;
  opened?: boolean;
  opened_at?: string;
  replied?: boolean;
  replied_at?: string;
  reply_notes?: string;
  created_at: string;
}

export interface Note {
  id: string;
  lead_id: string;
  content: string;
  created_at: string;
  author_name?: string;
}

export interface Appointment {
  id: string;
  lead_id: string;
  lead_name?: string;
  appointment_type: AppointmentType;
  appointment_date: string;
  status: AppointmentStatus;
  notes?: string;
  created_at: string;
}

export interface Activity {
  id: string;
  lead_id: string;
  lead_name: string;
  activity_type: 'created' | 'stage_changed' | 'outreach_sent' | 'note_added' | 'task_completed' | 'appointment_scheduled' | 'replied' | 'interested';
  title: string;
  details?: Record<string, any>;
  created_at: string;
}

export interface ProfileSettings {
  daily_target: number;
  followup_interval_days: number;
  monthly_target: number;
  userName: string;
  userEmail: string;
  companyName: string;
}

export interface CustomSettings {
  stages: string[];
  sources: string[];
  taskTypes: string[];
  channels: string[];
}
