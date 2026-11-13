import { Router, Response } from 'express';
import { db } from '../db/database.js';
import { AuthenticatedRequest } from '../middleware/auth.js';

export const analyticsRouter = Router();

// GET /api/analytics
analyticsRouter.get('/', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';

  const leads = db.prepare('SELECT * FROM leads WHERE user_id = ?').all(userId) as any[];
  const outreach = db.prepare('SELECT * FROM outreach WHERE user_id = ?').all(userId) as any[];
  const appointments = db.prepare('SELECT * FROM appointments WHERE user_id = ?').all(userId) as any[];

  const totalOutreachSent = outreach.length;
  const emailsSent = outreach.filter(o => o.channel === 'Email').length;
  const emailsOpened = outreach.filter(o => o.opened === 1).length;
  const totalReplies = outreach.filter(o => o.replied === 1).length;
  const callsBooked = appointments.length;
  const dealsWon = leads.filter(l => l.pipeline_stage === 'Won').length;
  const totalWonRevenue = leads.filter(l => l.pipeline_stage === 'Won').reduce((s, l) => s + (l.deal_value || 0), 0);

  const openRate = emailsSent > 0 ? Math.round((emailsOpened / emailsSent) * 100) : 0;
  const replyRate = totalOutreachSent > 0 ? Math.round((totalReplies / totalOutreachSent) * 100) : 0;
  const bookingRate = totalReplies > 0 ? Math.round((callsBooked / totalReplies) * 100) : 0;
  const closeRate = callsBooked > 0 ? Math.round((dealsWon / callsBooked) * 100) : 0;

  const channelTypes = ['Email', 'Phone', 'WhatsApp', 'SMS', 'LinkedIn'] as const;
  const channelStats = channelTypes.map(ch => {
    const sent = outreach.filter(o => o.channel === ch).length;
    const opened = outreach.filter(o => o.channel === ch && o.opened === 1).length;
    const replied = outreach.filter(o => o.channel === ch && o.replied === 1).length;
    const repRate = sent > 0 ? Math.round((replied / sent) * 100) : 0;
    return { channel: ch, sent, opened, replied, replyRate: repRate };
  });

  res.json({
    totals: {
      totalOutreachSent,
      emailsSent,
      emailsOpened,
      totalReplies,
      callsBooked,
      dealsWon,
      totalWonRevenue,
      replyRate
    },
    rates: {
      openRate,
      replyRate,
      bookingRate,
      closeRate
    },
    channels: channelStats
  });
});

// GET /api/activities
analyticsRouter.get('/activities', (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId || 'usr-demo-001';
  const activities = db.prepare('SELECT * FROM activities WHERE user_id = ? ORDER BY created_at DESC LIMIT 50').all(userId);
  res.json(activities);
});
