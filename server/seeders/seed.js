const db = require('../config/connection');
const { User, Diets, Routines, Workouts } = require('../models');
const userSeeds = require('./userSeeds.json');
const dietarySeeds = require('./dietarySeeds.json');
const routineSeeds = require('./routineSeeds.json');
const workoutSeeds = require('./workoutSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Diets', 'diets');
    await cleanDB('User', 'users');
    await cleanDB('Routines', 'routines');
    await cleanDB('Workouts', 'workouts');

    await User.create(userSeeds);

    for (let i = 0; i < workoutSeeds.length; i++) {
      const { _id } = await Workouts.create(workoutSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
