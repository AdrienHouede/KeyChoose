const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeAdmin }    = require('../middlewares/roleMiddleware');
const { createKeyboardAdmin, listLogs } = require('../controllers/adminController');

router.post('/keyboards', authenticateToken, authorizeAdmin, createKeyboardAdmin);
router.get('/logs', authenticateToken, authorizeAdmin, listLogs);

module.exports = router;