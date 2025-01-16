// models/ChatRoom.js

const mongoose = require("mongoose");
const chatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, enum: ["active", "closed"], default: "active" },
  roomId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
