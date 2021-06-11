const express = require("express");
const db = require("./src/config/db.js");
const app = express();
const bodyParser = require("body-parser");
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

require("./src/config/routes")(app);

app.listen(3000, () => {
  console.log("app running on port 3000");
}); //start no servidor (porta)
