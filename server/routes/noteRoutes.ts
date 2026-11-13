import { Router, Response } from 'express';
import { db } from '../db/database.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const noteRouter = Router();

// GET /api/notes
noteRouter.get('/', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const notes = db.prepare('SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC').all(userId);
  res.json(notes);
});

// POST /api/notes
noteRouter.post('/', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const { lead_id, content, author_name } = req.body;
  if (!lead_id || !content) {
    return res.status(400).json({ error: 'lead_id and content required' });
  }

  const noteId = `note-${Date.now()}`;
  db.prepare(`
    INSERT INTO notes (id, user_id, lead_id, content, author_name)
    VALUES (?, ?, ?, ?, ?)
  `).run(noteId, userId, lead_id, content, author_name || 'Ahad Automates');

  const created = db.prepare('SELECT * FROM notes WHERE id = ?').get(noteId);
  res.status(201).json(created);
});

// DELETE /api/notes/:id
noteRouter.delete('/:id', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  db.prepare('DELETE FROM notes WHERE id = ? AND user_id = ?').run(req.params.id, userId);
  res.json({ success: true });
});
