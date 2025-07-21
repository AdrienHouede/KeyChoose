const { connection } = require('../config/db');

const recommendKeyboards = (req, res) => {
  connection.query(
    'SELECT * FROM CLAVIER ORDER BY created DESC LIMIT 5',
    (err, rows) => {
      if (err) return res.status(500).json({ error: err });
      res.json(rows);
    }
  );
};

module.exports = { recommendKeyboards };