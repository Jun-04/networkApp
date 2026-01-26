import ping from "ping";
import Device from "../models/device.js";
import { checkPort } from "./portService.js"; // ※もし無ければ下にコードを書きます

export async function runMonitoring(io) {
  try {
    const devices = await Device.find();

    // 全デバイスを並列でチェック
    await Promise.all(devices.map(async (d) => {
      // 1. Pingチェック
      const res = await ping.promise.probe(d.ip);
      
      // 2. ポートチェック
      const portResults = {};
      if (d.ports?.length) {
        for (let p of d.ports) {
          portResults[p] = await checkPort(d.ip, p);
        }
      }

      // 3. データベースを更新
      d.status = res.alive ? "UP" : "DOWN";
      d.lastPing = res.alive ? res.time : null;
      d.portStatus = portResults;
      d.lastChecked = new Date();

      await d.save();

      // 4. Socket.ioでフロントエンドに通知
      io.emit("deviceStatusUpdate", {
        id: d._id,
        status: d.status,
        lastPing: d.lastPing,
        portStatus: d.portStatus,
        lastChecked: d.lastChecked,
      });
    }));
    
    console.log("All devices checked at:", new Date().toLocaleTimeString());
  } catch (error) {
    console.error("Monitoring logic error:", error);
  }
}