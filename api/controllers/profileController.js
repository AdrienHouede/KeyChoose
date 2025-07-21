const { connection } = require('../config/db');

const createProfile = (req, res) => {
  const { attribute_Id } = req.body;
  connection.query(
    'INSERT INTO PROFILE (attribute_Id, created) VALUES (?, NOW())',
    [attribute_Id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, attribute_Id });
    }
  );
};

const getProfile = (req, res) => {
  const { id } = req.params;
  connection.query(
    'SELECT * FROM PROFILE WHERE id = ?',
    [id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err });
      if (!rows.length) return res.status(404).json({ error: 'Profil non trouvé' });
      res.json(rows[0]);
    }
  );
};

const updateProfile = (req, res) => {
  const { id } = req.params;
  const { attribute_Id } = req.body;
  connection.query(
    'UPDATE PROFILE SET attribute_Id = ? WHERE id = ?',
    [attribute_Id, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Profil mis à jour' });
    }
  );
};

const deleteProfile = (req, res) => {
  const { id } = req.params;
  connection.query(
    'DELETE FROM PROFILE WHERE id = ?',
    [id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Profil supprimé' });
    }
  );
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile
};