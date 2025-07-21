const { connection } = require('../config/db');
const { logAction } = require('../utils/logger');

const redirectToKeyboard = (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    return res.status(400).json({ error: 'Slug manquant' });
  }

  connection.query(
    'SELECT url FROM CLAVIER WHERE url LIKE ?',
    [`%${slug}%`],
    (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({ error: 'Erreur récupération URL', details: err.message });
      }
      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: 'Clavier introuvable' });
      }
      const url = rows[0].url;
      try {
        return res.redirect(url);
      } catch (redirectErr) {
        return res
          .status(500)
          .json({ error: 'Erreur redirection', details: redirectErr.message });
      }
    }
  );
};

module.exports = { redirectToKeyboard };