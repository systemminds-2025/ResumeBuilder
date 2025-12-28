import mongoose from 'mongoose';

const RefreshTokenSchema = new mongoose.Schema({
    userId: {
        type: String, // String type to support both MongoDB ObjectId strings and MySQL hex strings
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } // TTL index - automatically delete when expiresAt is reached
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster lookups
RefreshTokenSchema.index({ userId: 1 });

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

export default RefreshToken;
