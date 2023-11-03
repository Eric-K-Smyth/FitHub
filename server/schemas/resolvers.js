const { User, Workouts, Routines, Diets } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate(['dietary', 'routines']);
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate(['dietary', 'routines']);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate(['dietary', 'routines']);
      }
      throw AuthenticationError("You need to be logged in!");
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
  },

};

module.exports = resolvers;
