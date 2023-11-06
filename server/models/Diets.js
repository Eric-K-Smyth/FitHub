const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const DietsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Diets = model('Diets', DietsSchema);

module.exports = Diets;
