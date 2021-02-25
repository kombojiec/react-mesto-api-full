const Card = require('../models/cards');

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'validationError') {
        res.status(400).send({ message: 'Не корректные данные' });
      } else {
        res.status(500).send({ message: 'Что-то пошло не так...' });
      }
    });
};

const getCards = (req, res) => {
  Card.find()
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Сервер не отвечает' }));
};

const removeCard = (req, res) => {
  Card.findOneAndRemove(req.params.id)
    .orFail(new Error('Not Found'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.message === 'Not Found') {
        res.status(404).send({ message: 'Такой карточки нет.' });
      } else {
        res.status(500).send({ message: 'Сервер не отвечает' });
      }
    });
};

const addLike = (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  Card.findByIdAndUpdate(id,
    { $addToSet: { likes: userId } },
    { new: true })
    .orFail(new Error('Has already'))
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.message === 'Has already') {
        res.status(404).send({ message: 'Лайк уже поставлен' });
      } else if (error.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(500).send({ message: 'Сервер не отвечает' });
      }
    });
};

const removeLike = (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  Card.findByIdAndUpdate(id,
    { $pull: { likes: userId } },
    { new: true })
    .orFail(new Error('Has already'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.message === 'Has already') {
        res.status(404).send({ message: 'Лайк уже удалён' });
      } else if (error.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(500).send({ message: 'Сервер не отвечает' });
      }
    });
};

module.exports = {
  createCard,
  getCards,
  removeCard,
  addLike,
  removeLike,
};
