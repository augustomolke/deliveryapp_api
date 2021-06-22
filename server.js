const express = require("express");
const db = require("./src/config/db.js");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());

db.on("connected", function () {
  console.log("connected!");
});
db.on("disconnected", function () {
  console.log("disconnected!");
});
db.on("error", function (error) {
  console.log("Connection error: " + error);
});
app.use(cors());
app.use(function (req, res, next) {
  var allowedOrigins = [
    "http://127.0.0.1:3000",
    "https://heroku.co",
    "http://189.120.72.71",
    "http://localhost:3000",
  ];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

require("./src/config/routes")(app);

app.listen(process.env.PORT || 5000, () => {
  console.log("app running on port 3000");
}); //start no servidor (porta)
