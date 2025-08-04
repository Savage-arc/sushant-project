const express = require('express');
const router = express.Router();
const CompletedSession = require('../model/completedSessionModel');
const { Op } = require('sequelize');

// POST /api/completed - mark session completed
router.post('/', async (req, res) => {
  try {
    const { userId, sessionId } = req.body;
    if (!userId || !sessionId) return res.status(400).json({ success: false, message: "Missing userId or sessionId" });

    // Check if already completed today
    const startOfToday = new Date();
    startOfToday.setHours(0,0,0,0);

    const existing = await CompletedSession.findOne({
      where: {
        userId,
        sessionId,
        completedAt: {
          [Op.gte]: startOfToday
        }
      }
    });

    if (existing) {
      return res.json({ success: true, message: 'Already marked completed today' });
    }

    await CompletedSession.create({ userId, sessionId });
    res.json({ success: true, message: 'Marked as completed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/completed/:userId - get today's completed sessions for user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const startOfToday = new Date();
    startOfToday.setHours(0,0,0,0);

    const completed = await CompletedSession.findAll({
      where: {
        userId,
        completedAt: {
          [Op.gte]: startOfToday
        }
      }
    });

    const sessionIds = completed.map(c => c.sessionId);

    res.json({ success: true, completedSessionIds: sessionIds });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
