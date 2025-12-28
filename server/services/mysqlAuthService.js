import getMySQLPool from '../configs/mysql.js';
import bcrypt from 'bcrypt';

/**
 * Service for authenticating candidates from MySQL database
 */
class MySQLAuthService {
    /**
     * Get candidate by email from MySQL
     * @param {string} email - Candidate email
     * @returns {Promise<Object|null>} - Candidate object or null
     */
    async getCandidateByEmail(email) {
        try {
            const pool = getMySQLPool();
            const [rows] = await pool.execute(
                'SELECT * FROM candidates WHERE email = ?',
                [email]
            );

            if (rows.length === 0) {
                return null;
            }

            return rows[0];
        } catch (error) {
            console.error('Error fetching candidate from MySQL:', error.message);
            throw error;
        }
    }

    /**
     * Authenticate candidate with email and password
     * @param {string} email - Candidate email
     * @param {string} password - Plain text password
     * @returns {Promise<Object|null>} - Candidate object if authenticated, null otherwise
     */
    async authenticateCandidate(email, password) {
        try {
            console.log(`[MySQL Auth] Authenticating candidate: ${email}`);
            const candidate = await this.getCandidateByEmail(email);

            if (!candidate) {
                console.log(`[MySQL Auth] Candidate not found: ${email}`);
                return null;
            }

            console.log(`[MySQL Auth] Candidate found: ${email}`);

            // Check if password_hash exists
            if (!candidate.password_hash) {
                console.warn(`[MySQL Auth] Candidate has no password set: ${email}`);
                return null;
            }

            console.log(`[MySQL Auth] Comparing password for: ${email}`);
            // Compare password with hash
            const isPasswordValid = await bcrypt.compare(password, candidate.password_hash);

            if (!isPasswordValid) {
                console.log(`[MySQL Auth] Invalid password for: ${email}`);
                return null;
            }

            console.log(`[MySQL Auth] Authentication successful for: ${email}`);

            // Remove password hash from returned object
            delete candidate.password_hash;

            return candidate;
        } catch (error) {
            console.error(`[MySQL Auth] Error authenticating candidate ${email}:`, error.message);
            console.error('[MySQL Auth] Full error:', error);
            throw error;
        }
    }

    /**
     * Update last login time for candidate
     * @param {string} email - Candidate email
     */
    async updateLastLogin(email) {
        try {
            const pool = getMySQLPool();
            await pool.execute(
                'UPDATE candidates SET last_login = NOW() WHERE email = ?',
                [email]
            );
        } catch (error) {
            console.error('Error updating last login:', error.message);
            // Don't throw - this is not critical
        }
    }

    /**
     * Check if MySQL connection is available
     * @returns {Promise<boolean>}
     */
    async isAvailable() {
        try {
            const pool = getMySQLPool();
            const connection = await pool.getConnection();
            connection.release();
            return true;
        } catch (error) {
            console.error('MySQL not available:', error.message);
            return false;
        }
    }
}

export default new MySQLAuthService();
