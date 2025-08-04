const express = require('express');
const router = express.Router();
const { 
    getAllWeightSessions, 
    createWeightSession, 
    updateWeightSession, 
    deleteWeightSession 
} = require('../controller/weightcontroller');
const authGuard = require('../middleware/authguard');
const isAdmin = require('../middleware/isadmin');

// Public route to get all weight sessions (for users)
router.get('/sessions', getAllWeightSessions);

// Admin routes (require authentication and admin role)
router.post('/sessions', authGuard, isAdmin, createWeightSession);
router.put('/sessions/:id', authGuard, isAdmin, updateWeightSession);
router.delete('/sessions/:id', authGuard, isAdmin, deleteWeightSession);

module.exports = router; 