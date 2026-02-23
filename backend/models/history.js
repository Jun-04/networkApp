import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device",
        required: true
    },
    status:{
        type: String,
        enum: ["UP", "DOWN", "UNKNOWN"],
        required: true
    },
    pingTime: Number,
    checkedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("History", historySchema);