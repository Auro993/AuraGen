import { Router } from 'express';

const router = Router();

router.get('/sessions', (_req, res) => {
  res.json({ sessions: [] });
});

router.get('/analytics', (_req, res) => {
  res.json({ 
    totalSessions: 1284,
    confusedUsers: 312,
    avgCognitiveLoad: 72,
    adaptations: 842,
    successRate: 93.4
  });
});

export default router;