const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://omolke:Bento16*@cluster-deliveryapp.twnsl.mongodb.net/test",
  {
    useNewUrlParser: true,
  }
);
/* remove alerts from console*/
mongoose.set("useCreateIndex", true);
module.exports = mongoose.connection;
