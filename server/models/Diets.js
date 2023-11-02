const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const DietsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Diets = model('Diets', DietsSchema);

module.exports = Diets;
