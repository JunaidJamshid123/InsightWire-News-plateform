

const mongoose = require("mongoose");

const ScrapedArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String },
    url: { type: String, required: true, unique: true },
    feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }], // References Feedbacks
    content: { type: String, required: true },
    source: { type: String, required: true },
    date: { type: Date, required: true },
    biasType: { type: String, enum: ["L", "R", "C", "Other"], required: true } // Enum for bias classification
}, { timestamps: true });

module.exports = mongoose.model("ScrapedArticle", ScrapedArticleSchema);


