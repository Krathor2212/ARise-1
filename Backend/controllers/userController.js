import connectDB from '../config/db.js';

export const getUserProfile = async (req, res) => {
  try {
    const { email } = req.query;
    const client = await connectDB();
    const result = await client.query(
      'SELECT first_name, last_name, username, email, branch, course, year_of_study FROM users WHERE email = $1',
      [email]
    );
    await client.end();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const client = await connectDB();
    const result = await client.query(
      'SELECT first_name, last_name, username, email, branch, course, year_of_study FROM users'
    );
    await client.end();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error retrieving all users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, username, branch, course, yearOfStudy } = req.body;
    const email = req.user.email; // Get email from JWT payload

    const client = await connectDB();
    const result = await client.query(
      `UPDATE users
       SET first_name = $1,
           last_name = $2,
           username = $3,
           branch = $4,
           course = $5,
           year_of_study = $6
       WHERE email = $7
       RETURNING first_name, last_name, username, email, branch, course, year_of_study`,
      [firstName, lastName, username, branch, course, yearOfStudy, email]
    );
    await client.end();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};