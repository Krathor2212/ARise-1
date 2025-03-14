import express from 'express';
import Topic from '../models/Topic.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const topics = await Topic.find({}, 'title'); 
        res.json({ topics: topics.map(topic => topic.title) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
