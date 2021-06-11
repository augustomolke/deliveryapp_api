const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
mongoose.set("useFindAndModify", false);
const Schema = mongoose.Schema;
let UserSchema = new Schema({
  name: String,
  email: String,
  permissions: {
    type: String,
    enum: ["ADMIN", "DRIVER", "CLIENT", "RESTAURANT"],
    default: "CLIENT",
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

UserSchema.methods.generatePassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.pre("save", async function () {
  this.password = await this.generatePassword(this.password);
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
