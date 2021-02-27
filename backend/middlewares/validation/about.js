const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).required(),
    about: Joi.string().min(2).required(),
  }),
});
