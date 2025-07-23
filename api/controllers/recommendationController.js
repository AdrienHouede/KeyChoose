const { connection } = require('../config/db');

const recommendKeyboards = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'ID manquant' });
  }

  connection.query(
    'SELECT * FROM PROFILE P INNER JOIN ATTRIBUTE A ON P.attribute_id = A.id WHERE P.id = ?',
    [id],
    (err, profileRows) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lecture profil', details: err.message });
      }
      if (!profileRows || profileRows.length === 0) {
        return res.status(404).json({ error: 'Profil non trouvé' });
      }
      const profilData = profileRows[0];

      connection.query(
        'SELECT * FROM CLAVIER C INNER JOIN ATTRIBUTE A ON C.attribute_id = A.id',
        (err2, keyboardRows) => {
          if (err2) {
            return res.status(500).json({ error: 'Erreur récupération recommandations', details: err2.message });
          }
          if (!keyboardRows || keyboardRows.length === 0) {
            return res.status(404).json({ error: 'Aucune recommandation trouvée' });
          }

          const scored = keyboardRows.map((clavier) => {
            let score = 0;
            if (String(clavier.type).toLowerCase() === String(profilData.type).toLowerCase()) {
              score += 25;
            }
            if (String(clavier.layout).toLowerCase() === String(profilData.layout).toLowerCase()) {
              score += 25;
            }
            if (Number(clavier.size) === Number(profilData.size)) {
              score += 25;
            }
            if (String(clavier.material).toLowerCase() === String(profilData.material).toLowerCase()) {
              score += 25;
            }
            return { ...clavier, compatibilityScore: score };
          });

          scored.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
          const topRecommendations = scored.slice(0, 5);
          return res.status(200).json(topRecommendations);
        }
      );
    }
  );
};

module.exports = { recommendKeyboards };