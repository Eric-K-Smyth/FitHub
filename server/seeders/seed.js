const db = require("../config/connection");
const { User, Routines, Workouts, Profile } = require("../models");
const userSeeds = require("./userSeeds.json");
const profileSeeds = require("./profileSeeds.json");
const routineSeeds = require("./routineSeeds.json");
const workoutSeeds = require("./workoutSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
    await cleanDB("Profile", "profiles");
    await cleanDB("Routines", "routines");
    await cleanDB("Workouts", "workouts");

    await User.create(userSeeds);
    console.log("------ Users seeded! -------");

    await Profile.create(profileSeeds);
    console.log("------ Profiles seeded! -------");

    // add Routines to Users
    for (let i = 0; i < routineSeeds.length; i++) {
      const { _id: _id_routine } = await Routines.create(routineSeeds[i]);
      await Profile.findOneAndUpdate(
        { username: "Brian" },
        {
          $addToSet: {
            routines: _id_routine,
          },
        }
      );
    }
    console.log("------ Routines saved on Profiles seeded! -------");

    // add the workout to the routines // workoutSeeds.lenght = 3
    for (let j = 0; j < 6; j++) {
      const { _id } = await Workouts.create(workoutSeeds[j]);
      await Routines.findOneAndUpdate(
        { name: "Basic Routine" },
        {
          $push: {
            workouts: _id,
          },
        }
      );
    }

    console.log("------ Workout saved on Routines seeded! -------");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
