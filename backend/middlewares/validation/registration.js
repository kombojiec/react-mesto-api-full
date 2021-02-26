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
    name: Joi.string().default('Жак-Ив Кусто'),
    about: Joi.string().default('Исследователь'),
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
});
