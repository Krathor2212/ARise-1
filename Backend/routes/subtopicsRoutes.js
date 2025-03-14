import express from 'express';
import Topic from '../models/Topic.js';

const router = express.Router();

const extractSubtopics = (subtopics) => {
    let titles = [];
    for (const subtopic of subtopics) {
        titles.push(subtopic.title);
        if (subtopic.subtopics && subtopic.subtopics.length > 0) {
            titles = titles.concat(extractSubtopics(subtopic.subtopics));
        }
    }
    return titles;
};

router.get('/', async (req, res) => {
    try {
        const topics = await Topic.find({});
        const allSubtopics = topics.map(topic => ({
            title: topic.title,
            subtopics: extractSubtopics(topic.subtopics)
        }));

        res.json({ topics: allSubtopics });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:title', async (req, res) => {
    try {
        const { title } = req.params;
        const decodedTitle = decodeURIComponent(title);

        const topic = await Topic.findOne({ title: decodedTitle });

        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }

        const subtopics = extractSubtopics(topic.subtopics);

        res.json({ title: topic.title, subtopics });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
