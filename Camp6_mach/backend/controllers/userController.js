const User = require('../model/User');


// Register a new user
const bcrypt = require('bcryptjs');


// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ username, passwordHash, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);  // Log the error to the console for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Verify the password
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Respond with a simple success message
        res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username, role: user.role } });
    } catch (error) {
        console.error(error);  // Log the error to the console for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-passwordHash'); // Exclude password hash
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
