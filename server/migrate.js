import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Parse the MongoDB URI to use the correct database name
let mongodbURI = process.env.MONGODB_URI;
const projectName = 'resume-builder';

if (!mongodbURI) {
    console.error('MONGODB_URI environment variable not set');
    process.exit(1);
}

// Parse the URI to replace the database name properly
const url = new URL(mongodbURI.replace('mongodb+srv://', 'https://'));
url.pathname = `/${projectName}`;
const fixedURI = url.toString().replace('https://', 'mongodb+srv://');

console.log('Connecting to database:', projectName);

// Connect to MongoDB
mongoose.connect(fixedURI)
    .then(() => console.log('Database connected successfully'))
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

async function migrateResumes() {
    try {
        console.log('\n=== Starting Resume Migration ===\n');

        const db = mongoose.connection.db;
        const resumesCollection = db.collection('resumes');

        // Count total resumes
        const totalCount = await resumesCollection.countDocuments({});
        console.log(`Found ${totalCount} total resumes in database\n`);

        if (totalCount === 0) {
            console.log('No resumes found to migrate.');
            process.exit(0);
        }

        // Find resumes missing any of the new fields
        const resumesMissingFields = await resumesCollection.find({
            $or: [
                { certificates: { $exists: false } },
                { achievements: { $exists: false } },
                { hobbies: { $exists: false } },
                { languages: { $exists: false } }
            ]
        }).toArray();

        console.log(`Found ${resumesMissingFields.length} resumes missing one or more fields\n`);

        if (resumesMissingFields.length === 0) {
            console.log('All resumes already have the required fields!');
            process.exit(0);
        }

        // Show sample of what will be updated
        console.log('Sample resume before migration:');
        const sample = resumesMissingFields[0];
        console.log({
            _id: sample._id,
            title: sample.title,
            certificates: sample.certificates || 'MISSING',
            achievements: sample.achievements || 'MISSING',
            hobbies: sample.hobbies || 'MISSING',
            languages: sample.languages || 'MISSING'
        });
        console.log('\n');

        // Update all resumes to add missing fields
        const result = await resumesCollection.updateMany(
            {
                $or: [
                    { certificates: { $exists: false } },
                    { achievements: { $exists: false } },
                    { hobbies: { $exists: false } },
                    { languages: { $exists: false } }
                ]
            },
            {
                $set: {
                    certificates: [],
                    achievements: [],
                    hobbies: [],
                    languages: []
                }
            }
        );

        console.log('Migration Results:');
        console.log(`- Matched: ${result.matchedCount} resumes`);
        console.log(`- Modified: ${result.modifiedCount} resumes`);

        // Verify the migration
        console.log('\nVerifying migration...');
        const verifyResume = await resumesCollection.findOne({ _id: sample._id });
        console.log('Sample resume after migration:');
        console.log({
            _id: verifyResume._id,
            title: verifyResume.title,
            certificates: verifyResume.certificates,
            achievements: verifyResume.achievements,
            hobbies: verifyResume.hobbies,
            languages: verifyResume.languages
        });

        console.log('\n=== Migration Complete! ===\n');
        process.exit(0);
    } catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
}

// Run migration after connection is established
mongoose.connection.once('open', () => {
    migrateResumes();
});
