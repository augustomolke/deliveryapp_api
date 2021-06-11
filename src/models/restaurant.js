const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

let restaurantSchema = new Schema({
  name: String,
  ownerName: String,
  address: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      default: [],
    },
  ],

  email: {
    type: String,
    unique: true,
    dropDups: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    dropDups: true,
  },

  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: [],
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
