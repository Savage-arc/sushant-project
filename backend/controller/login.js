const User = require('../model/createusermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const loginUser = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });  // Sequelize usage

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("test")
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, name: user.name },
            process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.name
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
    loginUser
};


