const { CelebrateError } = require('celebrate');
const errors = require('../errors/errors');

// eslint-disable-next-line no-unused-vars
const errorHandler = ((err, req, res, next) => {
  //  eslint-disable-next-line
  console.log({ error: err});
  if (err instanceof CelebrateError) {
    throw new errors.BadRequest({ message: err.details.get('body') });
  } else if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  res.status(500).send({ message: err.message });
  return 0;
});

module.exports = errorHandler;
