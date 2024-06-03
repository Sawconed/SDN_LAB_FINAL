const mongoose = require("mongoose");

const leaderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  image: {
    type: String,
  },
  designation: {
    type: String,
    required: [true, "Designation is required"],
  },
  abbr: {
    type: String,
  },
  description: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Leader = mongoose.model("Leader", leaderSchema);
module.exports = Leader;
