const Request = require('../model/requestmodel');
const User = require('../model/createusermodel');

// Create a new request
const createRequest = async (req, res) => {
    try {
        const { subject, message } = req.body;
        const userId = req.user.id;
        console.log('Creating request for user:', userId);
        
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const newRequest = await Request.create({
            userId: userId,
            userName: user.name,
            userEmail: user.email,
            subject,
            message,
            status: 'pending'
        });

        console.log('Request created successfully:', newRequest.id);
        res.status(201).json({
            success: true,
            message: "Request created successfully",
            request: newRequest
        });
    } catch (error) {
        console.error("Create request error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get all requests (for admin)
const getAllRequests = async (req, res) => {
    try {
        console.log('Admin requesting all requests');
        const requests = await Request.findAll({
            order: [['createdAt', 'DESC']]
        });

        console.log('Found requests:', requests.length);
        res.status(200).json({
            success: true,
            requests
        });
    } catch (error) {
        console.error("Get requests error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get user's own requests
const getUserRequests = async (req, res) => {
    try {
        const userId = req.user.id;
        const requests = await Request.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            requests
        });
    } catch (error) {
        console.error("Get user requests error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Admin respond to request
const respondToRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { status, adminResponse } = req.body;
        const adminId = req.user.id;
        const admin = await User.findByPk(adminId);

        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        const request = await Request.findByPk(requestId);
        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        await request.update({
            status,
            adminResponse,
            adminId,
            adminName: admin.name
        });

        res.status(200).json({
            success: true,
            message: "Response sent successfully",
            request
        });
    } catch (error) {
        console.error("Respond to request error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get single request by ID
const getRequestById = async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = await Request.findByPk(requestId);

        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        res.status(200).json({
            success: true,
            request
        });
    } catch (error) {
        console.error("Get request error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    createRequest,
    getAllRequests,
    getUserRequests,
    respondToRequest,
    getRequestById
}; 