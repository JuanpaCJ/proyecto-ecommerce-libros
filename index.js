require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./src/routes/bookRoutes');
const userRoutes = require('./src/routes/userRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const connectDB = require('./src/utils/db');
const authMiddleware = require('./src/middleware/authMiddleware');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/books', authMiddleware, bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
