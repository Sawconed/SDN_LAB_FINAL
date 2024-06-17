const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
});

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
});

const Dish = mongoose.model("Dish", dishSchema);
module.exports = Dish;
