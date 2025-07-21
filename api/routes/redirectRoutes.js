const router = require('express').Router();
const { redirectToKeyboard } = require('../controllers/redirectController');

router.get('/:slug', redirectToKeyboard);

module.exports = router;