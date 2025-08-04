const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-here'; // Ensure this is set in your .env file
const authGuard = (req, res, next) => {
    const authheader = req.headers.authorization;
    if (!authheader || !authheader.startsWith('Bearer')) {
        return res.status(401).json({ sucess: false, message: "Unauthorized access" });
    }
    const token = authheader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        return res.status(401).json({ sucess: false, message: "Invalid or expired token" });
    }
};
module.exports = authGuard;