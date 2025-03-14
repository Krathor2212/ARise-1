import mongoose from 'mongoose';

// Define the schema for subtopics (including nested subtopics)
const subtopicSchema = new mongoose.Schema({
    id: String,
    title: { type: String, required: true },
    subtopics: { type: [this], default: [] } // Recursive structure for nested subtopics
});

// Define the schema for topics
const topicSchema = new mongoose.Schema({
    unit: Number, // Unit number
    title: { type: String, required: true }, // Title of the topic
    subtopics: { type: [subtopicSchema], default: [] } // Array of subtopics
});

// Define the model with the correct collection name "chapter_demo"
const Topic = mongoose.model('Topic', topicSchema, 'chapter_demo');

export default Topic;
