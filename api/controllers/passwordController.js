const crypto = require('crypto');
const { connection } = require('../config/db');
const bcrypt = require('bcryptjs');

const forgotPassword = (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requis' });

  connection.query(
    'SELECT id FROM UTILISATEUR WHERE email = ?',
    [email],
    (err, users) => {
      if (err) return res.status(500).json({ error: err });
      if (!users.length) return res.status(404).json({ error: 'Utilisateur non trouvé' });

      const userId = users[0].id;
      const token  = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 3600 * 1000);

      connection.query(
        'INSERT INTO RESET_TOKENS (user_id, token, expires) VALUES (?, ?, ?)',
        [userId, token, expires],
        (err2) => {
          if (err2) return res.status(500).json({ error: err2 });
          console.log(`Visiter http://localhost:3000/api/password/reset?token=${token}`);
          res.json({ message: 'Lien de réinitialisation envoyé' });
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
      if (err) return res.status(500).json({ error: err });
      if (!rows.length || new Date(rows[0].expires) < new Date()) {
        return res.status(400).json({ error: 'Token invalide ou expiré' });
      }
      const userId = rows[0].user_id;

      bcrypt.hash(newPassword, 10, (err2, hash) => {
        if (err2) return res.status(500).json({ error: err2 });
        connection.query(
          'UPDATE UTILISATEUR SET password = ? WHERE id = ?',
          [hash, userId],
          (err3) => {
            if (err3) return res.status(500).json({ error: err3 });
            connection.query('DELETE FROM RESET_TOKENS WHERE token = ?', [token]);
            res.json({ message: 'Mot de passe mis à jour' });
          }
        );
      });
    }
  );
};

module.exports = { forgotPassword, resetPassword };