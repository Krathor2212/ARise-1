import express from 'express';
import Topic from '../models/Topic.js';

const router = express.Router();

// Route to get subtopics for a given topic
router.get('/:topicTitle', async (req, res) => {
    try {
        const { topicTitle } = req.params;

        // Decode URL encoding (e.g., "1.3%20Stacks" -> "1.3 Stacks")
        const decodedTitle = decodeURIComponent(topicTitle);

        // Find the topic
        const topic = await Topic.findOne({ title: decodedTitle });

        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        res.json({ subtopics: topic.content || [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
