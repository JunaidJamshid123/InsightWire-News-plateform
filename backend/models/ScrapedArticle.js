const mongoose = require("mongoose");

const ScrapedArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    content: { type: [String], required: true }, // Array of strings
    date: { type: String, required: true }, // Can hold "Loading..."
    publication: { type: String, required: true }, // Matches your structure
  },
  { timestamps: true, collection: "Articles" } // Explicit collection name
);

module.exports = mongoose.model("ScrapedArticle", ScrapedArticleSchema);


//feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }] // References Feedbacks