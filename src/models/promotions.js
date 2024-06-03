const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
let Currency = mongoose.Types.Currency;

const promotionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  label: {
    type: String,
    default: "",
  },
  price: {
    type: Currency,
    required: true,
  },
  description: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Promotion = mongoose.model("Promotion", promotionSchema);
module.exports = Promotion;
