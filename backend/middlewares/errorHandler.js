const { CelebrateError } = require('celebrate');
const errors = require('../errors/errors');

// eslint-disable-next-line no-unused-vars
const errorHandler = ((err, req, res, next) => {
  console.log('Error = ', err);
  if (err instanceof CelebrateError) {
    throw new errors.BadRequest(err.details.get('body'));
  }
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  res.status(500).send({ message: err.message });
  return 0;
});

module.exports = errorHandler;
