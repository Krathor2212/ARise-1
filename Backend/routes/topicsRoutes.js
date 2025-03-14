import express from 'express';
import Topic from '../models/Topic.js'; // Import the correct model

const router = express.Router();

// Route to get all topics (only unit titles)
router.get('/', async (req, res) => {
    try {
        const topics = await Topic.find({}, 'title'); // Fetch only topic titles
        res.json({ topics: topics.map(topic => topic.title) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
