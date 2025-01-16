import { io } from "socket.io-client";

const socket = io("http://localhost:5173", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

export const connect = () => socket.connect();
export const disconnect = () => socket.disconnect();
export const sendMessage = (message) => socket.emit("send-message", message);
export const onMessageReceive = (callback) =>
  socket.on("receive-message", callback);
export const onUsersUpdate = (callback) => socket.on("users-update", callback);

// export default {
//   connect,
//   disconnect,
//   sendMessage,
//   onMessageReceive,
//   onUsersUpdate,
// };
