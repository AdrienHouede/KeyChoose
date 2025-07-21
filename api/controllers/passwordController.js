const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { connection } = require('../config/db');
const { logAction } = require('../utils/logger');

const forgotPassword = (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requis' });

  connection.query(
    'SELECT id FROM UTILISATEUR WHERE email = ?',
    [email],
    (err, users) => {
      if (err) return res.status(500).json({ error: 'Erreur requête utilisateur', details: err.message });
      if (users.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });

      const userId = users[0].id;
      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 3600 * 1000);

      connection.query(
        'INSERT INTO RESET_TOKENS (user_id, token, expires) VALUES (?, ?, ?)',
        [userId, token, expires],
        (err2, result) => {
          if (err2) return res.status(500).json({ error: 'Erreur création token', details: err2.message });
          if (result.affectedRows === 0) {
            return res.status(500).json({ error: 'Token non enregistré' });
          }
          logAction(req.user?.id, 'FORGOT_PASSWORD', `userId=${userId}`);
          res.json({ message: 'Lien de réinitialisation créé', resetToken: token, expiresAt: expires });
        }
      );
    }
  );
};

const resetPassword = (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ error: 'Token et nouveau mot de passe requis' });

  connection.query(
    'SELECT user_id, expires FROM RESET_TOKENS WHERE token = ?',
    [token],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Erreur récupération token', details: err.message });
      if (rows.length === 0) return res.status(404).json({ error: 'Token invalide' });
      if (new Date(rows[0].expires) < new Date()) {
        return res.status(400).json({ error: 'Token expiré' });
      }

      const userId = rows[0].user_id;
      bcrypt.hash(newPassword, 10, (err2, hash) => {
        if (err2) return res.status(500).json({ error: 'Erreur hash mot de passe', details: err2.message });

        connection.query(
          'UPDATE UTILISATEUR SET password = ? WHERE id = ?',
          [hash, userId],
          (err3, result) => {
            if (err3) return res.status(500).json({ error: 'Erreur mise à jour mot de passe', details: err3.message });
            if (result.affectedRows === 0) {
              return res.status(404).json({ error: 'Utilisateur non trouvé pour mise à jour' });
            }

            connection.query(
              'DELETE FROM RESET_TOKENS WHERE token = ?',
              [token],
              (err4, delResult) => {
                if (err4) return res.status(500).json({ error: 'Erreur suppression token', details: err4.message });
                if (delResult.affectedRows === 0) {
                  return res.status(500).json({ error: 'Token non supprimé' });
                }
                logAction(req.user?.id, 'RESET_PASSWORD', `userId=${userId}`);
                res.json({ message: 'Mot de passe réinitialisé avec succès' });
              }
            );
          }
        );
      });
    }
  );
};

module.exports = { forgotPassword, resetPassword };