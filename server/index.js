import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import { mongoSaveMessage } from "./services/mongo-save-message.js";
import * as dotenv from "dotenv";
import { mongoGetMessage } from "./services/mongo-save-message.js";
import { leaveRoom } from "./utils/leave-room.js";

const app = express();
const server = http.createServer(app);

dotenv.config();

// mongodb mongoose connectivity
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "chatapp",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

// variables

const CHAT_BOT = "ChatBot";

let chatRoom = "";
let allUsers = [];

app.get("/", (req, res) => {
  res.send("Server Is working");
});

// Using Middle wares

app.use(cors());

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  // We can write our socket event listeners in here...

  socket.on("join_room", (data) => {
    const { username, room } = data;

    socket.join(room);

    let _createdtime_ = Date.now();

    // sending message to all users in the group that new user has joined

    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: ` ${CHAT_BOT}`,
      _createdtime_,
    });
    // Send welcome msg to user that just joined chat only
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      _createdtime_,
    });

    // saving username and room information for us
    chatRoom = room;

    allUsers.push({ id: socket.id, username, room });

    // we are again sending all the list to client frontend so that we can show all list of users in the room

    let chatRoomUsers = allUsers.filter((user) => user.room === room);

    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    // Get last 100 messages sent in the chat room
    let last100Messages = mongoGetMessage(room);

    socket.emit("last_100_messages", last100Messages);
    console.log(last100Messages);
  });

  socket.on("Send_message", (data) => {
    const { message, username, room, _createdtime_ } = data;
    io.in(room).emit("receive_message", data); // Send to all users in room, including sender
    mongoSaveMessage(message, username, room, _createdtime_) // Save message in db
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  });

  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);
    const _createdtime_ = Date.now();
    // Remove user from memory
    allUsers = leaveRoom(socket.id, allUsers);
    socket.to(room).emit("chatroom_users", allUsers);
    socket.to(room).emit("receive_message", {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      _createdtime_,
    });
    console.log(`${username} has left the chat`);
  });

   // Add this
   socket.on('disconnect', () => {
    console.log('User disconnected from the chat');
    const user = allUsers.find((user) => user.id == socket.id);
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(chatRoom).emit('chatroom_users', allUsers);
      socket.to(chatRoom).emit('receive_message', {
        message: `${user.username} has disconnected from the chat.`,
      });
    }
  });
});

server.listen(4000, () => {
  console.log("Server Started");
});
