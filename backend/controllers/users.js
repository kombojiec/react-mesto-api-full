const bcrypt = require('bcryptjs');
const celebrate = require('celebrate')
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const errors = require('../errors/errors')
const {JWT_SECRET, JWT__TTL} = require('../config/index');

const createUser = (req, res, next) => {
  const {name, email, password, avatar, about } = req.body;

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
      res.send({name, email, _id, avatar, about});
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

const getUsers = (req, res) => {
  User.find()
    .then((content) => res.send(content))
    .catch(() => res.status(404).send({ message: 'Пользователи не найдены' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('No user'))
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.message === 'No user' || error.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(500).send({ message: 'Сервер не отвечает' });
      }
    });
};

const updateUserInfo = (req, res) => {
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
        res.status(400).send({ message: 'Не корректные данные' });
      } else {
        res.status(500).send({ message: 'Что-то пошло не так...' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'validationError') {
        res.status(400).send({ message: 'Не корректные данные' });
      } else {
        res.status(500).send({ message: 'Что-то пошло не так...' });
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
