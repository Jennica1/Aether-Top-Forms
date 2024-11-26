const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const voteRoutes = require("./routes/voteRoutes"); // Import your voteRoutes

const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON bodies

// Routes
app.use("/api/votes", voteRoutes); // Use the vote routes for '/api/votes'

// Connect to MongoDB
mongoose
  .connect("your_mongodb_connection_string")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
