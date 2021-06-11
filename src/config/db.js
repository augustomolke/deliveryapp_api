const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/deliveryapp", {
  useNewUrlParser: true,
});
/* remove alerts from console*/
mongoose.set("useCreateIndex", true);
module.exports = mongoose.connection;
