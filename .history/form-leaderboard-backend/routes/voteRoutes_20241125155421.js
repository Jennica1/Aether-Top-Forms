const express = require("express");
const router = express.Router();
const Vote = require("../models/Vote"); // Assuming you have a Vote model

// POST /api/votes - Submit a new vote
router.post("/", async (req, res) => {
  const { formType } = req.body; // Get the form type from the request body

  if (!formType) {
    return res.status(400).json({ message: "Form type is required" }); // Validation
  }

  try {
    // Save the vote in the database
    const vote = await Vote.create({ formType });
    res.status(201).json(vote); // Respond with the created vote
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

// GET /api/votes/leaderboard - Get the leaderboard (votes count)
router.get("/leaderboard", async (req, res) => {
  try {
    // Aggregate vote counts for each formType
    const leaderboard = await Vote.aggregate([
      { $group: { _id: "$formType", count: { $sum: 1 } } },
      { $sort: { count: -1 } }, // Sort by vote count in descending order
    ]);
    res.status(200).json(leaderboard); // Return the leaderboard data
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle errors
  }
});

module.exports = router;
