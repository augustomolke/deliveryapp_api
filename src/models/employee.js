const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

let employeeSchema = new Schema({
  name: String,
  hours: Number,
  schedule: String,
  jobTitle: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    dropDups: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
