const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
});
/* remove alerts from console*/
mongoose.set("useCreateIndex", true);
module.exports = mongoose.connection;
