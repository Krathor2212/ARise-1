import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';

dotenv.config();

const jwt_secret_code = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      branch,
      course,
      year_of_study,
      password
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await connectDB();
    await client.query(
      `INSERT INTO users (first_name, last_name, username, email, branch, course, year_of_study, password)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [first_name, last_name, username, email, branch, course, year_of_study, hashedPassword]
    );
    await client.end();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await connectDB();
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    await client.end();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, jwt_secret_code, { expiresIn: '1h' });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};