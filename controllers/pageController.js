const nodemailer = require("nodemailer");
exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render("index", { page_name: "index" });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", { page_name: "about" });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", { page_name: "register" });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", { page_name: "login" });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", { page_name: "contact" });
};

exports.senEmail = async (req, res) => {
  const outputMessage = `
  <h1> Mail Details </h1>
  <ul>
  <li>Name : ${req.body.name} </li>
  <li>E-mail: ${req.body.email}</li>
  </ul>
  <h1>Message</h1>
  <p> ${req.body.message} </p>
  `;

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "luz.wiza59@ethereal.email",
      pass: "MMf1SfhCY2WwXZkSYn",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Smart EDU Contact Form 👻" <luz.wiza59@ethereal.email>', // sender address
      to: "chaz.murazik@ethereal.email", // list of receivers
      subject: "Smart EDU Contact Form New Message ✔", // Subject line
      html: outputMessage, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }
  main().catch("Email hatası",console.error);
  res.status(200).redirect("contact");
};
