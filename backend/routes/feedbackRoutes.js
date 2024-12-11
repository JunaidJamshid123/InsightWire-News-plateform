const express = require("express");
const router = express.Router();
const {
    createFeedback,
    getAllFeedbacks,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
} = require("../controllers/feedbackController");


// POST: Create new feedback
router.post("/",createFeedback); // POST route


// GET: Get all feedbacks
router.get("/", getAllFeedbacks);

// GET: Get feedback by ID
router.get("/:id", getFeedbackById);

// PUT: Update feedback by ID
router.put("/:id", updateFeedback);

// DELETE: Delete feedback by ID
router.delete("/:id",deleteFeedback);

module.exports = router;
