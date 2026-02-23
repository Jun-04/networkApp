import ping from "ping";
import snmp from "net-snmp";
import Device from "../models/device.js";
import { checkPort } from "./portService.js"; 
import History from "../models/history.js";

const getSnmpData = (ip, community) => {
  return new Promise((resolve) =>{
const session = snmp.createSession(ip, community);
const oids = [
  "1.3.6.1.2.1.1.5.0", // Hostname
      "1.3.6.1.2.1.2.1.0"  // Total Ports
];

session.get(oids, (error, varbinds) => {
      if (error) {
        resolve(null);
      } else {
        resolve({
          hostname: varbinds[0].value.toString(),
          totalPorts: varbinds[1].value.toString()
        });
      }
      session.close();
    });
  });
};

export async function runMonitoring(io) {
  try {
    const devices = await Device.find();

    // 全デバイスを並列でチェック
    await Promise.all(devices.map(async (d) => {
      // 1. Pingチェック
      const res = await ping.promise.probe(d.ip);
      console.log(`Device: ${d.ip} | Ping Alive: ${res.alive} | Time: ${res.time}`);

      //SNMP
      let snmpInfo = null;
      if(res.alive) {
        console.log(`Checking SNMP for ${d.ip}...`); // 【デバッグ2】
        snmpInfo = await getSnmpData(d.ip, "public");
      }
      
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

     // ✅ snmpデータの反映（snmpInfoがある時だけ代入する）
      if (snmpInfo) {
        console.log(`✅ SNMP Success for ${d.ip}:`, snmpInfo);
        d.hostname = snmpInfo.hostname;
        d.totalPorts = snmpInfo.totalPorts;
      } else {
        console.log(`❌ SNMP Failed (Timeout or Community mismatch) for ${d.ip}`);
        // 失敗した時に値を空にするか、維持するかはお好みで
      }

      await d.save();
      await History.create({
          deviceId: d._id,
          status: d.status,
          pingTime: d.lastPing,
      });


      // 4. Socket.ioでフロントエンドに通知
      io.emit("deviceStatusUpdate", {
        id: d._id,
        status: d.status,
        lastPing: d.lastPing,
        portStatus: d.portStatus,
        lastChecked: d.lastChecked,
        hostname: d.hostname,
        totalPorts: d.totalPorts
      });
    }));
    
    console.log("All devices checked at:", new Date().toLocaleTimeString());
  } catch (error) {
    console.error("Monitoring logic error:", error);
  }
}