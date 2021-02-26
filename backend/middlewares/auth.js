const jwt = require('jsonwebtoken');
const errors = require('../errors/errors');
const {JWT_SECRET} = require('../config/index');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new errors.Unauthorized('Отказано в доступе');
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (error) {
    throw new errors.Unauthorized('Нет доступа');
  }
  next();
};

module.exports = auth;
