const jwt = require('jsonwebtoken');
const Card = require('../models/cards');
const errors = require('../errors/errors');
const { JWT_SECRET } = require('../config/index');

const createCard = (req, res, next) => {
  const { name, link, owner } = req.body;
  console.log(req.body);
  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'validationError') {
        next(new errors.BadRequest('Не корректные данные'));
      } else {
        next(new errors.ServerError('Что-то пошло не так...'));
      }
    });
};

const getCards = (req, res, next) => {
  Card.find()
    .then((cards) => res.send(cards))
    .catch(() => next(errors.ServerError('Сервер не отвечает.')));
};

const removeCard = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  const { _id } = jwt.verify(token, JWT_SECRET);
  const card = Card.findById(req.params.id, (err, res) => {
    if(err){
      next(new errors.NotFound('Такой карточки нет'))
    }else { return res}
  })
  .then(card => {
    if (card.owner !== _id) {
      throw new errors.Forbidden('Можно удалять только свои фоточки');
    }
})
  Card.findOneAndRemove(req.params.id)
    .orFail(new Error('Not Found'))
    .then((item) => res.send(item))
    .catch((error) => {
      if (error.message === 'Not Found') {
        next(new errors.NotFound('Такой карточки нет.'));
      } else {
        next(new errors.ServerError('Сервер не отвечает.'));
      }
    });
};

const addLike = (req, res, next) => {
  const id = req.params.id;
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  const { _id } = jwt.verify(token, JWT_SECRET);
  const userId = _id;
  Card.findByIdAndUpdate(id,
    { $addToSet: { likes: userId } },
    { new: true })
    .orFail(new Error('Has already'))
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.message === 'Has already') {
        next(new errors.NotFound('Лайк уже поставлен'));
      } else if (error.name === 'CastError') {
        next(new errors.NotFound('Пользователь не найден'));
      } else {
        next(new errors.ServerError('Сервер не отвечает.'));
      }
    });
};

const removeLike = (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  const { _id } = jwt.verify(token, JWT_SECRET);
  const userId = _id;
  Card.findByIdAndUpdate(id,
    { $pull: { likes: userId } },
    { new: true })
    .orFail(new Error('Has already'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.message === 'Has already') {
        next(new errors.NotFound('Лайк уже удалён'));
      } else if (error.name === 'CastError') {
        next(new errors.NotFound('Пользователь не найден'));
      } else {
        next(new errors.ServerError('Сервер не отвечает'));
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
