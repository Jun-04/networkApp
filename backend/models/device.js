import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
  name: String,
  ip: String,
  port: Number,
  status: { type: String, default: 'unknown' },
  lastPing: Date,
});

export default mongoose.model("Device", deviceSchema);