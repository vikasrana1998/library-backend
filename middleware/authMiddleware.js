const { verifyToken } = require('../utils/authJWT');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = verifyToken(token);
        const { userId } = req.params;
        if (userId != decoded.userId) {
            throw new Error('User and token not matched');
        }
        const user = await User.findOne({ _id: decoded.userId, token: token });

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

