const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  getProfilesByUserId,
  listProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/profileController');

/**
 * @openapi
 * /api/profile:
 *   post:
 *     tags:
 *       - Profils
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Données du profil à créer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileCreate'
 *     responses:
 *       201:
 *         description: Profil créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Requête invalide (données manquantes ou incorrectes)
 *       401:
 *         description: Non authentifié
 */
router.post('/', authenticateToken, createProfile);

/**
 * @openapi
 * /api/profile:
 *   get:
 *     tags:
 *       - Profils
 *     security:
 *       - bearerAuth: []
 *     description: Récupère la liste de tous les profils de l’utilisateur connecté
 *     responses:
 *       200:
 *         description: Liste des profils
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Non authentifié
 */
router.get('/', authenticateToken, listProfiles);

/**
 * @openapi
 * /api/profile/{id}:
 *   get:
 *     tags:
 *       - Profils
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identifiant du profil
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails du profil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Profil non trouvé
 */
router.get('/:id', authenticateToken, getProfile);

/**
 * @openapi
 * /api/profile/{id}:
 *   put:
 *     tags:
 *       - Profils
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identifiant du profil à mettre à jour
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Nouvelles données du profil
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileUpdate'
 *     responses:
 *       200:
 *         description: Profil mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Profil non trouvé
 */
router.put('/:id', authenticateToken, updateProfile);

/**
 * @openapi
 * /api/profile/{id}:
 *   delete:
 *     tags:
 *       - Profils
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identifiant du profil à supprimer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Profil supprimé avec succès (aucun contenu)
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Profil non trouvé
 */
router.delete('/:id', authenticateToken, deleteProfile);

module.exports = router;