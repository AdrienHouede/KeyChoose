const { connection } = require('../config/db');
const { logAction } = require('../utils/logger');

const recommendKeyboards = (req, res) => {
  connection.query(
    'SELECT * FROM CLAVIER ORDER BY created DESC LIMIT 5',
    (err, rows) => {
      if (err) {
        return res
          .status(500)
          .json({ error: 'Erreur récupération recommandations', details: err.message });
      }
      if (!rows || rows.length === 0) {
        return res
          .status(404)
          .json({ error: 'Aucune recommandation trouvée' });
      }
      return res.json(rows);
    }
  );
};

module.exports = { recommendKeyboards };