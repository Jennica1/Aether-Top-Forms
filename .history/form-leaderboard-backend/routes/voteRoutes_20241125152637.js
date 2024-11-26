const express = require("express");
const { getLeaderboard, castVote } = require("../controllers/voteController");
const router = express.Router();

// GET /leaderboard - Fetch leaderboard data
router.get("/leaderboard", getLeaderboard);

// POST /vote - Cast a vote
router.post("/vote", castVote);

module.exports = router;
