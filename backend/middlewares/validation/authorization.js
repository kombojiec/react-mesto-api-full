const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports = celebrate({
  body: Joi.object().keys({
    password: Joi.string().min(6).required(),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.mesage('Неверный em@il');
    }),
  }),
});
