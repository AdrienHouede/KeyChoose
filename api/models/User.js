const { connection } = require('../config/db');

const createUser = (email, hashedPassword, callback) => {
    const query = 'INSERT INTO UTILISATEUR (email, password, role_Id) VALUES (?, ?, 1)';
    connection.query(query, [email, hashedPassword], callback);
};

const findUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM UTILISATEUR WHERE email = ?';
    connection.query(query, [email], callback);
};

module.exports = { createUser, findUserByEmail };