const router = require('express').Router();
const { forgotPassword, resetPassword } = require('../controllers/passwordController');

/**
 * @openapi
 * /api/password/forgot:
 *   post:
 *     tags:
 *       - Password
 *     summary: Demande de réinitialisation de mot de passe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Lien de réinitialisation envoyé
 *       400:
 *         description: Email manquant
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
/**
 * @openapi
 * /api/password/reset:
 *   post:
 *     tags:
 *       - Password
 *     summary: Réinitialisation du mot de passe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mot de passe mis à jour
 *       400:
 *         description: Token invalide ou paramètres manquants
 *       404:
 *         description: Token non trouvé
 *       500:
 *         description: Erreur serveur
 */

router.post('/forgot', forgotPassword);
router.post('/reset',  resetPassword);

module.exports = router;