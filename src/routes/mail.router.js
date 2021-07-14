const express = require("express");
const router = express.Router();

const mailController = require("../controllers/mail.controller");

router.post("/contact", mailController.contact);

module.exports = router;
