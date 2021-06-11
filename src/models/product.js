const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

let prodSchema = new Schema({
  name: String,
  price: {
    type: Number,
    required: true,
  },
  image: String,
  description: String,
  quantity: Number,
  category: String,
});

const Product = mongoose.model("Product", prodSchema);

module.exports = Product;
