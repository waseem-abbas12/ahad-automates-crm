import { Router, Response } from 'express';
import { db } from '../db/database.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const settingsRouter = Router();

// GET /api/settings
settingsRouter.get('/', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';

  const user = db.prepare('SELECT full_name, email, company_name FROM users WHERE id = ?').get(userId) as any;
  const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId) as any;
  const custom = db.prepare('SELECT * FROM custom_settings WHERE user_id = ?').get(userId) as any;

  res.json({
    profile: {
      userName: user?.full_name || 'Ahad Automates',
      userEmail: user?.email || 'demo@ahadautomates.com',
      companyName: user?.company_name || 'Ahad Automations Inc.',
      daily_target: profile?.daily_target || 20,
      followup_interval_days: profile?.followup_interval_days || 2,
      monthly_target: profile?.monthly_target || 300
    },
    settings: {
      stages: custom?.stages_json ? JSON.parse(custom.stages_json) : ['New', 'Researched', 'Ready to Contact', 'Contacted', 'Replied', 'Interested', 'Call Booked', 'Proposal', 'Won', 'Lost'],
      sources: custom?.sources_json ? JSON.parse(custom.sources_json) : ['Google Maps', 'Facebook Ads', 'Referral', 'Manual', 'LinkedIn', 'Inbound', 'Website'],
      taskTypes: custom?.task_types_json ? JSON.parse(custom.task_types_json) : ['Follow-up', 'Call', 'Email', 'Demo', 'Proposal', 'Research', 'Other'],
      channels: custom?.channels_json ? JSON.parse(custom.channels_json) : ['Email', 'Phone', 'WhatsApp', 'SMS', 'LinkedIn', 'Other']
    }
  });
});

// PUT /api/settings/profile
settingsRouter.put('/profile', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const { daily_target, followup_interval_days, monthly_target, userName, userEmail, companyName } = req.body;

  const tx = db.transaction(() => {
    if (userName || userEmail || companyName) {
      db.prepare(`
        UPDATE users SET
          full_name = COALESCE(?, full_name),
          email = COALESCE(?, email),
          company_name = COALESCE(?, company_name)
        WHERE id = ?
      `).run(userName, userEmail, companyName, userId);
    }

    db.prepare(`
      UPDATE profiles SET
        daily_target = COALESCE(?, daily_target),
        followup_interval_days = COALESCE(?, followup_interval_days),
        monthly_target = COALESCE(?, monthly_target),
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `).run(daily_target, followup_interval_days, monthly_target, userId);
  });

  tx();
  res.json({ success: true, message: 'Profile updated' });
});

// PUT /api/settings/custom
settingsRouter.put('/custom', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const { stages, sources, taskTypes, channels } = req.body;

  db.prepare(`
    UPDATE custom_settings SET
      stages_json = COALESCE(?, stages_json),
      sources_json = COALESCE(?, sources_json),
      task_types_json = COALESCE(?, task_types_json),
      channels_json = COALESCE(?, channels_json),
      updated_at = CURRENT_TIMESTAMP
    WHERE user_id = ?
  `).run(
    stages ? JSON.stringify(stages) : null,
    sources ? JSON.stringify(sources) : null,
    taskTypes ? JSON.stringify(taskTypes) : null,
    channels ? JSON.stringify(channels) : null,
    userId
  );

  res.json({ success: true, message: 'Custom settings updated' });
});
