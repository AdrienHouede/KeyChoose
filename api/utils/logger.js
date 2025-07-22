const { connection } = require('../config/db');

const logAction = (userId, action, details) => {
  connection.query(
    'INSERT INTO LOGS (user_id, action, details, created) VALUES (?, ?, ?, NOW())',
    [userId || null, action, details || null],
    (err) => { if (err) console.error('LOG ERROR', err); }
  );
};

module.exports = { logAction };