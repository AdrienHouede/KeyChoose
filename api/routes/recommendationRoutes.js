const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { recommendKeyboards } = require('../controllers/recommendationController');

/**
 * @openapi
 * /api/recommendation:
 *   post:
 *     tags:
 *       - Recommendation
 *     summary: Obtenir des recommandations de claviers
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

router.post('/', authenticateToken, recommendKeyboards);

module.exports = router;