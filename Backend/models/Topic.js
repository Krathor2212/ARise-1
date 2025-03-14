import mongoose from 'mongoose';

const subtopicSchema = new mongoose.Schema({
    id: String,
    title: { type: String, required: true },
    subtopics: { type: [this], default: [] } 
});


const topicSchema = new mongoose.Schema({
    unit: Number, // Unit number
    title: { type: String, required: true }, 
    subtopics: { type: [subtopicSchema], default: [] }
});

const Topic = mongoose.model('Topic', topicSchema, 'chapter_demo');

export default Topic;
