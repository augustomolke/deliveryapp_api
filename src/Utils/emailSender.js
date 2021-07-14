const path = require("path");
const nodemailer = require("nodemailer");
const { config } = require("../config/config");
const hbs = require("nodemailer-express-handlebars");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".html",
      partialsDir: path.resolve(".src/mail/resources/"),
      layoutsDir: path.resolve(".src/mail/resources/"),
      defaultLayout: "",
    },
    viewPath: path.resolve("./src/mail/resources/"),
    extName: ".html",
  })
);

const send = function (mailOptions) {
  return transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log("Error");
      console.log(err);
    } else {
      console.log("Email sent");
    }
  });
};

module.exports = { send };
