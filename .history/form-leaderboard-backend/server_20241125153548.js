const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const voteRoutes = require("./routes/voteRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Root route (Fix for "cannot GET /")
app.get("/", (req, res) => {
  res.send("Welcome to the Aether Forms API!");
});

// API routes
app.use("/api/votes", voteRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
