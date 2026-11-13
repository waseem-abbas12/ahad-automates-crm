import { Router, Response } from 'express';
import { db } from '../db/database.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const taskRouter = Router();

// GET /api/tasks
taskRouter.get('/', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const tasks = db.prepare('SELECT * FROM tasks WHERE user_id = ? ORDER BY due_date ASC').all(userId);
  res.json(tasks);
});

// POST /api/tasks
taskRouter.post('/', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const { title, lead_id, lead_name, task_type = 'Follow-up', priority = 'Medium', due_date } = req.body;

  if (!title || !due_date) {
    return res.status(400).json({ error: 'Title and due_date are required' });
  }

  const taskId = `task-${Date.now()}`;
  const insert = db.prepare(`
    INSERT INTO tasks (id, user_id, lead_id, lead_name, title, task_type, priority, due_date, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
  `);
  insert.run(taskId, userId, lead_id || null, lead_name || null, title, task_type, priority, due_date);

  const created = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId);
  res.status(201).json(created);
});

// PATCH /api/tasks/:id/toggle
taskRouter.patch('/:id/toggle', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?').get(req.params.id, userId) as any;
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const isCompleted = task.status === 'Completed';
  const newStatus = isCompleted ? 'Pending' : 'Completed';
  const completedAt = isCompleted ? null : new Date().toISOString();

  db.prepare(`
    UPDATE tasks SET status = ?, completed_at = ? WHERE id = ? AND user_id = ?
  `).run(newStatus, completedAt, req.params.id, userId);

  const updated = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE /api/tasks/:id
taskRouter.delete('/:id', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  db.prepare('DELETE FROM tasks WHERE id = ? AND user_id = ?').run(req.params.id, userId);
  res.json({ success: true });
});
