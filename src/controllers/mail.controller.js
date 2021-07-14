const mailService = require("../services/mail.service");
const RequestStatus = require("../Utils/statusCode");
// const userService = require('../user/user.service');

exports.contact = async (req, res) => {
  try {
    let { name, email, phone, subject, message } = req.body;
    await mailService.sendContactEmail(phone, message, subject, name, email);
    res.status(RequestStatus.OK).json({ message: "Email successfully sended" });
  } catch (err) {
    return res
      .status(RequestStatus.BAD_REQUEST)
      .json({ message: "Could not contact." });
  }
};
