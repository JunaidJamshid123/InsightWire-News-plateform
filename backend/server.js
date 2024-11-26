const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./configs/db');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors'); // To allow requests from your frontend

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api/auth', authRoutes);

// Connect to DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
