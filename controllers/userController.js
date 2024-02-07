const { registerSchema, loginSchema, userIdSchema } = require('../validation/userSchema');
const User = require('../models/User');
const Book = require('../models/Book');
const { hashPassword, comparePasswords } = require('../utils/security');
const { generateToken } = require('../utils/authJWT');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        // Validate 
        const { username, email, password } = registerSchema.parse(req.body);
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User added successfully', data: savedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
        // Validate
        const { username, email, password } = loginSchema.parse(req.body);

        // Find the user by username or email
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            throw new Error('User not found');
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await comparePasswords(password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid password');
        }

        // Generate a JWT token for the user
        const token = generateToken({ userId: user._id });
        user.token = token;
        await user.save();

        res.json({ message: 'Login successful', token });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Retrieve books borrowed by a specific user
exports.getBorrowedBooks = async (req, res) => {
    try {
        const { userId } = userIdSchema.parse(req.params);

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find books borrowed by the user
        const borrowedBooks = await Book.find({ borrowedUsers: userId });

        res.json({ message: 'Books borrowed by the user', data: borrowedBooks });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};