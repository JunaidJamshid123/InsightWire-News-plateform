const express = require("express");
const {
    getAllArticles,
    getArticleById,
    addFeedbackToArticle,
    getFeedbacksForArticle
} = require("../controllers/articleController");

const router = express.Router();

// Route to get all articles
router.get("/", getAllArticles);

// Route to get a specific article by ID
router.get("/:id", getArticleById);

// Route to add feedback to an article
// Route to get all feedbacks for a specific article
router.get("/:id/feedbacks", getFeedbacksForArticle);

router.post("/:id/feedback", addFeedbackToArticle);

module.exports = router;
