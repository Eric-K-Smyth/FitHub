const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  height:{
    type: INT,
    required: true,
  },
  payMember:{
    type: Boolean,
    required: true,
  },
  bw_start:{
    type: INT,
    required: true,
  },
  bw_current:{
    type: INT,
    required: true,
  },
  bw_goal:{
    type: INT,
    required: true,
  },
  dietary: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Diets',
    },
  ],
  routines: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Routines',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
