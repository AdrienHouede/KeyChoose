const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { recommendKeyboards } = require('../controllers/recommendationController');

router.post('/', authenticateToken, recommendKeyboards);

module.exports = router;