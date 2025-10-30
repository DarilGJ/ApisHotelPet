const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            message: 'Access token required'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Invalid or expired token'
            });
        }
        req.user = user;
        next();
    });
};

// Middleware to check if user is staff
const requireStaff = (req, res, next) => {
    if (req.user.usertype !== 'staff') {
        return res.status(403).json({
            message: 'Staff access required'
        });
    }
    next();
};

// Middleware to check if user is customer
const requireCustomer = (req, res, next) => {
    if (req.user.usertype !== 'customer') {
        return res.status(403).json({
            message: 'Customer access required'
        });
    }
    next();
};

module.exports = {
    authenticateToken,
    requireStaff,
    requireCustomer
};
