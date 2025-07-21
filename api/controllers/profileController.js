const { connection } = require('../config/db');
const { logAction } = require('../utils/logger');

const createProfile = (req, res) => {
  const { attribute_Id } = req.body;
  if (!attribute_Id) {
    return res.status(400).json({ error: 'attribute_Id requis' });
  }

  connection.query(
    'INSERT INTO PROFILE (attribute_Id, created) VALUES (?, NOW())',
    [attribute_Id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur création profil', details: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(500).json({ error: 'Aucun profil créé' });
      }
      logAction(req.user?.id, 'CREATE_PROFILE', `id=${result.insertId}`);
      res.status(201).json({ id: result.insertId, attribute_Id });
    }
  );
};

const getProfile = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'ID manquant' });
  }

  connection.query(
    'SELECT * FROM PROFILE WHERE id = ?',
    [id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lecture profil', details: err.message });
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Profil non trouvé' });
      }
      res.json(rows[0]);
    }
  );
};

const updateProfile = (req, res) => {
  const { id } = req.params;
  const { attribute_Id } = req.body;
  if (!id || !attribute_Id) {
    return res.status(400).json({ error: 'ID et attribute_Id requis' });
  }

  connection.query(
    'UPDATE PROFILE SET attribute_Id = ? WHERE id = ?',
    [attribute_Id, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur mise à jour profil', details: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Profil non trouvé ou non modifié' });
      }
      logAction(req.user?.id, 'UPDATE_PROFILE', `id=${id}`);
      res.json({ message: 'Profil mis à jour' });
    }
  );
};

const deleteProfile = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'ID manquant' });
  }

  connection.query(
    'DELETE FROM PROFILE WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur suppression profil', details: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Profil non trouvé ou déjà supprimé' });
      }
      logAction(req.user?.id, 'DELETE_PROFILE', `id=${id}`);
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