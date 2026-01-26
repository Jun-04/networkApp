import {ping} from "ping";
import {Device}  from "../models/device.js";
import {checkPort} from "./portService.js";

async function runMonitoring(io) {
  const devices = await device.find();

  for (let d of devices) {
    const res = await ping.promise.probe(d.ip);
    const portResults = {};

    if (d.ports?.length) {
      for (let p of d.ports) {
        portResults[p] = await checkPort(d.ip, p);
      }
    }

    d.status = res.alive ? "UP" : "DOWN";
    d.lastPing = res.time;
    d.portStatus = portResults;
    d.lastChecked = new Date();

    await d.save();

    io.emit("deviceStatusUpdate", {
      id: d._id,
      status: d.status,
      lastPing: d.lastPing,
      portStatus: d.portStatus,
      lastChecked: d.lastChecked,
    });
  }
}

export default runMonitoring;
