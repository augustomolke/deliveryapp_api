const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://omolke:12345@cluster-deliveryapp.twnsl.mongodb.net/test",
  {
    useNewUrlParser: true,
  }
);
/* remove alerts from console*/
mongoose.set("useCreateIndex", true);
module.exports = mongoose.connection;
