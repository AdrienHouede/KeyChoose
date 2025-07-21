const router = require('express').Router();
const { authenticateToken, authorizeAdmin } = require('../middlewares/authMiddleware');
const {
  createKeyboardAdmin,
  listLogs
} = require('../controllers/adminController');

router.post('/keyboards', authenticateToken, authorizeAdmin, createKeyboardAdmin);
router.get('/logs',       authenticateToken, authorizeAdmin, listLogs);

module.exports = router;
