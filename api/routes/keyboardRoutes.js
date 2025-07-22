const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  listKeyboards,
  getKeyboard,
  createKeyboard,
  deleteKeyboard
} = require('../controllers/keyboardController');

/**
 * @openapi
 * /api/keyboards:
 *   get:
 *     tags:
 *       - Keyboards
 *     summary: Lister tous les claviers
 *     responses:
 *       200:
 *         description: Liste des claviers
 *       500:
 *         description: Erreur serveur
 *   post:
 *     tags:
 *       - Keyboards
 *     summary: Créer un nouveau clavier
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - nom
 *               - url
 *             properties:
 *               image: { type: string }
 *               nom:   { type: string }
 *               url:   { type: string }
 *               attribute_Id: { type: integer }
 *               year:         { type: string }
 *               brand:        { type: string }
 *     responses:
 *       201:
 *         description: Clavier créé
 *       400:
 *         description: Paramètres manquants
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */
/**
 * @openapi
 * /api/keyboards/{id}:
 *   get:
 *     tags:
 *       - Keyboards
 *     summary: Récupérer un clavier
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Clavier retourné
 *       404:
 *         description: Clavier non trouvé
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     tags:
 *       - Keyboards
 *     summary: Supprimer un clavier
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Clavier supprimé
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Clavier non trouvé
 *       500:
 *         description: Erreur serveur
 */

router.get('/', listKeyboards);
router.get('/:id', getKeyboard);
router.post('/', authenticateToken, createKeyboard);
router.delete('/:id', authenticateToken, deleteKeyboard);

module.exports = router;