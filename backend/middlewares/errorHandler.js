const { CelebrateError } = require('celebrate');
const errors = require('../errors/errors');

const errorHandler = (err, req, res, next) => {
  console.log('Error = ', err);
  if (err instanceof CelebrateError) {
    throw new errors.BadRequest(err.details.get('body'));
  }
  if (err.status) {
    return res.status(err.status).send({message: err.message});
  }
  throw new errors.ServerError({ message: err.message });
};

module.exports = errorHandler;
