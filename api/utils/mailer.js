const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    logger: true,
    debug: true,
    requireTLS: true,
    tls: {
        rejectUnauthorized: false,
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Erreur de configuration du transporteur SMTP:', error);
    } else {
        console.log('Transporteur SMTP prêt à envoyer des emails');
    }
});

const sendWelcomeEmail = async (toEmail) => {
  const mailOptions = {
    from: `"KeyChoose" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Bienvenue sur KeyChoose !',
    text: `
      Bonjour !

      Merci de vous être inscrit·e sur KeyChoose.
      Nous sommes ravis de vous aider à trouver le clavier parfait.

      🎉 À très vite !

      L’équipe KeyChoose
    `,
    html: `
      <h2>Bienvenue sur KeyChoose !</h2>
      <p>Merci de vous être inscrit·e sur <strong>KeyChoose</strong>.</p>
      <p>Nous sommes ravis de vous aider à trouver le clavier parfait.</p>
      <p>🎉 À très vite !<br/>
      L’équipe KeyChoose</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendWelcomeEmail };