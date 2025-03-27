import express from 'express';
import Subject from '../models/Subject.js';
import mongoose from 'mongoose';

const router = express.Router();

const SectionSchema = new mongoose.Schema({
    title: String,
    content: [String] 
});

const ChapterSchema = new mongoose.Schema({
    sections: [SectionSchema] 
});

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

router.get('/:subjectName/:chapter', async (req, res) => {
    try {
        const chapterName = req.params.chapter.trim();

        const ChapterModel =
               mongoose.model(chapterName, ChapterSchema, chapterName);

        const data = await ChapterModel.find(); 

        res.json(data.length ? data : { message: "No data found" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.post('/subtopic-details', async (req, res) => {
    try {
        const { topicName, subsection } = req.body;

        if (!topicName || !subsection) {
            return res.status(400).json({ message: "Missing topicName or subsection" });
        }

        const ChapterModel = mongoose.models[topicName] || 
               mongoose.model(topicName, ChapterSchema, topicName);

        const result = await ChapterModel.findOne({ "sections.title": subsection });

        if (!result) {
            return res.status(404).json({ message: "Subsection not found" });
        }

        res.json(result.sections.find(section => section.title === subsection).content ||
            { message: "Subsection not found" });
        
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export default router;