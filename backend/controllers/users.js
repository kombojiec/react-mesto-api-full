const User = require('../models/users');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err._message === 'user validation failed') {
        res.status(400).send({ message: 'Не корректные данные' });
      } else {
        res.status(500).send({ message: 'Что-то пошло не так...' });
      }
    });
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
};
