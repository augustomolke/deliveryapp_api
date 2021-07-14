const mailer = require("../Utils/emailSender");
const { config } = require("../config/config");
//const { from } = config.MAIL_FROM;

const sendContactEmail = async function (phone, message, subject, name, email) {
  return mailer.send({
    to: "faleconosco.melon@gmail.com",
    template: "contact/contact",
    subject,
    context: { phone, message, name, email },
  });
};

const sendVendorContactEmail = async function (
  firstName,
  lastName,
  email,
  phone,
  company,
  jobTitle,
  message,
  subject
) {
  return mailer.send({
    to: "email@email.com",
    template: "vendor-contact/vendor-contact",
    subject,
    context: { firstName, lastName, email, phone, company, jobTitle, message },
  });
};

const sendEmail = async function (content, template, subject, email) {
  return await mailer.send({
    to: email,
    from: "Solutions Review <" + from + ">",
    template: template,
    subject: "Solutions Review - " + subject,
    context: content,
  });
};

const sendConfirmationCode = async function (params) {
  const { name, email, code } = params;
  const content = {
    name,
    email,
    code,
  };

  const template = "confirmation_email/confirmation_email";
  const subject = "Confirmation code - " + code;

  return sendEmail(content, template, subject, email);
};

const sendCodeToResetPassword = async function (params) {
  const { name, email, code } = params;
  const content = {
    name,
    email,
    code,
  };

  const template = "forgot_password/forgot_password";
  const subject = "Confirmation code - " + code;

  return sendEmail(content, template, subject, email);
};

const sendWelcomeBuyer = async function (name, email) {
  const template = `welcome/welcome_buyer`;
  const subject = "Welcome to Solutions Review Suggestion Engine!";

  return sendEmail({ name, email }, template, subject, email);
};

const sendWelcomeVendor = async function (name, email) {
  const template = `welcome/welcome_pro`;
  const subject = "Welcome to Solutions Review Suggestion Engine!";

  return sendEmail({ name, email }, template, subject, email);
};

module.exports = {
  sendContactEmail,
  sendEmail,
  sendConfirmationCode,
  sendCodeToResetPassword,
  sendWelcomeBuyer,
  sendWelcomeVendor,
  sendVendorContactEmail,
};
