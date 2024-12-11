const mongoose = require("mongoose");

// Define the Feedback Schema
const feedbackSchema = new mongoose.Schema(
    {
        text: { type: String, required: true, trim: true, maxlength: 500 },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, default: 0 }, // Add rating field
        isPublic: { type: Boolean, default: true }, // Add isPublic field
    },
    { timestamps: true } // Automatically handle createdAt and updatedAt
);

// Create and export the Feedback model
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
