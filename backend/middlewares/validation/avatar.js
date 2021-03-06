const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.mesage('Неверный URL');
    }),
  }),
});
