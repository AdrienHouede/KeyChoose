const router = require('express').Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/profileController');

router.post('/', authenticateToken, createProfile);
router.get('/:id', authenticateToken, getProfile);
router.put('/:id', authenticateToken, updateProfile);
router.delete('/:id', authenticateToken, deleteProfile);

module.exports = router;