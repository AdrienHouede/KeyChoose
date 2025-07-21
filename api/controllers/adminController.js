const { connection } = require("../config/db");

const createKeyboardAdmin = (req, res) => {
  const { image, nom, url, attribute_Id, year, brand } = req.body;
  connection.query(
    "INSERT INTO CLAVIER (image, nom, url, attribute_Id, year, brand, created) VALUES (?, ?, ?, ?, ?, ?, NOW())",
    [image, nom, url, attribute_Id, year, brand],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    }
  );
};

const listLogs = (req, res) => {
  connection.query("SELECT * FROM LOGS ORDER BY created DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

module.exports = { createKeyboardAdmin, listLogs };
