const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

let clientSchema = new Schema({
  name: String,
  orders: Array,
  paymentCard: String,
  cardNumber: Number,
  cardCode: Number,
  cardPlaceHolder: String,
  receipts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Receipt",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    dropDups: true,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
