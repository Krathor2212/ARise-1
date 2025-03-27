import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import topicsRoutes from './routes/topicsRoutes.js';
import subtopicsRoutes from './routes/subtopicsRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api/topics', topicsRoutes);
app.use('/api/subtopics', subtopicsRoutes);
app.use('/api/subjects', subjectRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
