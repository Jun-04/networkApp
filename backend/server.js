import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";

import deviceRoutes from "./routes/deviceRoutes.js";
import { runMonitoring } from "./services/monitoringService.js"; 

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/networkDashboard";

app.use(cors());
app.use(express.json());
app.use("/api/devices", deviceRoutes);

// MongoDB
mongoose.connect(mongoURI ||"mongodb://localhost:27017/networkDashboard")
    .then(() => console.log(`MongoDB Connected: ${mongoURI}`))
    .catch(err => console.error(err));

// Socket.IO
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
});

// server running
server.listen(5001, async () =>{ console.log("Server running on port 5001")
console.log("Starting initial monitoring...");
  await runMonitoring(io); // 起動時に1回実行

  // checking every min(60000)
  setInterval(async () => {
    console.log("Running periodic monitoring...");
    await runMonitoring(io);
  }, 60000);
});