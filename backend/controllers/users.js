const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const errors = require('../errors/errors');
const { JWT_SECRET, JWT__TTL } = require('../config/index');

const createUser = (req, res, next) => {
  const {
    name, email, password, avatar, about,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new errors.Conflict('Em@il уже существует');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      about, avatar, name, email, password: hash,
    }))
    .then((user) => {
      const { _id } = user;
      res.send({
        name, email, _id, avatar, about,
      });
    })

    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new errors.Unauthorized('Неправильный логин или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (matched) {
            return user;
          }
          throw new errors.Unauthorized('Неправильный логин или пароль');
        });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: JWT__TTL });
      res.send({ jwt: token });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find()
    .then((content) => res.send(content))
    .catch(() => next(new errors.NotFound('Пользователи не найдены')));
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new Error('No user'))
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.message === 'No user' || error.name === 'CastError') {
        next(new errors.NotFound('Пользователь не найден'));
      } else {
        next(new errors.ServerError('Сервер не отвечает'));
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, {
    name,
    about,
  },
  {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'validationError') {
        next(new errors.NotFound('Не корректные данные'));
      } else {
        next(new errors.ServerError('Что-то пошло не так...'));
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'validationError') {
        next(new errors.BadRequest('Не корректные данные'));
      } else {
        next(new errors.BadRequest('Что-то пошло не так...'));
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  login,
};
