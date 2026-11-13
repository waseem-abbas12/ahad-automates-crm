-- =========================================================================
-- WASEEM AUTOMATION CRM - COMPLETE POSTGRESQL / SUPABASE PRODUCTION SCHEMA
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_target INTEGER DEFAULT 20,
  followup_interval_days INTEGER DEFAULT 2,
  monthly_target INTEGER DEFAULT 300,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'US',
  lead_source TEXT DEFAULT 'Google Maps',
  pipeline_stage TEXT DEFAULT 'New',
  lead_status TEXT DEFAULT 'Active',
  opportunity_score INTEGER DEFAULT 30,
  opportunity_level TEXT DEFAULT 'Medium',
  google_ads_running BOOLEAN DEFAULT FALSE,
  meta_ads_running BOOLEAN DEFAULT FALSE,
  website_quality TEXT DEFAULT 'Good',
  service_24_7 TEXT DEFAULT 'No',
  online_booking TEXT DEFAULT 'No',
  search_city TEXT,
  reviews_count INTEGER DEFAULT 0,
  rating NUMERIC(2,1) DEFAULT 0.0,
  google_maps_url TEXT,
  last_post_date TIMESTAMP WITH TIME ZONE,
  owner_role TEXT,
  owner_confidence TEXT,
  found_date DATE,
  notes TEXT,
  deal_value NUMERIC(10,2) DEFAULT 0.0,
  social_facebook TEXT,
  social_instagram TEXT,
  social_linkedin TEXT,
  social_twitter TEXT,
  owner_linkedin TEXT,
  followup_stage INTEGER DEFAULT 0,
  last_contact_at TIMESTAMP WITH TIME ZONE,
  interested_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TASKS TABLE
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  lead_name TEXT,
  title TEXT NOT NULL,
  task_type TEXT DEFAULT 'Follow-up',
  priority TEXT DEFAULT 'Medium',
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'Pending',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. OUTREACH TABLE
CREATE TABLE IF NOT EXISTS public.outreach (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  channel TEXT NOT NULL,
  outcome TEXT DEFAULT 'Sent',
  contact_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  message TEXT,
  notes TEXT,
  opened BOOLEAN DEFAULT FALSE,
  opened_at TIMESTAMP WITH TIME ZONE,
  replied BOOLEAN DEFAULT FALSE,
  replied_at TIMESTAMP WITH TIME ZONE,
  reply_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. NOTES TABLE
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  lead_name TEXT,
  appointment_type TEXT DEFAULT 'Discovery Call',
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'Scheduled',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  lead_name TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.custom_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  stages_json JSONB NOT NULL DEFAULT '["New","Researched","Ready to Contact","Contacted","Replied","Interested","Call Booked","Proposal","Won","Lost"]'::jsonb,
  sources_json JSONB NOT NULL DEFAULT '["Google Maps","Facebook Ads","Referral","Manual","LinkedIn","Inbound","Website"]'::jsonb,
  task_types_json JSONB NOT NULL DEFAULT '["Follow-up","Call","Email","Demo","Proposal","Research","Other"]'::jsonb,
  channels_json JSONB NOT NULL DEFAULT '["Email","Phone","WhatsApp","SMS","LinkedIn","Other"]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outreach ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own profile" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can only access their own leads" ON public.leads FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can only access their own tasks" ON public.tasks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can only access their own outreach" ON public.outreach FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can only access their own notes" ON public.notes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can only access their own appointments" ON public.appointments FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can only access their own activities" ON public.activities FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can only access their own settings" ON public.custom_settings FOR ALL USING (auth.uid() = user_id);
