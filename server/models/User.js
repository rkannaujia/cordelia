const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  userType: {
    type: String,
    enum: ["customer", "agent"],
    required: true,
  },
  roomIds: {
    type: Array,
    default: [],
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  lastSeen: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
