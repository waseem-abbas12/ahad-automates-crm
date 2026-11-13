import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure db directory exists
const dbDir = path.resolve(__dirname, '../../data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'crm.sqlite');
export const db = new Database(dbPath);

// Enable WAL mode for high concurrency & foreign keys
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function initDatabase() {
  const schema = `
    -- Users Table
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      company_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Profiles Table (Targets & Preferences)
    CREATE TABLE IF NOT EXISTS profiles (
      user_id TEXT PRIMARY KEY,
      daily_target INTEGER DEFAULT 20,
      followup_interval_days INTEGER DEFAULT 2,
      monthly_target INTEGER DEFAULT 300,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Custom Settings (Categories)
    CREATE TABLE IF NOT EXISTS custom_settings (
      user_id TEXT PRIMARY KEY,
      stages_json TEXT NOT NULL,
      sources_json TEXT NOT NULL,
      task_types_json TEXT NOT NULL,
      channels_json TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Leads Table
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
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
      google_ads_running INTEGER DEFAULT 0,
      meta_ads_running INTEGER DEFAULT 0,
      website_quality TEXT DEFAULT 'Good',
      service_24_7 TEXT DEFAULT 'No',
      online_booking TEXT DEFAULT 'No',
      search_city TEXT,
      reviews_count INTEGER DEFAULT 0,
      rating REAL DEFAULT 0.0,
      google_maps_url TEXT,
      last_post_date TEXT,
      owner_role TEXT,
      owner_confidence TEXT,
      found_date TEXT,
      notes TEXT,
      deal_value REAL DEFAULT 0.0,
      social_facebook TEXT,
      social_instagram TEXT,
      social_linkedin TEXT,
      social_twitter TEXT,
      owner_linkedin TEXT,
      followup_stage INTEGER DEFAULT 0,
      last_contact_at DATETIME,
      interested_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Tasks Table
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      lead_id TEXT,
      lead_name TEXT,
      title TEXT NOT NULL,
      task_type TEXT DEFAULT 'Follow-up',
      priority TEXT DEFAULT 'Medium',
      due_date DATETIME NOT NULL,
      status TEXT DEFAULT 'Pending',
      completed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE SET NULL
    );

    -- Outreach Table
    CREATE TABLE IF NOT EXISTS outreach (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      lead_id TEXT NOT NULL,
      channel TEXT NOT NULL,
      outcome TEXT DEFAULT 'Sent',
      contact_date DATETIME NOT NULL,
      sent_at DATETIME NOT NULL,
      message TEXT,
      notes TEXT,
      opened INTEGER DEFAULT 0,
      opened_at DATETIME,
      replied INTEGER DEFAULT 0,
      replied_at DATETIME,
      reply_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
    );

    -- Notes Table
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      lead_id TEXT NOT NULL,
      content TEXT NOT NULL,
      author_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
    );

    -- Appointments Table
    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      lead_id TEXT NOT NULL,
      lead_name TEXT,
      appointment_type TEXT DEFAULT 'Discovery Call',
      appointment_date DATETIME NOT NULL,
      status TEXT DEFAULT 'Scheduled',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
    );

    -- Activities Table
    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      lead_id TEXT NOT NULL,
      lead_name TEXT NOT NULL,
      activity_type TEXT NOT NULL,
      title TEXT NOT NULL,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
    );

    -- Create indexes for performance
    CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(pipeline_stage);
    CREATE INDEX IF NOT EXISTS idx_leads_user ON leads(user_id);
    CREATE INDEX IF NOT EXISTS idx_tasks_due ON tasks(due_date);
    CREATE INDEX IF NOT EXISTS idx_outreach_lead ON outreach(lead_id);
  `;

  db.exec(schema);
  console.log('✅ SQLite Database schema initialized successfully');
}
