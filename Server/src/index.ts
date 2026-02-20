import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dns from "node:dns";
import http from "http";
import { Server } from "socket.io";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import authRoutes from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import Message from "./models/message.model.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoute);
app.use("/api/message", messageRoute);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // when user logs in
  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.join(userId); // create private room
  });

  // handle sending message
  socket.on("sendMessage", async (data) => {
    const { senderId, receiverId, text, image } = data;

    // 1️⃣ Save to DB
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image,
    });

    const saveMessage = await newMessage.save();

    // 2️⃣ Emit to receiver
    io.to(receiverId).emit("receiveMessage", saveMessage);

    // 3️⃣ Emit back to sender (optional for sync)
    io.to(senderId).emit("receiveMessage", saveMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Listening or Port:${PORT}`);
  connectDB();
});
