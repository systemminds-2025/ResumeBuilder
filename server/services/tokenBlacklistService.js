import BlacklistedToken from '../models/BlacklistedToken.js';
import jwt from 'jsonwebtoken';

/**
 * Service for managing blacklisted tokens (logout functionality)
 */
class TokenBlacklistService {
    /**
     * Add a token to the blacklist
     * @param {string} token - JWT token to blacklist
     */
    async blacklistToken(token) {
        try {
            // Decode token to get expiration time (without verification)
            const decoded = jwt.decode(token);

            if (!decoded || !decoded.exp) {
                console.warn('Cannot blacklist token: invalid token format');
                return;
            }

            // Convert exp (seconds since epoch) to Date
            const expiresAt = new Date(decoded.exp * 1000);

            // Only blacklist if token hasn't already expired
            if (expiresAt > new Date()) {
                await BlacklistedToken.create({
                    token,
                    expiresAt
                });
                console.log('Token blacklisted successfully');
            }
        } catch (error) {
            // If token already exists in blacklist, ignore the error
            if (error.code === 11000) {
                console.log('Token already blacklisted');
                return;
            }
            console.error('Error blacklisting token:', error.message);
            throw error;
        }
    }

    /**
     * Check if a token is blacklisted
     * @param {string} token - JWT token to check
     * @returns {Promise<boolean>} - True if blacklisted, false otherwise
     */
    async isTokenBlacklisted(token) {
        try {
            const blacklisted = await BlacklistedToken.findOne({ token });
            return !!blacklisted;
        } catch (error) {
            console.error('Error checking token blacklist:', error.message);
            return false; // Fail open - don't block valid tokens on DB errors
        }
    }

    /**
     * Clean up expired blacklisted tokens (manual cleanup, TTL index handles this automatically)
     */
    async cleanupExpiredTokens() {
        try {
            const result = await BlacklistedToken.deleteMany({
                expiresAt: { $lt: new Date() }
            });
            console.log(`Cleaned up ${result.deletedCount} expired blacklisted tokens`);
        } catch (error) {
            console.error('Error cleaning up expired tokens:', error.message);
        }
    }
}

export default new TokenBlacklistService();
