const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  formName: { type: String, required: true },
  count: { type: Number, default: 0 },
});

module.exports = mongoose.model("Vote", voteSchema);
