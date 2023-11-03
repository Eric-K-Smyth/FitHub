const { Schema, model } = require('mongoose');

const WorkoutSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sets: {
    type: NUMBERS,
    required: true,
  },
  reps: {
    type: NUMBERS,
    required: true,
  }
});

const Workouts = model('Workouts', WorkoutSchema);

module.exports = Workouts;
