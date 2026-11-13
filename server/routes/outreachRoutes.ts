import { Router, Response } from 'express';
import { db } from '../db/database.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const outreachRouter = Router();

// GET /api/outreach
outreachRouter.get('/', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const list = db.prepare('SELECT * FROM outreach WHERE user_id = ? ORDER BY sent_at DESC').all(userId) as any[];
  res.json(list.map(o => ({
    ...o,
    opened: Boolean(o.opened),
    replied: Boolean(o.replied)
  })));
});

// POST /api/outreach (Log Touchpoint & Automated Cadence)
outreachRouter.post('/', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const { leadId, channel, notes, message, followupDays = 2, outcome = 'Sent' } = req.body;

  if (!leadId || !channel) {
    return res.status(400).json({ error: 'leadId and channel are required' });
  }

  const lead = db.prepare('SELECT * FROM leads WHERE id = ? AND user_id = ?').get(leadId, userId) as any;
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  const currentTouch = (lead.followup_stage || 0) + 1;
  const now = new Date().toISOString();
  const outreachId = `outreach-${Date.now()}`;

  const tx = db.transaction(() => {
    // 1. Insert outreach entry
    db.prepare(`
      INSERT INTO outreach (id, user_id, lead_id, channel, outcome, contact_date, sent_at, message, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(outreachId, userId, leadId, channel, outcome, now, now, message || '', notes || '');

    // 2. Update lead contact date & followup stage
    const nextStage = (lead.pipeline_stage === 'New' || lead.pipeline_stage === 'Ready to Contact' || lead.pipeline_stage === 'Researched')
      ? 'Contacted'
      : lead.pipeline_stage;

    db.prepare(`
      UPDATE leads SET
        last_contact_at = ?,
        followup_stage = ?,
        pipeline_stage = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `).run(now, currentTouch, nextStage, leadId, userId);

    // 3. Automated follow-up task creation
    if (followupDays > 0) {
      const dueDate = new Date(Date.now() + followupDays * 24 * 60 * 60 * 1000).toISOString();
      const taskId = `task-${Date.now()}`;
      db.prepare(`
        INSERT INTO tasks (id, user_id, lead_id, lead_name, title, task_type, priority, due_date, status)
        VALUES (?, ?, ?, ?, ?, 'Follow-up', 'High', ?, 'Pending')
      `).run(taskId, userId, leadId, lead.business_name, `Follow-up #${currentTouch}: ${lead.business_name} (${channel})`, dueDate);
    }

    // 4. Log activity
    db.prepare(`
      INSERT INTO activities (id, user_id, lead_id, lead_name, activity_type, title)
      VALUES (?, ?, ?, ?, 'outreach_sent', ?)
    `).run(`act-${Date.now()}`, userId, leadId, lead.business_name, `Sent ${channel} touchpoint #${currentTouch} to ${lead.business_name}`);
  });

  tx();

  const created = db.prepare('SELECT * FROM outreach WHERE id = ?').get(outreachId) as any;
  res.status(201).json({
    ...created,
    opened: Boolean(created.opened),
    replied: Boolean(created.replied)
  });
});

// PATCH /api/outreach/:id/opened
outreachRouter.patch('/:id/opened', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  db.prepare(`
    UPDATE outreach SET opened = 1, opened_at = CURRENT_TIMESTAMP
    WHERE id = ? AND user_id = ?
  `).run(req.params.id, userId);

  res.json({ success: true, message: 'Outreach marked as opened' });
});

// PATCH /api/outreach/:id/replied
outreachRouter.patch('/:id/replied', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const { replyNotes } = req.body;

  const item = db.prepare('SELECT * FROM outreach WHERE id = ? AND user_id = ?').get(req.params.id, userId) as any;
  if (!item) return res.status(404).json({ error: 'Outreach not found' });

  const tx = db.transaction(() => {
    db.prepare(`
      UPDATE outreach SET
        opened = 1,
        replied = 1,
        replied_at = CURRENT_TIMESTAMP,
        outcome = 'Replied',
        reply_notes = ?
      WHERE id = ? AND user_id = ?
    `).run(replyNotes || item.reply_notes, req.params.id, userId);

    db.prepare(`
      UPDATE leads SET pipeline_stage = 'Replied', updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `).run(item.lead_id, userId);

    const lead = db.prepare('SELECT business_name FROM leads WHERE id = ?').get(item.lead_id) as any;
    if (lead) {
      db.prepare(`
        INSERT INTO activities (id, user_id, lead_id, lead_name, activity_type, title)
        VALUES (?, ?, ?, ?, 'replied', ?)
      `).run(`act-${Date.now()}`, userId, item.lead_id, lead.business_name, `Reply received from ${lead.business_name}!`);
    }
  });

  tx();
  res.json({ success: true, message: 'Reply logged' });
});

// POST /api/outreach/interested
outreachRouter.post('/interested', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const { leadId } = req.body;

  const lead = db.prepare('SELECT * FROM leads WHERE id = ? AND user_id = ?').get(leadId, userId) as any;
  if (!lead) return res.status(404).json({ error: 'Lead not found' });

  const tx = db.transaction(() => {
    db.prepare(`
      UPDATE leads SET
        pipeline_stage = 'Interested',
        interested_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `).run(leadId, userId);

    db.prepare(`
      INSERT INTO activities (id, user_id, lead_id, lead_name, activity_type, title)
      VALUES (?, ?, ?, ?, 'interested', ?)
    `).run(`act-${Date.now()}`, userId, leadId, lead.business_name, `🔥 Lead marked as Interested: ${lead.business_name}!`);
  });

  tx();
  res.json({ success: true, message: 'Lead marked as Interested' });
});
