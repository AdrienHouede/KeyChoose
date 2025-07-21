const { connection } = require("../config/db");
const { logAction } = require('../utils/logger');

const createKeyboardAdmin = (req, res) => {
  const { image, nom, url, attribute_Id, year, brand } = req.body;
  if (!image || !nom || !url) {
    return res.status(400).json({
      error: "Champs requis manquants : image, nom et url"
    });
  }

  connection.query(
    "INSERT INTO CLAVIER (image, nom, url, attribute_Id, year, brand, created) VALUES (?, ?, ?, ?, ?, ?, NOW())",
    [image, nom, url, attribute_Id || null, year || null, brand || null],
    (err, result) => {
      if (err) {
        const status = err.code === "ER_DUP_ENTRY" ? 409 : 500;
        return res.status(status).json({
          error: "Échec création clavier",
          details: err.message
        });
      }
      if (result.affectedRows === 0) {
        return res.status(500).json({
          error: "Aucun clavier ajouté"
        });
      }
      logAction(req.user?.id, 'CREATE_KEYBOARD_ADMIN', `id=${result.insertId}`);
      res.status(201).json({
        message: "Clavier créé (admin)",
        id: result.insertId
      });
    }
  );
};

const listLogs = (req, res) => {
  connection.query(
    "SELECT * FROM LOGS ORDER BY created DESC",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: "Échec récupération des logs",
          details: err.message
        });
      }
      if (rows.length === 0) {
        return res.status(404).json({
          error: "Aucun log trouvé"
        });
      }
      res.json(rows);
    }
  );
};

module.exports = { createKeyboardAdmin, listLogs };