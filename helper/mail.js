const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const nodemailer = require("nodemailer");

const mail = async (options) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: +process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 2) Mailni nastroyka qilish

    const mailOptions = {
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    // 3) Mailni junatish

    await transport.sendMail(mailOptions);
  } catch (e) {
    console.log(e.message);
  }
  // 1) Transporter yaratish
};

module.exports = mail;
