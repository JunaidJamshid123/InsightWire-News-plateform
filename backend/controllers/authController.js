const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup
const signup = async (req, res) => {
  console.log("Request Recived");
  try {
    const { firstName, lastName, email, password, birthDate, phone, country } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phone || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      birthDate,
      phone,
      country,
      favoriteArticles: [], // Initialize as an empty array during signup
    });

    // Respond with success message
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Login
/*
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Failed to login", error: error.message });
  }
};
*/


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Add to Favorites
const addFavoriteArticle = async (req, res) => {
  try {
    const { userId } = req.user; // Assume user ID is added to req.user by middleware
    const { articleId, title, url } = req.body;

    if (!articleId || !title || !url) {
      return res.status(400).json({ message: "Article ID, title, and URL are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isArticleAlreadyFavorite = user.favoriteArticles.some(
      (article) => article.articleId.toString() === articleId
    );

    if (isArticleAlreadyFavorite) {
      return res.status(400).json({ message: "Article is already in favorites" });
    }

    user.favoriteArticles.push({ articleId, title, url });
    await user.save();

    res.status(200).json({ message: "Article added to favorites", favoriteArticles: user.favoriteArticles });
  } catch (error) {
    console.error("Add favorite article error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login, addFavoriteArticle };