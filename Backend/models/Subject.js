import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    name: String
});

const Subject = mongoose.model('Subject', subjectSchema, 'Subjects');

export default Subject;
