const { connection } = require('../config/db');

const createUser = (email, hashedPassword, role_Id, callback) => {
    const query = 'INSERT INTO UTILISATEUR (email, password, role_Id) VALUES (?, ?, 2)';
    connection.query(query, [email, hashedPassword, role_Id], callback);
};

const findUserByEmail = (email, callback) => {
    const query = 'SELECT * FROM UTILISATEUR WHERE email = ?';
    connection.query(query, [email], callback);
};

module.exports = { createUser, findUserByEmail };