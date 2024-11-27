const express = require("express");
const Vote = require("../models/Vote");
const router = express.Router();

const formDescriptions = {
  "Disability Form": "A form for requesting accommodations or support for disabilities.",
  "Financial Form": "A form for financial aid or assistance requests.",
  "Death Form": "A form for processing claims related to death benefits.",
};

// Save a user vote
router.post("/", async (req, res) => {
  const { formType } = req.body;

  if (!formType) {
    return res.status(400).json({ message: "Form type is required" });
  }

  try {
    const vote = await Vote.create({ formType });
    res.status(201).json(vote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get leaderboard (count of votes per form type)
router.get("/form-details", (req, res) => {
  res.json(formDescriptions);
});

router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Vote.aggregate([
      { $group: { _id: "$formType", count: { $sum: 1 } } },
      { $sort: { count: -1 } }, // Sort by count descending
    ]);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
