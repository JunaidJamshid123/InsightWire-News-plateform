const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./configs/db");
const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const articleRoutes = require("./routes/articleRoutes");
const userRoutes = require('./routes/userRoutes');  // Import userRoutes

const cors = require("cors");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/articles", articleRoutes);
app.use('/api/user', userRoutes);  // For user-related data, profile, etc.
// Connect to DB
connectDB();





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
