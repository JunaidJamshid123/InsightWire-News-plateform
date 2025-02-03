const express = require("express");
const { 
    getScrapedArticles, 
    createScrapedArticle, 
    getCategorizedArticles, 
    createCategorizedArticle, 
    getCategorizedArticleById 
} = require("../controllers/articleController");

const router = express.Router();

// Get all scraped articles with feedback populated
router.get("/scraped", getScrapedArticles);

// Create a new scraped article
router.post("/scraped", createScrapedArticle);

// Get all categorized articles with associated scraped articles
router.get("/categorized", getCategorizedArticles);

// Create a new categorized article
router.post("/categorized", createCategorizedArticle);

// Get a specific categorized article by ID
router.get("/categorized/:id", getCategorizedArticleById);

module.exports = router;
