const { User, Profile, Workouts, Routines, Diets } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },

    profiles: async () => {
      return Profile.find()
        .populate("dietary")
        .populate({
          path: "routines",
          populate: {
            path: "workouts",
          },
        });
    },

    profile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ username: context.user.username })
          .populate("dietary")
          .populate({
            path: "routines",
            populate: {
              path: "workouts",
            },
          });
      }
      throw AuthenticationError("You need to be logged in!");
    },

    dietary: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Diets.find(params).sort({ createdAt: -1 });
    },
    diet: async (parent, { dietId }) => {
      return Diets.findOne({ _id: dietId });
    },

    // User: {
    //   dietary: async (parent) => {
    //     return await Diets.find({ _id: { $in: parent.dietary } });
    //   },
    //   routines: async (parent) => {
    //     return await Routines.find({ _id: { $in: parent.routines } }).populate('workouts');
    //   }
    // },
    // Routines: {
    //   workouts: async (parent) => {
    //     return Workouts.find({ _id: { $in: parent.workouts } });
    //   }
    // }

    //we need typeDef for Calendar
    // we need mutations for profile (add routines to profile)
    // we need mutation for calendar (add date to calender)
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
      });

      await newProfile
        .populate("dietary")
        .populate({
          path: "routines",
          populate: {
            path: "workouts",
          },
        })
        .execPopulate();

      return newProfile;
    },
  },
};

module.exports = resolvers;
