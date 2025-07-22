const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/profileController');

/**
 * @openapi
 * /api/profile:
 *   post:
 *     tags:
 *       - Profile
 *     summary: Créer un nouveau profil
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - attribute_Id
 *             properties:
 *               attribute_Id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Profil créé
 *       400:
 *         description: Paramètres manquants
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */
router.post('/', authenticateToken, createProfile);
/**
 * @openapi
 * /api/profile/{id}:
 * get:
 * tags:
 * - Profile
 * summary: Récupération d'un profil utilisateur
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID du profil à récupérer
 * responses:
 * 200:
 * description: Détails du profil récupérés avec succès
 * 400:
 * description: ID invalide
 * 404:
 * description: Profil non trouvé
 */
/**
 * @openapi
 * /api/profile/{id}:
 *   get:
 *     tags:
 *       - Profile
 *     summary: Récupérer un profil
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profil retourné
 *       400:
 *         description: ID manquant
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Profil non trouvé
 *       500:
 *         description: Erreur serveur
 *   put:
 *     tags:
 *       - Profile
 *     summary: Mettre à jour un profil
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - attribute_Id
 *             properties:
 *               attribute_Id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Profil mis à jour
 *       400:
 *         description: Paramètres manquants
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Profil non trouvé
 *       500:
 *         description: Erreur serveur
 *   delete:
 *     tags:
 *       - Profile
 *     summary: Supprimer un profil
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profil supprimé
 *       400:
 *         description: ID manquant
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Profil non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', authenticateToken, getProfile);
router.put('/:id', authenticateToken, updateProfile);
router.delete('/:id', authenticateToken, deleteProfile);

module.exports = router;