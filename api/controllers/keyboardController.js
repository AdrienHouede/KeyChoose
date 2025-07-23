const { connection } = require('../config/db');
const { logAction } = require('../utils/logger');

const listKeyboards = (req, res) => {
  connection.query('SELECT * FROM CLAVIER C INNER JOIN ATTRIBUTE A ON C.attribute_Id = A.id', (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erreur lecture claviers', details: err });
    return res.json(rows);
  });
};

const getKeyboard = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'ID manquant' });

  connection.query('SELECT * FROM CLAVIER C INNER JOIN ATTRIBUTE A ON C.attribute_Id = A.id WHERE C.id = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erreur lecture clavier', details: err });
    if (rows.length === 0) return res.status(404).json({ error: 'Clavier non trouvé' });
    return res.json(rows[0]);
  });
};

const createKeyboard = (req, res) => {
  const { image, nom, url, year, brand, type, layout, size, switchval, connectivity, rgb, material, price } = req.body;
  if (!image || !nom || !url || !type || !layout || !size || !material || !price) {
    return res.status(400).json({ error: 'Champs requis manquants : image, nom, url, type, layout, size, material, price' });
  }

  connection.query(
    'INSERT INTO ATTRIBUTE (type, layout, size, switch, connectivity, rgb, material, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [type, layout, size, switchval, connectivity, rgb, material, price],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur création attributs', details: err.message });
      }
      if (result.affectedRows === 0) {
        return res.status(500).json({ error: 'Aucun attribut créé' });
      }

      const attribute_Id = result.insertId;

      connection.query(
        `INSERT INTO CLAVIER 
          (image, nom, url, attribute_Id, year, brand, created) 
        VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [image, nom, url, attribute_Id, year || null, brand || null],
        (err, result) => {
          if (err) return res.status(500).json({ error: 'Erreur création clavier', details: err });
          if (result.affectedRows === 0) {
            return res.status(500).json({ error: 'Aucun clavier ajouté' });
          }
          logAction(req.user?.id, 'CREATE_KEYBOARD', `id=${result.insertId}`);
          return res.status(201).json({ message: 'Clavier créé', id: result.insertId });
        }
      );
    }
  )
};

const deleteKeyboard = (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: 'ID manquant' });

  connection.query('DELETE FROM CLAVIER WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur suppression clavier', details: err });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Clavier non trouvé ou déjà supprimé' });
    }
    logAction(req.user?.id, 'DELETE_KEYBOARD', `id=${id}`);
    return res.json({ message: 'Clavier supprimé', affectedRows: result.affectedRows });
  });
};

module.exports = {
  listKeyboards,
  getKeyboard,
  createKeyboard,
  deleteKeyboard
};