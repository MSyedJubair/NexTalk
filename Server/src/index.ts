import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dns from "node:dns";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import Message from "./models/message.model.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL

app.use(
  cors({
    origin: [CLIENT_URL!],
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
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true, 
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // when user logs in
  socket.on("join", (userId:string) => {
    onlineUsers.set(userId, socket.id);
    socket.join(userId); // create private room

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
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
    onlineUsers.delete(socket.userId);

    // 🔥 Emit updated list
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });
});

server.listen(PORT, () => {
  console.log(`Listening or Port:${PORT}`);
  connectDB();
});
