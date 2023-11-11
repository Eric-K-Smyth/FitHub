const { User, Profile, Workouts, Routines} = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    profile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ username: context.user.username })
          .populate({
            path: "routines",
            populate: {
              path: "workouts",
            },
          });
      }
      throw AuthenticationError;
    },
    routines: async (parent, { routineId }) => {
      return Routines.findOne({ _id: routineId }).populate({
        path: "workouts",
      });
    },
    workouts: async () => {
      return Workouts.find();
    },
    workoutsByRoutine: async (_, { routineId }, context) => {
      try {
        const routine = await Routines.findById(routineId).populate("workouts");
        if (!routine) {
          throw new Error("Routine not found");
        }
        return routine.workouts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);

      return { token, user };
    },
    createProfile: async (
      parent,
      {
        id,
        username,
        height,
        payMember,
        bw_start,
        bw_current,
        bw_goal,
        dietary,
        routines,
        calendar,
      }
    ) => {
      const newProfile = await Profile.create({
        id,
        username,
        height,
        payMember,
        bw_start,
        bw_current,
        bw_goal,
        dietary,
        routines,
        calendar,
      });

      return newProfile;
    },

    addDateToCalendar: async (parent, { username, date }) => {
      return Profile.findOneAndUpdate(
        { username: username },
        { $addToSet: { calendar: date } },
        { new: true }
      );
    },

    createRoutine: async (parent, { name, workouts }) => {
      const newRoutine = await Routines.create({
        name,
        workouts,
      });
      return newRoutine;
    },

    addWorkoutToRoutine: async (parent, { routineId, workoutId }) => {
      return Routines.findOneAndUpdate(
        { _id: routineId },
        { $addToSet: { workouts: workoutId } },
        { new: true }
      );
    },

    addRoutineToProfile: async (parent, { username, routineId }) => {
      return Profile.findOneAndUpdate(
        { username: username },
        { $addToSet: { routines: routineId } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
