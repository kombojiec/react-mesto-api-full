const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).required(),
    link: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.mesage('Неверный адрес картинки');
    }),
  }),
  params: Joi.object().keys({
    owner: Joi.string().length(24).hex().required(),
  }),
});
