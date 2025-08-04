const express = require('express');
const router = express.Router();
const { 
    createRequest, 
    getAllRequests, 
    getUserRequests, 
    respondToRequest, 
    getRequestById 
} = require('../controller/requestcontroller');
const Request = require('../model/requestmodel');
const authGuard = require('../middleware/authguard');
const isAdmin = require('../middleware/isadmin');

// Test route to check if requests table exists
router.get('/test', async (req, res) => {
  try {
    const count = await Request.count();
    res.json({ success: true, count, message: 'Request table exists' });
  } catch (error) {
    console.error('Test route error:', error);
    res.json({ success: false, error: error.message });
  }
});

// Admin routes (require authentication and admin role) - must come before dynamic routes
router.get('/all', authGuard, isAdmin, getAllRequests);
router.put('/:requestId/respond', authGuard, isAdmin, respondToRequest);

// User routes (require authentication)
router.post('/create', authGuard, createRequest);
router.get('/user-requests', authGuard, getUserRequests);
router.get('/:requestId', authGuard, getRequestById);

module.exports = router; 