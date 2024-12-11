const Article = require("../models/Article");
const Feedback = require("../models/Feedback");

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().limit(25); // Limit the response to 25 articles
        res.status(200).json({ success: true, data: articles });
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ success: false, message: "Failed to fetch articles", error: error.message });
    }
};

// Get a single article by ID
const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ success: false, message: "Article not found" });
        }
        res.status(200).json({ success: true, data: article });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch the article", error: error.message });
    }
};

// Add feedback to an article
const addFeedbackToArticle = async (req, res) => {
    const { id } = req.params;
    const { text, user, rating, isPublic } = req.body;

    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ success: false, message: "Article not found" });
        }

        const feedback = new Feedback({ text, user, rating, isPublic });
        await feedback.save();

        // Associate feedback with the article
        article.feedbacks = article.feedbacks || [];
        article.feedbacks.push(feedback._id);
        await article.save();

        res.status(201).json({ success: true, message: "Feedback added successfully", data: feedback });
    } catch (error) {
        console.error("Error adding feedback:", error);
        res.status(500).json({ success: false, message: "Failed to add feedback", error: error.message });
    }
};

// Get all feedback for a specific article
const getFeedbacksForArticle = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the article and populate its feedbacks field
        const article = await Article.findById(id).populate("feedbacks");
        if (!article) {
            return res.status(404).json({ success: false, message: "Article not found" });
        }

        res.status(200).json({ success: true, data: article.feedbacks });
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        res.status(500).json({ success: false, message: "Failed to fetch feedbacks", error: error.message });
    }
};

// Edit feedback
const editFeedback = async (req, res) => {
    const { id } = req.params; // Feedback ID
    const { text, rating, isPublic } = req.body;

    try {
        // Find and update the feedback
        const feedback = await Feedback.findByIdAndUpdate(
            id,
            { text, rating, isPublic },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!feedback) {
            return res.status(404).json({ success: false, message: "Feedback not found" });
        }

        res.status(200).json({ success: true, message: "Feedback updated successfully", data: feedback });
    } catch (error) {
        console.error("Error updating feedback:", error);
        res.status(500).json({ success: false, message: "Failed to update feedback", error: error.message });
    }
};

// Delete feedback
const deleteFeedback = async (req, res) => {
    const { id } = req.params; // Feedback ID

    try {
        // Find and delete the feedback
        const feedback = await Feedback.findByIdAndDelete(id);

        if (!feedback) {
            return res.status(404).json({ success: false, message: "Feedback not found" });
        }

        // Remove feedback reference from the associated article
        await Article.updateMany(
            { feedbacks: id },
            { $pull: { feedbacks: id } }
        );

        res.status(200).json({ success: true, message: "Feedback deleted successfully" });
    } catch (error) {
        console.error("Error deleting feedback:", error);
        res.status(500).json({ success: false, message: "Failed to delete feedback", error: error.message });
    }
};

module.exports = {
    getAllArticles,
    getArticleById,
    addFeedbackToArticle,
    getFeedbacksForArticle,
    editFeedback, // Export edit feedback function
    deleteFeedback // Export delete feedback function
};