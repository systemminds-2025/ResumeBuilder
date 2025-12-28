import jwt from 'jsonwebtoken';
import tokenBlacklistService from '../services/tokenBlacklistService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

const protect = async (req, res, next) => {
    // Extract token from cookie or Authorization header
    let token = req.cookies.accessToken;

    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Also support direct token in header (without Bearer prefix) if sent that way
    if (!token && req.headers.authorization) {
        token = req.headers.authorization;
    }

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        // Check if token is blacklisted
        const isBlacklisted = await tokenBlacklistService.isTokenBlacklisted(token);
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized - Token has been invalidated' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Verify it's an access token
        if (decoded.type !== 'access') {
            return res.status(401).json({ message: 'Unauthorized - Invalid token type' });
        }

        // Attach user info to request
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        req.userSource = decoded.source || 'mongodb';

        next();
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
}

export default protect;
