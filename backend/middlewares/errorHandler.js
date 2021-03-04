const { CelebrateError } = require('celebrate');

// eslint-disable-next-line no-unused-vars
const errorHandler = ((err, req, res, next) => {
  //  eslint-disable-next-line
  console.log({ error: err});
  if (err instanceof CelebrateError) {
    return res.status(400).send({ message: err.details.get('body').details[0].message });
  }
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  res.status(500).send({ message: err.message });
  return 0;
});

module.exports = errorHandler;
