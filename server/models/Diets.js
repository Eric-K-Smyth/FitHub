const { Schema, model } = require('mongoose');

const DietsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Diets = model('Diets', DietsSchema);

module.exports = Diets;
