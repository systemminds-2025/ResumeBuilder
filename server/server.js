import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./configs/db.js";
import { testConnection } from "./configs/mysql.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Database connections
await connectDB();

// Test MySQL connection (optional - won't fail if MySQL is unavailable)
try {
    const mysqlConnected = await testConnection();
    if (mysqlConnected) {
        console.log('MySQL connection available for candidate authentication');
    } else {
        console.warn('MySQL connection not available - candidate authentication disabled');
    }
} catch (error) {
    console.warn('MySQL connection test failed:', error.message);
}

app.use(express.json());
app.use(cookieParser()); // Add cookie parser middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true // Allow cookies to be sent
}));

app.get('/', (req, res) => res.send("Server is live..."))
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});
