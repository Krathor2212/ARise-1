import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: [String], required: true } // Array of subtopics
});

// Ensure we're using the right collection name
const Topic = mongoose.model('Topic', topicSchema, 'contentch1'); 

export default Topic;
