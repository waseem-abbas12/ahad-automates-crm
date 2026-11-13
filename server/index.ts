import express from 'express';
import cors from 'cors';
import { seedDatabase } from './db/seed.js';
import { authRouter } from './routes/authRoutes.js';
import { leadRouter } from './routes/leadRoutes.js';
import { outreachRouter } from './routes/outreachRoutes.js';
import { taskRouter } from './routes/taskRoutes.js';
import { noteRouter } from './routes/noteRoutes.js';
import { appointmentRouter } from './routes/appointmentRoutes.js';
import { settingsRouter } from './routes/settingsRoutes.js';
import { analyticsRouter } from './routes/analyticsRoutes.js';
import { authMiddleware } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Initialize & Seed Database
seedDatabase();

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), database: 'SQLite WAL Connected' });
});

// Public Auth routes
app.use('/api/auth', authRouter);

// Authenticated Business Logic routes
app.use('/api/leads', authMiddleware as any, leadRouter);
app.use('/api/outreach', authMiddleware as any, outreachRouter);
app.use('/api/tasks', authMiddleware as any, taskRouter);
app.use('/api/notes', authMiddleware as any, noteRouter);
app.use('/api/appointments', authMiddleware as any, appointmentRouter);
app.use('/api/settings', authMiddleware as any, settingsRouter);
app.use('/api/analytics', authMiddleware as any, analyticsRouter);

app.listen(PORT, () => {
  console.log(`🚀 Waseem Automation CRM Backend Server listening on http://127.0.0.1:${PORT}`);
});
