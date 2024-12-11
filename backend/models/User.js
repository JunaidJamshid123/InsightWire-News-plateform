const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    birthDate: { type: Date },
    phone: { type: String, required: true },
    country: { type: String },
    profilePicture: {
      type: String,
      default: "https://via.placeholder.com/150", // Default placeholder image
    },
    favoriteArticles: [
      {
        articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article" }, // Assuming you have an Article model
        title: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
