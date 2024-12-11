const Feedback = require("../models/Feedback");
const User = require("../models/User"); // Assuming a User model exists

// Create new feedback
const createFeedback = async (req, res) => {
    try {
        const { text, rating, isPublic } = req.body;

        // Ensure the user exists
        const user = await User.findById(req.user.id); // Assuming req.user.id contains authenticated user ID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create feedback
        const feedback = new Feedback({
            text,
            user: req.user.id,
            rating,
            isPublic,
        });

        await feedback.save();
        res.status(201).json({ message: "Feedback created successfully", feedback });
    } catch (error) {
        console.error("Create Feedback Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all feedbacks
const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate("user", "username email");
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error("Get All Feedbacks Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Get feedback by ID
const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id).populate("user", "username email");
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        res.status(200).json(feedback);
    } catch (error) {
        console.error("Get Feedback By ID Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Update feedback
const updateFeedback = async (req, res) => {
    try {
        const { text, rating, isPublic } = req.body;
        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        // Check if the feedback belongs to the authenticated user
        if (feedback.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only update your own feedback" });
        }

        // Update feedback
        feedback.text = text || feedback.text;
        feedback.rating = rating || feedback.rating;
        feedback.isPublic = isPublic !== undefined ? isPublic : feedback.isPublic;

        await feedback.save();
        res.status(200).json({ message: "Feedback updated successfully", feedback });
    } catch (error) {
        console.error("Update Feedback Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        // Check if the feedback belongs to the authenticated user
        if (feedback.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You can only delete your own feedback" });
        }

        await feedback.deleteOne();
        res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        console.error("Delete Feedback Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
};
