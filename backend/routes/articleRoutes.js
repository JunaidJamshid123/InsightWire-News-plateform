const express = require("express");
const {
    getAllArticles,
    getArticleById,
    addFeedbackToArticle,
    getFeedbacksForArticle,
    editFeedback,
    deleteFeedback
} = require("../controllers/articleController");

const router = express.Router();

// Route to get all articles
router.get("/", getAllArticles);

// Route to get a specific article by ID
router.get("/:id", getArticleById);

// Route to get all feedbacks for a specific article
router.get("/:id/feedbacks", getFeedbacksForArticle);

// Route to add feedback to an article
router.post("/:id/feedback", addFeedbackToArticle);

// Route to edit a specific feedback by its ID
router.put("/feedback/:feedbackId", editFeedback);

// Route to delete a specific feedback by its ID
router.delete("/feedback/:feedbackId", deleteFeedback);

module.exports = router;