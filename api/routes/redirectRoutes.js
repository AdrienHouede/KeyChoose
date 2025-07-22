const router = require('express').Router();
const { redirectToKeyboard } = require('../controllers/redirectController');

/**
 * @openapi
 * /go/{slug}:
 *   get:
 *     tags:
 *       - Redirect
 *     summary: Rediriger vers l’URL d’un clavier
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       302:
 *         description: Redirection vers l’URL
 *       400:
 *         description: Slug manquant
 *       404:
 *         description: Clavier introuvable
 *       500:
 *         description: Erreur serveur
 */

router.get('/:slug', redirectToKeyboard);

module.exports = router;