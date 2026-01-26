import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import deviceRoutes from "./routes/deviceRoutes.js";
import { runMonitoring } from "./services/monitoringService.js"; // パスは適宜調整してください

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api/devices", deviceRoutes);

// MongoDB
mongoose.connect("mongodb://localhost:27017/networkDashboard")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

// Socket.IO
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
});

// server running
server.listen(5000, async () =>{ console.log("Server running on port 5000")
console.log("Starting initial monitoring...");
  await runMonitoring(io); // 起動時に1回実行

  // checking every min(60000)
  setInterval(async () => {
    console.log("Running periodic monitoring...");
    await runMonitoring(io);
  }, 60000);
});