const ScrapedArticle = require("../models/ScrapedArticle");
const CategorizedArticle = require("../models/CategorizedArticle");

// Get all scraped articles
exports.getScrapedArticles = async (req, res) => {
    try {
        const articles = await ScrapedArticle.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Get a specific scraped article by ID
exports.getScrapedArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await ScrapedArticle.findById(id);
        if (!article) return res.status(404).json({ msg: "Scraped article not found" });
        res.json(article);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Create a new scraped article
exports.createScrapedArticle = async (req, res) => {
    try {
        const { title, location, url, content, source, date, biasType } = req.body;

        if (!title || !url || !content || !source || !date || !biasType) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        const existingArticle = await ScrapedArticle.findOne({ url });
        if (existingArticle) {
            return res.status(400).json({ msg: "Article with this URL already exists" });
        }

        const newArticle = new ScrapedArticle({ title, location, url, content, source, date, biasType });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Delete a scraped article
exports.deleteScrapedArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedArticle = await ScrapedArticle.findByIdAndDelete(id);
        if (!deletedArticle) return res.status(404).json({ msg: "Scraped article not found" });
        res.json({ msg: "Scraped article deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Get all categorized articles
exports.getCategorizedArticles = async (req, res) => {
    try {
        const categorizedArticles = await CategorizedArticle.find();
        res.json(categorizedArticles);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Get a specific categorized article by ID
exports.getCategorizedArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await CategorizedArticle.findById(id);
        if (!article) return res.status(404).json({ msg: "Categorized article not found" });
        res.json(article);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Create a new categorized article
exports.createCategorizedArticle = async (req, res) => {
    try {
        const { title, summary, articles, background, newsAnalytics } = req.body;

        if (!title || !summary) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        const newCategorizedArticle = new CategorizedArticle({ title, summary, articles, background, newsAnalytics });
        await newCategorizedArticle.save();
        res.status(201).json(newCategorizedArticle);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

// Delete a categorized article
exports.deleteCategorizedArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedArticle = await CategorizedArticle.findByIdAndDelete(id);
        if (!deletedArticle) return res.status(404).json({ msg: "Categorized article not found" });
        res.json({ msg: "Categorized article deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};