const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
     type: String, 
     required: true 
    },
    password: {
      type: String,
      required: true,
      minlength: 8, 
    },
  userType: { 
    type: String,
     enum: ['customer', 'agent'], 
     required: true 
    },
  isOnline: { 
    type: Boolean, 
    default: false 
  },
  lastSeen: { 
    type: Date, 
    default: null 
  },
});

module.exports = mongoose.model("User", userSchema);
