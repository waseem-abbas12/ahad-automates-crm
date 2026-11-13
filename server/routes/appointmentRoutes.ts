import { Router, Response } from 'express';
import { db } from '../db/database.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const appointmentRouter = Router();

// GET /api/appointments
appointmentRouter.get('/', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const list = db.prepare('SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date ASC').all(userId);
  res.json(list);
});

// POST /api/appointments
appointmentRouter.post('/', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const { lead_id, lead_name, appointment_type = 'Discovery Call', appointment_date, notes } = req.body;

  if (!lead_id || !appointment_date) {
    return res.status(400).json({ error: 'lead_id and appointment_date required' });
  }

  const apptId = `appt-${Date.now()}`;

  const tx = db.transaction(() => {
    db.prepare(`
      INSERT INTO appointments (id, user_id, lead_id, lead_name, appointment_type, appointment_date, status, notes)
      VALUES (?, ?, ?, ?, ?, ?, 'Scheduled', ?)
    `).run(apptId, userId, lead_id, lead_name || '', appointment_type, appointment_date, notes || '');

    // Advance lead stage to Call Booked
    db.prepare(`
      UPDATE leads SET pipeline_stage = 'Call Booked', updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `).run(lead_id, userId);

    const lead = db.prepare('SELECT business_name FROM leads WHERE id = ?').get(lead_id) as any;
    db.prepare(`
      INSERT INTO activities (id, user_id, lead_id, lead_name, activity_type, title)
      VALUES (?, ?, ?, ?, 'appointment_scheduled', ?)
    `).run(`act-${Date.now()}`, userId, lead_id, lead?.business_name || '', `Booked ${appointment_type} with ${lead?.business_name || ''}`);
  });

  tx();

  const created = db.prepare('SELECT * FROM appointments WHERE id = ?').get(apptId);
  res.status(201).json(created);
});

// PATCH /api/appointments/:id
appointmentRouter.patch('/:id', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const { status, notes } = req.body;

  db.prepare(`
    UPDATE appointments SET status = COALESCE(?, status), notes = COALESCE(?, notes)
    WHERE id = ? AND user_id = ?
  `).run(status, notes, req.params.id, userId);

  const updated = db.prepare('SELECT * FROM appointments WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE /api/appointments/:id
appointmentRouter.delete('/:id', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  db.prepare('DELETE FROM appointments WHERE id = ? AND user_id = ?').run(req.params.id, userId);
  res.json({ success: true });
});
