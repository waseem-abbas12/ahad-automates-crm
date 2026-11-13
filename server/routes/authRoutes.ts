import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/database.js';
import { JWT_SECRET, AuthenticatedRequest } from '../middleware/auth.js';

export const authRouter = Router();

// POST /api/auth/login
authRouter.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isMatch = bcrypt.compareSync(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, name: user.full_name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(user.id) as any;

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      companyName: user.company_name,
      profile: profile || { daily_target: 20, followup_interval_days: 2, monthly_target: 300 }
    }
  });
});

// POST /api/auth/register
authRouter.post('/register', (req: Request, res: Response) => {
  const { email, password, fullName, companyName } = req.body;
  if (!email || !password || !fullName) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(409).json({ error: 'Account already exists with this email' });
  }

  const userId = `usr-${Date.now()}`;
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const insertUser = db.prepare(`
    INSERT INTO users (id, email, password_hash, full_name, company_name)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertUser.run(userId, email, passwordHash, fullName, companyName || '');

  // Default profile & settings
  db.prepare(`
    INSERT INTO profiles (user_id, daily_target, followup_interval_days, monthly_target)
    VALUES (?, 20, 2, 300)
  `).run(userId);

  db.prepare(`
    INSERT INTO custom_settings (user_id, stages_json, sources_json, task_types_json, channels_json)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    userId,
    JSON.stringify(['New', 'Researched', 'Ready to Contact', 'Contacted', 'Replied', 'Interested', 'Call Booked', 'Proposal', 'Won', 'Lost']),
    JSON.stringify(['Google Maps', 'Facebook Ads', 'Referral', 'Manual', 'LinkedIn', 'Inbound', 'Website']),
    JSON.stringify(['Follow-up', 'Call', 'Email', 'Demo', 'Proposal', 'Research', 'Other']),
    JSON.stringify(['Email', 'Phone', 'WhatsApp', 'SMS', 'LinkedIn', 'Other'])
  );

  const token = jwt.sign({ userId, email, name: fullName }, JWT_SECRET, { expiresIn: '7d' });

  res.status(201).json({
    token,
    user: {
      id: userId,
      email,
      fullName,
      companyName
    }
  });
});

// GET /api/auth/me
authRouter.get('/me', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const user = db.prepare('SELECT id, email, full_name, company_name, created_at FROM users WHERE id = ?').get(userId) as any;
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId);
  res.json({ user, profile });
});
