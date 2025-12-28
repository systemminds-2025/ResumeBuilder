import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => { console.log("Database connected successfully") })

        let mongodbURI = process.env.MONGODB_URI;
        const projectName = 'resume-builder';

        if (!mongodbURI) {
            throw new Error("MONGODB_URI environment variable not set")
        }

        // Parse the URI to replace the database name properly
        // MongoDB URI format: mongodb+srv://user:pass@host/database?params
        const url = new URL(mongodbURI.replace('mongodb+srv://', 'https://'));
        url.pathname = `/${projectName}`;
        const fixedURI = url.toString().replace('https://', 'mongodb+srv://');

        await mongoose.connect(fixedURI)
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}

export default connectDB;