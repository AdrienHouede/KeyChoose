const { connection } = require('../config/db');

const redirectToKeyboard = (req, res) => {
  const { slug } = req.params;
  connection.query(
    'SELECT url FROM CLAVIER WHERE url LIKE ?',
    [`%${slug}%`],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err });
      if (!rows.length) return res.status(404).json({ error: 'Clavier introuvable' });
      res.redirect(rows[0].url);
    }
  );
};

module.exports = { redirectToKeyboard };