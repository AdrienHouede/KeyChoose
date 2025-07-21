const { connection } = require('../config/db');

const listKeyboards = (req, res) => {
  connection.query('SELECT * FROM CLAVIER', (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

const getKeyboard = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM CLAVIER WHERE id = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (!rows.length) return res.status(404).json({ error: 'Clavier non trouvé' });
    res.json(rows[0]);
  });
};

const createKeyboard = (req, res) => {
  const { image, nom, url, attribute_Id, year, brand } = req.body;
  connection.query(
    'INSERT INTO CLAVIER (image, nom, url, attribute_Id, year, brand, created) VALUES (?, ?, ?, ?, ?, ?, NOW())',
    [image, nom, url, attribute_Id, year, brand],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    }
  );
};

const deleteKeyboard = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM CLAVIER WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Clavier supprimé' });
  });
};

module.exports = {
  listKeyboards,
  getKeyboard,
  createKeyboard,
  deleteKeyboard
};