const Announcement = require('../model/announcementmodel');

// Get all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      order: [['date', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      data: announcements
    });
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch announcements' 
    });
  }
};

// Create new announcement (admin only)
const createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;
    const createdBy = req.user.id; // From auth middleware

    if (!title || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and content are required' 
      });
    }

    const newAnnouncement = await Announcement.create({
      title,
      content,
      date: new Date(),
      createdBy
    });

    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: newAnnouncement
    });
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create announcement' 
    });
  }
};

// Delete announcement (admin only)
const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    
    const announcement = await Announcement.findByPk(id);
    
    if (!announcement) {
      return res.status(404).json({ 
        success: false, 
        message: 'Announcement not found' 
      });
    }

    await announcement.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully'
    });
  } catch (error) {
    console.error('Delete announcement error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete announcement' 
    });
  }
};

module.exports = {
  getAllAnnouncements,
  createAnnouncement,
  deleteAnnouncement
}; 