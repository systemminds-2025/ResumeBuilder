import mysql from 'mysql2/promise';

let pool = null;

/**
 * Get MySQL connection pool
 * @returns {Promise<mysql.Pool>} MySQL connection pool
 */
const getMySQLPool = () => {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.MYSQL_HOST || 'localhost',
            port: process.env.MYSQL_PORT || 3306,
            database: process.env.MYSQL_DATABASE || 'candidates',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || '',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });

        console.log('MySQL connection pool created');
    }
    return pool;
};

/**
 * Test MySQL connection
 */
const testConnection = async () => {
    try {
        const pool = getMySQLPool();
        const connection = await pool.getConnection();
        console.log('MySQL connection successful');
        connection.release();
        return true;
    } catch (error) {
        console.error('MySQL connection failed:', error.message);
        return false;
    }
};

export { getMySQLPool, testConnection };
export default getMySQLPool;
