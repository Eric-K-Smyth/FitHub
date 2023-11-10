const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  height: {
    type: Number,
    required: true,
  },
  payMember: {
    type: Boolean,
    required: true,
  },
  bw_start: {
    type: Number,
    required: true,
  },
  bw_current: {
    type: Number,
    required: true,
  },
  bw_goal: {
    type: Number,
    required: true,
  },
  dietary: [
    {
      type: Schema.Types.ObjectId,
      ref: "Diets",
    },
  ],
  routines: [
    {
      type: Schema.Types.ObjectId,
      ref: "Routines",
    },
  ],
  calendar: [
    {
      type: String,
    },
  ],
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
