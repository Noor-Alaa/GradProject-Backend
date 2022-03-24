const nodemailer = require("nodemailer");

const sendEmail = async options => {
  //1-create a transporter

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "megahedibrahem1@gmail.com",
      pass: "0123456789ahmed",
    },
  });

  //2-mail options
  const mailOptions = {
    from: "gradProj <megahedibrahem1@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //3-send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
