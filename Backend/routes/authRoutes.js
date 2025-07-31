import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { getUserProfile, getAllUsers, updateUserProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticateToken, getUserProfile);
router.get('/users', getAllUsers);
router.put('/profile', authenticateToken, updateUserProfile); // Add this line

export default router;
