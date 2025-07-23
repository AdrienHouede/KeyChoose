const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { recommendKeyboards } = require('../controllers/recommendationController');

/**
 * @openapi
 * /api/recommendation:
 *   post:
 *     tags:
 *       - Recommendation
 *     summary: Obtenir des recommandations de claviers par rapport à un profil
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des claviers recommandés
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */

router.get('/:id', authenticateToken, recommendKeyboards);

module.exports = router;