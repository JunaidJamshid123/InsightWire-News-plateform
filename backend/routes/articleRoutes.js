const express = require("express");
const {
    getAllArticles,
    getArticleById,
    addFeedbackToArticle
} = require("../controllers/articleController");

const router = express.Router();

// Route to get all articles
router.get("/", getAllArticles);

// Route to get a specific article by ID
router.get("/:id", getArticleById);

// Route to add feedback to an article
router.post("/:id/feedback", addFeedbackToArticle);

module.exports = router;
