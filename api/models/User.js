const { connection } = require('../config/db');
const { sendWelcomeEmail } = require('../utils/mailer');

const createUser = (email, hashedPassword, callback) => {
  const query = 'INSERT INTO UTILISATEUR (email, password, role_Id) VALUES (?, ?, 1)';
  connection.query(query, [email, hashedPassword], (err, result) => {
    if (err) return callback(err);
    sendWelcomeEmail(email);
    callback(null, result);
  });
};

const findUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM UTILISATEUR WHERE email = ?';
    connection.query(query, [email], callback);
};

module.exports = { createUser, findUserByEmail };