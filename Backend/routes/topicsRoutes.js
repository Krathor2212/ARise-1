import express from 'express';
import Topic from '../models/Topic.js'; // Correct model

const router = express.Router();

// Route to get all topics
router.get('/', async (req, res) => {
    try {
        const topics = await Topic.find({}, 'title content'); // Fetch title and content
        res.json({ topics });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
