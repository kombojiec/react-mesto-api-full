const router = require('express').Router();
const myInfo = require('../controllers/myInfo');

const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/me', myInfo);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
