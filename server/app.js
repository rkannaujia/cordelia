// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const ChatRoom = require("./models/ChatRoom");
const Message = require("./models/Message");

const registerController = require("./controllers/register");
const loginController = require("./controllers/login");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/chat-support"
);

// Socket.io connection handling
io.on("connection", (socket) => {
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  socket.on("message", async (message) => {
    try {
      const newMessage = new Message({
        roomId: message.roomId,
        content: message.content,
        sender: message.sender,
        timestamp: new Date(),
      });
      await newMessage.save();

      io.to(roomId).emit("message", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

// API Routes
app.post("/api/chat/start", async (req, res) => {
  try {
    const { name, email, issue } = req.body;
    const chatRoom = new ChatRoom({
      name,
      email,
      issue,
      status: "active",
      roomId: Math.random().toString(36).substring(7),
    });
    await chatRoom.save();
    res.json(chatRoom);
  } catch (error) {
    res.status(500).json({ error: "Error creating chat room" });
  }
});
app.post("/api/chat/end", async (req, res) => {
  try {
    console.log(req.body);
    const filter = req.body;
    const update = { status: "inactive" };
    const doc = await ChatRoom.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error: "Error creating chat room" });
  }
});

app.get("/api/chat/active", async (req, res) => {
  try {
    const activeChats = await ChatRoom.find({ status: "active" }).sort({
      createdAt: -1,
    });
    res.json(activeChats);
  } catch (error) {
    res.status(500).json({ error: "Error fetching active chats" });
  }
});

app.post("/register", (req, res) => {
  registerController.register(req, res);
});

app.post("/login", (req, res) => {
  loginController.login(req, res);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
