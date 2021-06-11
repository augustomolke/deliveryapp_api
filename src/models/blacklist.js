const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let blacklistSchema = new Schema({
  token: String,
});

const BlackList = mongoose.model("BlackList", blacklistSchema);

module.exports = BlackList;
