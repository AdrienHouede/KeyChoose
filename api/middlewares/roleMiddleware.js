const { connection } = require('../config/db');

const authorizeAdmin = (req, res, next) => {
  const userId = req.user.id;
  connection.query(
    `SELECT r.role
     FROM ROLE r
     JOIN UTILISATEUR u ON u.role_Id = r.id
     WHERE u.id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (!results.length || results[0].role !== 'admin') return res.sendStatus(403);
      next();
    }
  );
};

module.exports = { authorizeAdmin };