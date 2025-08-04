const WeightSession = require('../model/weightmodel');

// Get all weight training sessions
const getAllWeightSessions = async (req, res) => {
    try {
        const sessions = await WeightSession.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            data: sessions
        });
    } catch (error) {
        console.error("Get weight sessions error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Create a new weight training session
const createWeightSession = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ 
                success: false, 
                message: "Title and description are required" 
            });
        }

        const newSession = await WeightSession.create({
            title,
            description
        });

        res.status(201).json({
            success: true,
            message: "Weight training session created successfully",
            data: newSession
        });
    } catch (error) {
        console.error("Create weight session error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Update a weight training session
const updateWeightSession = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const session = await WeightSession.findByPk(id);
        if (!session) {
            return res.status(404).json({ 
                success: false, 
                message: "Weight training session not found" 
            });
        }

        await session.update({
            title: title || session.title,
            description: description || session.description
        });

        res.status(200).json({
            success: true,
            message: "Weight training session updated successfully",
            data: session
        });
    } catch (error) {
        console.error("Update weight session error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete a weight training session
const deleteWeightSession = async (req, res) => {
    try {
        const { id } = req.params;

        const session = await WeightSession.findByPk(id);
        if (!session) {
            return res.status(404).json({ 
                success: false, 
                message: "Weight training session not found" 
            });
        }

        await session.destroy();

        res.status(200).json({
            success: true,
            message: "Weight training session deleted successfully"
        });
    } catch (error) {
        console.error("Delete weight session error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    getAllWeightSessions,
    createWeightSession,
    updateWeightSession,
    deleteWeightSession
}; 