const mongoose = require("mongoose");

const voteSchema = mongoose.Schema(
  {
    formType: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Votes", voteSchema);
