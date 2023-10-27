const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
