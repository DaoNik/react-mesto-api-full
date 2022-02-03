const { Schema, model, Types } = require('mongoose');
const validator = require('validator');

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isUrl(v),
    },
  },
  owner: {
    type: Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);
