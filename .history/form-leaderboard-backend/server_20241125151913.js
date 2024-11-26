const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize app and middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = "mongodb+srv://Admin:Aether123$$@cluster0.mongodb.net/aetherFormsDB?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// Define schema and model
const voteSchema = new mongoose.Schema({
  formName: String,
  count: Number,
});

const Vote = mongoose.model("Vote", voteSchema);

// Routes
// Fetch leaderboard
app.get("/leaderboard", async (req, res) => {
  try {
    const votes = await Vote.find();
    res.json(votes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// Update votes
app.post("/vote", async (req, res) => {
  const { formName } = req.body;

  try {
    let vote = await Vote.findOne({ formName });
    if (vote) {
      vote.count += 1;
    } else {
      vote = new Vote({ formName, count: 1 });
    }
    await vote.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update votes" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
