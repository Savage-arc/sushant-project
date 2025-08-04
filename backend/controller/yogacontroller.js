const Yoga = require('../model/yogamodel');

// Get all yoga sessions
const getAllYogaSessions = async (req, res) => {
  try {
    const yogaSessions = await Yoga.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: yogaSessions,
      message: 'Yoga sessions retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching yoga sessions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch yoga sessions',
      error: error.message
    });
  }
};

// Create new yoga session (Admin only)
const createYogaSession = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    const yogaSession = await Yoga.create({
      title,
      description
    });

    res.status(201).json({
      success: true,
      data: yogaSession,
      message: 'Yoga session created successfully'
    });
  } catch (error) {
    console.error('Error creating yoga session:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create yoga session',
      error: error.message
    });
  }
};

// Update yoga session (Admin only)
const updateYogaSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    const yogaSession = await Yoga.findByPk(id);
    if (!yogaSession) {
      return res.status(404).json({
        success: false,
        message: 'Yoga session not found'
      });
    }

    await yogaSession.update({ title, description });

    res.json({
      success: true,
      data: yogaSession,
      message: 'Yoga session updated successfully'
    });
  } catch (error) {
    console.error('Error updating yoga session:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update yoga session',
      error: error.message
    });
  }
};

// Delete yoga session (Admin only)
const deleteYogaSession = async (req, res) => {
  try {
    const { id } = req.params;

    const yogaSession = await Yoga.findByPk(id);
    if (!yogaSession) {
      return res.status(404).json({
        success: false,
        message: 'Yoga session not found'
      });
    }

    await yogaSession.destroy();

    res.json({
      success: true,
      message: 'Yoga session deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting yoga session:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete yoga session',
      error: error.message
    });
  }
};

// Get yoga session by ID
const getYogaSessionById = async (req, res) => {
  try {
    const { id } = req.params;

    const yogaSession = await Yoga.findByPk(id);
    if (!yogaSession) {
      return res.status(404).json({
        success: false,
        message: 'Yoga session not found'
      });
    }

    res.json({
      success: true,
      data: yogaSession,
      message: 'Yoga session retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching yoga session:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch yoga session',
      error: error.message
    });
  }
};

module.exports = {
  getAllYogaSessions,
  createYogaSession,
  updateYogaSession,
  deleteYogaSession,
  getYogaSessionById
}; 