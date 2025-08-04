const express = require('express');
const router = express.Router();
const {
  getAllYogaSessions,
  createYogaSession,
  updateYogaSession,
  deleteYogaSession,
  getYogaSessionById
} = require('../controller/yogacontroller');
const authGuard = require('../middleware/authguard');
const isAdmin = require('../middleware/isadmin');

// Public route - Get all yoga sessions (for users)
router.get('/sessions', getAllYogaSessions);

// Admin routes (require authentication and admin role)
router.post('/sessions', authGuard, isAdmin, createYogaSession);
router.put('/sessions/:id', authGuard, isAdmin, updateYogaSession);
router.delete('/sessions/:id', authGuard, isAdmin, deleteYogaSession);
router.get('/sessions/:id', authGuard, getYogaSessionById);

module.exports = router; 