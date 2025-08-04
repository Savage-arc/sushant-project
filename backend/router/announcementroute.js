const express = require('express');
const router = express.Router();
const { 
  getAllAnnouncements, 
  createAnnouncement, 
  deleteAnnouncement 
} = require('../controller/announcementcontroller');
const authGuard = require('../middleware/authguard');
const isAdmin = require('../middleware/isadmin');

// Get all announcements (public - no auth required)
router.get('/announcements', getAllAnnouncements);

// Create announcement (admin only)
router.post('/announcements', authGuard, isAdmin, createAnnouncement);

// Delete announcement (admin only)
router.delete('/announcements/:id', authGuard, isAdmin, deleteAnnouncement);

module.exports = router; 