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