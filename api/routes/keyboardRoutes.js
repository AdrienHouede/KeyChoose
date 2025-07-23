const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  listKeyboards,
  getKeyboard,
  createKeyboard,
  deleteKeyboard
} = require('../controllers/keyboardController');

router.get('/', listKeyboards);
router.get('/:id', getKeyboard);
router.post('/', authenticateToken, createKeyboard);
router.delete('/:id', authenticateToken, deleteKeyboard);

module.exports = router;