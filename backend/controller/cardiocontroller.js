const Cardio = require('../model/cardiomodel');

// Get all cardio sessions
const getAllCardioSessions = async (req, res) => {
  try {
    const sessions = await Cardio.findAll({
      order: [['created_at', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      data: sessions
    });
  } catch (error) {
    console.error('Get cardio sessions error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch cardio sessions' 
    });
  }
};

// Create new cardio session (admin only)
const createCardioSession = async (req, res) => {
  try {
    const { title, description } = req.body;
    const createdBy = req.user.id; // From auth middleware

    if (!title || !description) {
      return res.status(400).json({ 
        success: false, 
        message: 'Title and description are required' 
      });
    }

    const newSession = await Cardio.create({
      title,
      description,
      createdBy
    });

    res.status(201).json({
      success: true,
      message: 'Cardio session created successfully',
      data: newSession
    });
  } catch (error) {
    console.error('Create cardio session error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create cardio session' 
    });
  }
};

// Update cardio session (admin only)
const updateCardioSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const session = await Cardio.findByPk(id);
    
    if (!session) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cardio session not found' 
      });
    }

    await session.update({
      title,
      description
    });
    
    res.status(200).json({
      success: true,
      message: 'Cardio session updated successfully',
      data: session
    });
  } catch (error) {
    console.error('Update cardio session error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update cardio session' 
    });
  }
};

// Delete cardio session (admin only)
const deleteCardioSession = async (req, res) => {
  try {
    const { id } = req.params;
    
    const session = await Cardio.findByPk(id);
    
    if (!session) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cardio session not found' 
      });
    }

    await session.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Cardio session deleted successfully'
    });
  } catch (error) {
    console.error('Delete cardio session error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete cardio session' 
    });
  }
};

module.exports = {
  getAllCardioSessions,
  createCardioSession,
  updateCardioSession,
  deleteCardioSession
};
