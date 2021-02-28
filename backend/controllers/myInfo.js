const jwt = require('jsonwebtoken');
const errors = require('../errors/errors');
const { JWT_SECRET } = require('../config/index');
const User = require('../models/users');

const myInfo = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new errors.Unauthorized('Отказано в доступе');
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const { _id } = jwt.verify(token, JWT_SECRET);
    User.findById(_id)
      .then((user) => {
        console.log(user);
        res.status(200).send(user);
      });
  } catch (error) {
    throw new errors.Unauthorized('Нет доступа');
  }
};

module.exports = myInfo;
