import { Router, Response } from 'express';
import { db } from '../db/database.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const leadRouter = Router();

function calculateScore(lead: any): { score: number; level: 'High' | 'Medium' | 'Low' } {
  let score = 30;
  if (lead.website_quality === 'Good') score += 15;
  else if (lead.website_quality === 'Fair') score += 5;

  if (lead.google_ads_running) score += 15;
  if (lead.meta_ads_running) score += 15;

  if (lead.online_booking === 'Yes') score += 10;
  if (lead.service_24_7 === 'Yes') score += 5;

  if ((lead.reviews_count || 0) >= 20) score += 5;
  if ((lead.rating || 0) >= 4.5) score += 5;

  const finalScore = Math.max(0, Math.min(100, score));
  const level = finalScore >= 70 ? 'High' : finalScore >= 40 ? 'Medium' : 'Low';
  return { score: finalScore, level };
}

// GET /api/leads
leadRouter.get('/', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const leads = db.prepare('SELECT * FROM leads WHERE user_id = ? ORDER BY created_at DESC').all(userId) as any[];

  // Convert boolean numbers to actual booleans
  const formatted = leads.map(l => ({
    ...l,
    google_ads_running: Boolean(l.google_ads_running),
    meta_ads_running: Boolean(l.meta_ads_running)
  }));

  res.json(formatted);
});

// GET /api/leads/:id
leadRouter.get('/:id', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const lead = db.prepare('SELECT * FROM leads WHERE id = ? AND user_id = ?').get(req.params.id, userId) as any;
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  const tasks = db.prepare('SELECT * FROM tasks WHERE lead_id = ? ORDER BY due_date ASC').all(lead.id);
  const outreach = db.prepare('SELECT * FROM outreach WHERE lead_id = ? ORDER BY sent_at DESC').all(lead.id);
  const notes = db.prepare('SELECT * FROM notes WHERE lead_id = ? ORDER BY created_at DESC').all(lead.id);
  const appointments = db.prepare('SELECT * FROM appointments WHERE lead_id = ? ORDER BY appointment_date ASC').all(lead.id);

  res.json({
    lead: {
      ...lead,
      google_ads_running: Boolean(lead.google_ads_running),
      meta_ads_running: Boolean(lead.meta_ads_running)
    },
    tasks,
    outreach,
    notes,
    appointments
  });
});

// POST /api/leads
leadRouter.post('/', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const body = req.body;

  if (!body.business_name || !body.business_name.trim()) {
    return res.status(400).json({ error: 'Business name is required' });
  }

  const { score, level } = calculateScore(body);
  const leadId = `lead-${Date.now()}`;

  const insert = db.prepare(`
    INSERT INTO leads (
      id, user_id, business_name, contact_name, email, phone, website, address, city, state, country,
      lead_source, pipeline_stage, lead_status, opportunity_score, opportunity_level,
      google_ads_running, meta_ads_running, website_quality, service_24_7, online_booking,
      reviews_count, rating, notes, deal_value, social_facebook, social_instagram, social_linkedin,
      followup_stage, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?,
      ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )
  `);

  insert.run(
    leadId,
    userId,
    body.business_name.trim(),
    body.contact_name || '',
    body.email || '',
    body.phone || '',
    body.website || '',
    body.address || '',
    body.city || '',
    body.state || '',
    body.country || 'US',
    body.lead_source || 'Google Maps',
    body.pipeline_stage || 'New',
    body.lead_status || 'Active',
    score,
    level,
    body.google_ads_running ? 1 : 0,
    body.meta_ads_running ? 1 : 0,
    body.website_quality || 'Good',
    body.service_24_7 || 'No',
    body.online_booking || 'No',
    body.reviews_count || 0,
    body.rating || 0,
    body.notes || '',
    body.deal_value || 0,
    body.social_facebook || null,
    body.social_instagram || null,
    body.social_linkedin || null,
    0
  );

  // Log activity
  db.prepare(`
    INSERT INTO activities (id, user_id, lead_id, lead_name, activity_type, title)
    VALUES (?, ?, ?, ?, 'created', ?)
  `).run(`act-${Date.now()}`, userId, leadId, body.business_name, `Prospect "${body.business_name}" created`);

  const createdLead = db.prepare('SELECT * FROM leads WHERE id = ?').get(leadId) as any;
  res.status(201).json({
    ...createdLead,
    google_ads_running: Boolean(createdLead.google_ads_running),
    meta_ads_running: Boolean(createdLead.meta_ads_running)
  });
});

// PUT /api/leads/:id
leadRouter.put('/:id', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const existing = db.prepare('SELECT * FROM leads WHERE id = ? AND user_id = ?').get(req.params.id, userId) as any;
  if (!existing) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  const merged = { ...existing, ...req.body };
  const { score, level } = calculateScore(merged);

  const update = db.prepare(`
    UPDATE leads SET
      business_name = ?,
      contact_name = ?,
      email = ?,
      phone = ?,
      website = ?,
      city = ?,
      state = ?,
      lead_source = ?,
      pipeline_stage = ?,
      lead_status = ?,
      opportunity_score = ?,
      opportunity_level = ?,
      google_ads_running = ?,
      meta_ads_running = ?,
      website_quality = ?,
      service_24_7 = ?,
      online_booking = ?,
      reviews_count = ?,
      rating = ?,
      deal_value = ?,
      notes = ?,
      last_contact_at = ?,
      interested_at = ?,
      followup_stage = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ? AND user_id = ?
  `);

  update.run(
    merged.business_name,
    merged.contact_name,
    merged.email,
    merged.phone,
    merged.website,
    merged.city,
    merged.state,
    merged.lead_source,
    merged.pipeline_stage,
    merged.lead_status,
    score,
    level,
    merged.google_ads_running ? 1 : 0,
    merged.meta_ads_running ? 1 : 0,
    merged.website_quality,
    merged.service_24_7,
    merged.online_booking,
    merged.reviews_count,
    merged.rating,
    merged.deal_value,
    merged.notes,
    merged.last_contact_at,
    merged.interested_at,
    merged.followup_stage,
    req.params.id,
    userId
  );

  const updated = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id) as any;
  res.json({
    ...updated,
    google_ads_running: Boolean(updated.google_ads_running),
    meta_ads_running: Boolean(updated.meta_ads_running)
  });
});

// DELETE /api/leads/:id
leadRouter.delete('/:id', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  db.prepare('DELETE FROM leads WHERE id = ? AND user_id = ?').run(req.params.id, userId);
  res.json({ success: true, message: 'Lead deleted' });
});

// POST /api/leads/bulk-stage
leadRouter.post('/bulk-stage', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const { ids, stage } = req.body;
  if (!Array.isArray(ids) || !stage) {
    return res.status(400).json({ error: 'ids array and stage required' });
  }

  const stmt = db.prepare('UPDATE leads SET pipeline_stage = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?');
  const updateMany = db.transaction((leadIds: string[]) => {
    for (const id of leadIds) stmt.run(stage, id, userId);
  });
  updateMany(ids);

  res.json({ success: true, count: ids.length });
});

// POST /api/leads/bulk-delete
leadRouter.post('/bulk-delete', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: 'ids array required' });
  }

  const stmt = db.prepare('DELETE FROM leads WHERE id = ? AND user_id = ?');
  const deleteMany = db.transaction((leadIds: string[]) => {
    for (const id of leadIds) stmt.run(id, userId);
  });
  deleteMany(ids);

  res.json({ success: true, count: ids.length });
});

// POST /api/leads/import
leadRouter.post('/import', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const { leads: incomingLeads } = req.body;

  if (!Array.isArray(incomingLeads)) {
    return res.status(400).json({ error: 'leads array required' });
  }

  const existingLeads = db.prepare('SELECT business_name FROM leads WHERE user_id = ?').all(userId) as any[];
  const existingNames = new Set(existingLeads.map(l => l.business_name.toLowerCase().trim()));

  let imported = 0;
  let duplicates = 0;

  const insert = db.prepare(`
    INSERT INTO leads (
      id, user_id, business_name, contact_name, email, phone, website, city, state, country,
      lead_source, pipeline_stage, lead_status, opportunity_score, opportunity_level,
      google_ads_running, meta_ads_running, website_quality, service_24_7, online_booking,
      reviews_count, rating, notes, deal_value, followup_stage
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?
    )
  `);

  const importTx = db.transaction((list: any[]) => {
    for (const item of list) {
      if (!item.business_name || !item.business_name.trim()) continue;
      const cleanName = item.business_name.toLowerCase().trim();
      if (existingNames.has(cleanName)) {
        duplicates++;
        continue;
      }
      existingNames.add(cleanName);

      const { score, level } = calculateScore(item);
      const id = `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

      insert.run(
        id,
        userId,
        item.business_name.trim(),
        item.contact_name || '',
        item.email || '',
        item.phone || '',
        item.website || '',
        item.city || '',
        item.state || '',
        item.country || 'US',
        item.lead_source || 'Google Maps',
        item.pipeline_stage || 'New',
        item.lead_status || 'Active',
        score,
        level,
        item.google_ads_running ? 1 : 0,
        item.meta_ads_running ? 1 : 0,
        item.website_quality || 'Fair',
        item.service_24_7 || 'No',
        item.online_booking || 'No',
        item.reviews_count || 0,
        item.rating || 0,
        item.notes || '',
        item.deal_value || 0,
        0
      );
      imported++;
    }
  });

  importTx(incomingLeads);
  res.json({ success: true, imported, duplicates });
});
