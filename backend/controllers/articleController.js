const ScrapedArticle = require("../models/ScrapedArticle");
const CategorizedArticle = require("../models/CategorizedArticle");

// Get all scraped articles with feedback populated
exports.getScrapedArticles = async (req, res) => {
    try {
        const articles = await ScrapedArticle.find().populate("feedback");
        res.json(articles);
    } catch (error) {
        res.status(500).json({ msg: error.message });
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
        res.status(500).json({ msg: error.message });
    }
};

// Get all categorized articles with associated scraped articles
exports.getCategorizedArticles = async (req, res) => {
    try {
        const categorizedArticles = await CategorizedArticle.find()
            .populate("articles")
            .populate("background");
        res.json(categorizedArticles);
    } catch (error) {
        res.status(500).json({ msg: error.message });
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
        res.status(500).json({ msg: error.message });
    }
};

// Get a specific categorized article by ID
exports.getCategorizedArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await CategorizedArticle.findById(id)
            .populate("articles")
            .populate("background");
        
        if (!article) return res.status(404).json({ msg: "Categorized article not found" });

        res.json(article);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
