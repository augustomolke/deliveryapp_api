const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

module.exports = mongoose.connection;
