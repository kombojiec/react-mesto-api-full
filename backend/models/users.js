const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
  },
});

userSchema.path('avatar').validate((value) => {
  const urlRegex = /(http|https):\/\/(www\.)?(\w+)(\S+)#?/;
  return urlRegex.test(value);
}, 'Invalid URL.');

module.exports = model('user', userSchema);
