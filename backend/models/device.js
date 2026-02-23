import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  name: String,
  host: String, // ユーザーが付けた名前
  ip: { type: String, required: true },
  ports: [Number], 
  status: { 
    type: String,
    enum: ["UP", "DOWN", "UNKNOWN"],
    default: "UNKNOWN" 
  },
  lastPing: Number,
  portStatus: { type: Map, of: String },
  
  // --- SNMP追加フィールド ---
  hostname: String,    // 実機が自分で名乗っている名前 (sysName)
  totalPorts: String,  // 実機が持っているインターフェース数
  // -----------------------

  lastChecked: Date,
});

export default mongoose.model("Device", deviceSchema);