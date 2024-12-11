const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 300 },
    url: { type: String, required: true, trim: true },
    content: { type: [String], required: true },
    date: { type: Date, default: null },
    publication: { type: String, required: true, trim: true, maxlength: 100 },
    feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
});

const Article = mongoose.model("Article", articleSchema, "Article"); // Explicitly specify collection name
module.exports = Article;
