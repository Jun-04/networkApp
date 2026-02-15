import mongoose from "mongoose";
import { type } from "os";

const deviceSchema = new mongoose.Schema({
  name: String,
  host: String,
  ip: String,
  ports: [Number], //arry[]
  status: { 
            type: String,
            enum: ["online", "offline", "UNKNOWN"],// select from choices
            default: "UNKNOWN" 
          },
  lastPing: Number,
  portStatus: { type: Map, of: String },
  lastChecked: Date,
});

export default mongoose.model("Device", deviceSchema);