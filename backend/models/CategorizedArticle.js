

const mongoose = require("mongoose");

const CategorizedArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "ScrapedArticle" }], // References Scraped Articles
    background: [{ type: mongoose.Schema.Types.ObjectId, ref: "CategorizedArticle" }], // References other Categorized Articles
    newsAnalytics: { type: String }, // Can be JSON formatted
}, { timestamps: true });

module.exports = mongoose.model("CategorizedArticle", CategorizedArticleSchema);

