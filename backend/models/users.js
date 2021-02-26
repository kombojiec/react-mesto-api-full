const { Schema, model } = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Invalid Em@il'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  name: { type: String, default: 'Жак-Ив Кусто' },
  about: { type: String, default: 'Исследователь' },
  avatar: { type: String, default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png' },
});

module.exports = model('user', userSchema);
