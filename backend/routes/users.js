const router = require('express').Router();
const myInfo = require('../controllers/myInfo');
const about = require('../middlewares/validation/about');
const avatar = require('../middlewares/validation/avatar');
const id = require('../middlewares/validation/id');

const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/me', myInfo);
router.get('/', getUsers);
router.get('/:id', id, getUserById);
router.patch('/me', about, updateUserInfo);
router.patch('/me/avatar', avatar, updateUserAvatar);

module.exports = router;
