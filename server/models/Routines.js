const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const RoutineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  workouts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Workouts',
    },
  ],
});

const Routines = model('Routines', RoutineSchema);

module.exports = Routines;
