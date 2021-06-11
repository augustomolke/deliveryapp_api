const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

let driverSchema = new Schema({
  name: String,
  license: String,
  phoneNumber: String,
  products: Array,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    dropDups: true,
  },
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
