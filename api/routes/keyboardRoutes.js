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
 *       - Claviers
 *     summary: Récupère la liste de tous les claviers
 *     description: Retourne un tableau de claviers disponibles, avec possibilité de filtres via query params (marque, switch, taille, prix_min, prix_max).
 *     responses:
 *       200:
 *         description: Liste des claviers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Keyboard'
 */
router.get('/', listKeyboards);

/**
 * @openapi
 * /api/keyboards/{id}:
 *   get:
 *     tags:
 *       - Claviers
 *     summary: Récupère un clavier par son ID
 *     description: Retourne les détails d’un clavier spécifique.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identifiant du clavier
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Détails du clavier
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Keyboard'
 *       404:
 *         description: Clavier non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', getKeyboard);

/**
 * @openapi
 * /api/keyboards:
 *   post:
 *     tags:
 *       - Claviers
 *     summary: Crée un nouveau clavier
 *     security:
 *       - bearerAuth: []
 *     description: Ajoute un nouveau clavier au catalogue. Requête réservée aux utilisateurs authentifiés.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/KeyboardCreate'
 *     responses:
 *       201:
 *         description: Clavier créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Keyboard'
 *       400:
 *         description: Données invalides ou incomplètes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authenticateToken, createKeyboard);

/**
 * @openapi
 * /api/keyboards/{id}:
 *   delete:
 *     tags:
 *       - Claviers
 *     summary: Supprime un clavier
 *     security:
 *       - bearerAuth: []
 *     description: Supprime un clavier du catalogue par son ID. Requête réservée aux utilisateurs authentifiés.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identifiant du clavier à supprimer
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       204:
 *         description: Clavier supprimé avec succès (aucun contenu)
 *       401:
 *         description: Non authentifié
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Clavier non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', authenticateToken, deleteKeyboard);

module.exports = router;