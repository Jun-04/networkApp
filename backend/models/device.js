import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  name: String,
  ip: String,
  ports: [Number],
  status: { type: String, default: "UNKNOWN" },
  lastPing: Number,
  portStatus: Object,
  lastChecked: Date,
});

export default mongoose.model("Device", deviceSchema);