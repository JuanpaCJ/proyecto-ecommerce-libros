const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: { id: newUser._id, userName: newUser.userName } });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
};

exports.authenticateUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (user && !user.deletedOn) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                // Generar el token JWT
                const token = jwt.sign(
                    { id: user._id, userName: user.userName },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                res.status(200).json({ message: 'User authenticated successfully', token });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ message: 'User not found or deleted' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error authenticating user', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user && !user.deletedOn) {
            res.status(200).json({ user: { id: user._id, userName: user.userName } });
        } else {
            res.status(404).json({ message: 'User not found or deleted' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error fetching user', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { ...req.body, password: hashedPassword }, { new: true });
        res.status(200).json({ message: 'User updated successfully', user: { id: updatedUser._id, userName: updatedUser.userName } });
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { deletedOn: Date.now() });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error: error.message });
    }
};
