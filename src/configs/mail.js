const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "af499cafd5a089",
    pass: "a089ee849baf58"
  }
})