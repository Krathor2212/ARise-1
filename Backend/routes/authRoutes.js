import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { getUserProfile, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile',getUserProfile);
router.get('/users',getAllUsers);

export default router;
