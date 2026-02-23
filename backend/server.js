import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import Device from "./models/device.js";
import "dotenv/config";

import deviceRoutes from "./routes/deviceRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

import { runMonitoring } from "./services/monitoringService.js"; 

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/networkDashboard";

app.use(cors());
app.use(express.json());
app.use("/api/devices", deviceRoutes);
app.use("/api/history", historyRoutes);

// MongoDB
mongoose.connect(mongoURI ||"mongodb://localhost:27017/networkDashboard")
   .then(async () => { // ここを async にする
        console.log(`MongoDB Connected: ${mongoURI}`);

        // --- 初期化ロジックの定義 ---
        const initDevice = async () => {
            try {
                await Device.deleteMany({});
                await Device.create({
                    name: "Cisco-Switch-SW1",
                    ip: "10.0.0.1",
                    status: "UNKNOWN",
                    ports: [22, 23, 80],
                    hostname: "Fetching...", 
                    totalPorts: "0"
                });
                console.log("✅ 実機(10.0.0.1)をDBに登録しました！");
            } catch (err) {
                console.error("DB初期化エラー:", err);
            }
        };
        
        // await initDevice(); 
    })
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