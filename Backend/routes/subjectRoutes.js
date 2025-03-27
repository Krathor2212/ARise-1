import express from 'express';
import Subject from '../models/Subject.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (req, res) => { 
    try {
        const subjects = await Subject.find();
        if (!subjects.length) {
            return res.status(404).json({ message: "No subjects found" });
        }

        const results = await Promise.all(subjects.map(async (subject) => {
            const collectionName = subject.name; 
            console.log(`Fetching content for collection: ${collectionName}`);

            try {
                const DynamicModel = mongoose.models[collectionName] || 
                    mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }), collectionName);

                const content = await DynamicModel.find();

                return {
                    subjectName: subject.name,
                    content: content.length ? content : "No content available"
                };
            } catch (err) {
                return {
                    subjectName: subject.name,
                    error: err.message,
                    content: "Error retrieving content"
                };
            }
        }));

        res.json(results);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export default router;