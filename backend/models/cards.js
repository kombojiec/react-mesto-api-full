const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const cardSchema = new Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    required: true,
    type: String,
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  created: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.path('link').validate((value) => {
  const urlRegex = /(http|https):\/\/(www\.)?(\w+)(\S+)#?/;
  return urlRegex.test(value);
}, 'Invalid URL.');

module.exports = model('card', cardSchema);
