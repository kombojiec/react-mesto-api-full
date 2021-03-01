const router = require('express').Router();
const card = require('../middlewares/validation/card');
const id = require('../middlewares/validation/id');

const {
  createCard, getCards, removeCard,
  addLike, removeLike,
} = require('../controllers/cards');

router.post('/', card, createCard);
router.get('/', getCards);
router.delete('/:id', id, removeCard);
router.put('/likes/:id', id, addLike);
router.delete('/likes/:id', id, removeLike);

module.exports = router;
