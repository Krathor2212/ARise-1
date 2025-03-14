import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
    try {
      const { email } = req.query;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.password = undefined;
      res.status(200).json(user);
    } catch (error) {
      console.error('Error retrieving user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error retrieving all users:', error);
      res.status(500).json({ message: 'Server error' });
    }
};

/*
[
    {
        "_id": "67d2e211019b5b57bfae77bb",
        "firstName": "John",
        "lastName": "Doe",
        "username": "johndoe",
        "email": "john@example.com",
        "branch": "CSE",
        "course": "B.Tech",
        "yearOfStudy": 3,
        "__v": 0
        "password": "$2b$10$qpCpNOC1T9xDYK58vO8F0OAFiy3XzxMoZDkcySfT1FvxLCwvHwaWe",
    }
]*/
