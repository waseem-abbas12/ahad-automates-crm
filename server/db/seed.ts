import bcrypt from 'bcryptjs';
import { db, initDatabase } from './database.js';

export function seedDatabase() {
  initDatabase();

  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get('waseem000094@gmail.com') as any;
  if (existingUser) {
    console.log('ℹ️ Database already seeded');
    return;
  }

  console.log('🌱 Seeding database with production demo data...');

  // 1. Create Default User
  const userId = 'usr-demo-001';
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('password123', salt);

  const insertUser = db.prepare(`
    INSERT INTO users (id, email, password_hash, full_name, company_name)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertUser.run(userId, 'waseem000094@gmail.com', passwordHash, 'Waseem Abbas', 'Waseem Automation Inc.');

  // 2. Profile Settings
  const insertProfile = db.prepare(`
    INSERT INTO profiles (user_id, daily_target, followup_interval_days, monthly_target)
    VALUES (?, ?, ?, ?)
  `);
  insertProfile.run(userId, 20, 2, 300);

  // 3. Custom Settings
  const insertSettings = db.prepare(`
    INSERT INTO custom_settings (user_id, stages_json, sources_json, task_types_json, channels_json)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertSettings.run(
    userId,
    JSON.stringify(['New', 'Researched', 'Ready to Contact', 'Contacted', 'Replied', 'Interested', 'Call Booked', 'Proposal', 'Won', 'Lost']),
    JSON.stringify(['Google Maps', 'Facebook Ads', 'Referral', 'Manual', 'LinkedIn', 'Inbound', 'Website']),
    JSON.stringify(['Follow-up', 'Call', 'Email', 'Demo', 'Proposal', 'Research', 'Other']),
    JSON.stringify(['Email', 'Phone', 'WhatsApp', 'SMS', 'LinkedIn', 'Other'])
  );

  // 4. Seed Leads
  const insertLead = db.prepare(`
    INSERT INTO leads (
      id, user_id, business_name, contact_name, email, phone, website, city, state, country,
      lead_source, pipeline_stage, lead_status, opportunity_score, opportunity_level,
      google_ads_running, meta_ads_running, website_quality, service_24_7, online_booking,
      reviews_count, rating, notes, deal_value, social_facebook, social_instagram, social_linkedin,
      followup_stage, last_contact_at, interested_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?
    )
  `);

  const now = new Date();
  const subDays = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();

  const leads = [
    {
      id: 'lead-1',
      business_name: 'Apex Precision Dental Clinic',
      contact_name: 'Dr. Marcus Vance',
      email: 'marcus@apexdentalcare.com',
      phone: '+1 (512) 890-3421',
      website: 'https://apexdentalcare.com',
      city: 'Austin',
      state: 'TX',
      country: 'US',
      lead_source: 'Google Maps',
      pipeline_stage: 'Ready to Contact',
      lead_status: 'Active',
      opportunity_score: 95,
      opportunity_level: 'High',
      google_ads_running: 1,
      meta_ads_running: 1,
      website_quality: 'Good',
      service_24_7: 'No',
      online_booking: 'Yes',
      reviews_count: 148,
      rating: 4.8,
      notes: 'Large private practice running Google Search Ads for dental implants.',
      deal_value: 4500,
      social_facebook: 'https://facebook.com/apexdental',
      social_instagram: 'https://instagram.com/apexdentalcare',
      social_linkedin: 'https://linkedin.com/company/apexdentalcare',
      followup_stage: 0,
      last_contact_at: null,
      interested_at: null
    },
    {
      id: 'lead-2',
      business_name: 'Blue Ridge Heating & Air',
      contact_name: 'Kevin Callahan',
      email: 'kevin@blueridgehvac.com',
      phone: '+1 (704) 555-0198',
      website: 'https://blueridgehvac.com',
      city: 'Charlotte',
      state: 'NC',
      country: 'US',
      lead_source: 'Facebook Ads',
      pipeline_stage: 'Contacted',
      lead_status: 'Active',
      opportunity_score: 80,
      opportunity_level: 'High',
      google_ads_running: 1,
      meta_ads_running: 0,
      website_quality: 'Good',
      service_24_7: 'Yes',
      online_booking: 'Yes',
      reviews_count: 89,
      rating: 4.7,
      notes: 'Sent initial cold pitch via email regarding speed-to-lead automation.',
      deal_value: 3800,
      social_facebook: 'https://facebook.com/blueridgehvac',
      social_instagram: null,
      social_linkedin: 'https://linkedin.com/company/blueridgehvac',
      followup_stage: 1,
      last_contact_at: subDays(1),
      interested_at: null
    },
    {
      id: 'lead-3',
      business_name: 'Summit Law Group LLP',
      contact_name: 'Eleanor Vance, Esq.',
      email: 'evance@summitlawpllc.com',
      phone: '+1 (303) 892-1144',
      website: 'https://summitlawpllc.com',
      city: 'Denver',
      state: 'CO',
      country: 'US',
      lead_source: 'Google Maps',
      pipeline_stage: 'Interested',
      lead_status: 'Active',
      opportunity_score: 95,
      opportunity_level: 'High',
      google_ads_running: 1,
      meta_ads_running: 1,
      website_quality: 'Good',
      service_24_7: 'No',
      online_booking: 'Yes',
      reviews_count: 210,
      rating: 4.9,
      notes: 'Replied positively! Wants to eliminate manual intake forms and automate lead routing.',
      deal_value: 7500,
      social_facebook: null,
      social_instagram: null,
      social_linkedin: 'https://linkedin.com/company/summitlaw',
      followup_stage: 2,
      last_contact_at: subDays(2),
      interested_at: subDays(1)
    },
    {
      id: 'lead-4',
      business_name: 'Vanguard Solar Systems',
      contact_name: 'David Reynolds',
      email: 'david.r@vanguardsolar.io',
      phone: '+1 (602) 414-9981',
      website: 'https://vanguardsolar.io',
      city: 'Phoenix',
      state: 'AZ',
      country: 'US',
      lead_source: 'LinkedIn',
      pipeline_stage: 'Call Booked',
      lead_status: 'Active',
      opportunity_score: 95,
      opportunity_level: 'High',
      google_ads_running: 1,
      meta_ads_running: 1,
      website_quality: 'Good',
      service_24_7: 'Yes',
      online_booking: 'Yes',
      reviews_count: 73,
      rating: 4.6,
      notes: 'Discovery call booked for Thursday 2 PM.',
      deal_value: 12000,
      social_facebook: 'https://facebook.com/vanguardsolar',
      social_instagram: 'https://instagram.com/vanguardsolar',
      social_linkedin: 'https://linkedin.com/company/vanguardsolar',
      followup_stage: 3,
      last_contact_at: subDays(4),
      interested_at: subDays(3)
    },
    {
      id: 'lead-5',
      business_name: 'Coastal Roots Landscaping',
      contact_name: 'Mateo Gutierrez',
      email: 'mateo@coastalrootsland.com',
      phone: '+1 (858) 234-8712',
      website: 'https://coastalrootsland.com',
      city: 'San Diego',
      state: 'CA',
      country: 'US',
      lead_source: 'Google Maps',
      pipeline_stage: 'New',
      lead_status: 'Active',
      opportunity_score: 40,
      opportunity_level: 'Medium',
      google_ads_running: 0,
      meta_ads_running: 0,
      website_quality: 'Fair',
      service_24_7: 'No',
      online_booking: 'No',
      reviews_count: 32,
      rating: 4.4,
      notes: 'High local rating, but website lacks quick contact forms.',
      deal_value: 2500,
      social_facebook: null,
      social_instagram: 'https://instagram.com/coastalroots',
      social_linkedin: null,
      followup_stage: 0,
      last_contact_at: null,
      interested_at: null
    },
    {
      id: 'lead-6',
      business_name: 'Ironclad Roofing & Restoration',
      contact_name: 'Bradford Stone',
      email: 'brad@ironcladroofers.com',
      phone: '+1 (972) 345-6710',
      website: 'https://ironcladroofers.com',
      city: 'Dallas',
      state: 'TX',
      country: 'US',
      lead_source: 'Google Maps',
      pipeline_stage: 'Proposal',
      lead_status: 'Active',
      opportunity_score: 95,
      opportunity_level: 'High',
      google_ads_running: 1,
      meta_ads_running: 1,
      website_quality: 'Good',
      service_24_7: 'Yes',
      online_booking: 'Yes',
      reviews_count: 185,
      rating: 4.9,
      notes: 'Sent formal proposal for custom AI dispatch system.',
      deal_value: 9500,
      social_facebook: 'https://facebook.com/ironcladroofs',
      social_instagram: null,
      social_linkedin: 'https://linkedin.com/company/ironcladroofs',
      followup_stage: 2,
      last_contact_at: subDays(1),
      interested_at: subDays(4)
    },
    {
      id: 'lead-7',
      business_name: 'Heritage Fine Woodworking',
      contact_name: 'Thomas Wright',
      email: 'tom@heritagewoodwork.net',
      phone: '+1 (615) 880-9912',
      website: 'https://heritagewoodwork.net',
      city: 'Nashville',
      state: 'TN',
      country: 'US',
      lead_source: 'Manual',
      pipeline_stage: 'Won',
      lead_status: 'Active',
      opportunity_score: 80,
      opportunity_level: 'High',
      google_ads_running: 1,
      meta_ads_running: 0,
      website_quality: 'Good',
      service_24_7: 'No',
      online_booking: 'Yes',
      reviews_count: 64,
      rating: 4.8,
      notes: 'Closed! Signed annual enterprise automation contract.',
      deal_value: 8400,
      social_facebook: null,
      social_instagram: 'https://instagram.com/heritagewoodworks',
      social_linkedin: null,
      followup_stage: 3,
      last_contact_at: subDays(6),
      interested_at: subDays(8)
    }
  ];

  for (const l of leads) {
    insertLead.run(
      l.id, userId, l.business_name, l.contact_name, l.email, l.phone, l.website, l.city, l.state, l.country,
      l.lead_source, l.pipeline_stage, l.lead_status, l.opportunity_score, l.opportunity_level,
      l.google_ads_running, l.meta_ads_running, l.website_quality, l.service_24_7, l.online_booking,
      l.reviews_count, l.rating, l.notes, l.deal_value, l.social_facebook, l.social_instagram, l.social_linkedin,
      l.followup_stage, l.last_contact_at, l.interested_at
    );
  }

  // 5. Seed Tasks
  const insertTask = db.prepare(`
    INSERT INTO tasks (id, user_id, lead_id, lead_name, title, task_type, priority, due_date, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertTask.run('task-1', userId, 'lead-1', 'Apex Precision Dental Clinic', 'First touch outreach via Email & LinkedIn', 'Email', 'High', new Date().toISOString(), 'Pending');
  insertTask.run('task-2', userId, 'lead-2', 'Blue Ridge Heating & Air', 'Follow-up #1: Check on emergency dispatch pitch', 'Follow-up', 'High', new Date().toISOString(), 'Pending');
  insertTask.run('task-3', userId, 'lead-3', 'Summit Law Group LLP', 'Send calendar invite & intake workflow demo', 'Demo', 'High', new Date(Date.now() + 86400000).toISOString(), 'Pending');
  insertTask.run('task-4', userId, 'lead-6', 'Ironclad Roofing & Restoration', 'Review proposal details with Bradford Stone', 'Proposal', 'Medium', subDays(1), 'Pending');

  // 6. Seed Outreach
  const insertOutreach = db.prepare(`
    INSERT INTO outreach (id, user_id, lead_id, channel, outcome, contact_date, sent_at, message, notes, opened, replied, reply_notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertOutreach.run('outreach-1', userId, 'lead-2', 'Email', 'Sent', subDays(1), subDays(1), 'Speed to lead automation pitch', 'Sent via Google Workspace', 1, 0, null);
  insertOutreach.run('outreach-2', userId, 'lead-3', 'Email', 'Replied', subDays(2), subDays(2), 'Law firm intake automation', 'Prompt reply received', 1, 1, 'Interested in weekend intake automation.');
  insertOutreach.run('outreach-3', userId, 'lead-4', 'LinkedIn', 'Call Booked', subDays(4), subDays(4), 'Solar pipeline integration', 'Scheduled discovery call', 1, 1, 'Confirmed Thursday 2pm');

  // 7. Seed Appointments
  const insertAppt = db.prepare(`
    INSERT INTO appointments (id, user_id, lead_id, lead_name, appointment_type, appointment_date, status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertAppt.run('appt-1', userId, 'lead-4', 'Vanguard Solar Systems', 'Discovery Call', new Date(Date.now() + 172800000).toISOString(), 'Scheduled', 'Review solar lead intake forms.');
  insertAppt.run('appt-2', userId, 'lead-3', 'Summit Law Group LLP', 'Demo', new Date(Date.now() + 259200000).toISOString(), 'Scheduled', 'Walk Eleanor Vance through automated intake.');

  // 8. Seed Activities
  const insertAct = db.prepare(`
    INSERT INTO activities (id, user_id, lead_id, lead_name, activity_type, title)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertAct.run('act-1', userId, 'lead-1', 'Apex Precision Dental Clinic', 'created', 'New lead added to CRM from Google Maps');
  insertAct.run('act-2', userId, 'lead-3', 'Summit Law Group LLP', 'replied', 'Eleanor Vance replied to initial email outreach');
  insertAct.run('act-3', userId, 'lead-4', 'Vanguard Solar Systems', 'appointment_scheduled', 'Discovery Call booked with David Reynolds');
  insertAct.run('act-4', userId, 'lead-7', 'Heritage Fine Woodworking', 'stage_changed', 'Deal Won! $8,400 contract closed');

  console.log('✅ SQLite Database successfully seeded with 7 realistic accounts and full history');
}
