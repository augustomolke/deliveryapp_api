const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

let receiptSchema = new Schema({
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  productList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  price: String,
  date: String,
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
