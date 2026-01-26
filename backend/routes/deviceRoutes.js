import express from "express";
import Device from "../models/device.js";
const router = express.Router();

// デバイス一覧取得
router.get("/", async (req, res) => {
    try {
        console.log("--- API Request Received ---");
        const devices = await Device.find();
        console.log("Devices found in DB:", devices);
        res.json(devices);
    } catch (err) {
        // 重要：エラーの詳細をターミナルに表示させます
        console.error("!!! DB Fetch Error !!!");
        console.error(err); 
        res.status(500).json({ error: err.message });
    }
});

// デバイス追加
router.post("/", async (req, res) => {
    try {
        const newDevice = new Device(req.body);
        await newDevice.save();
        res.json(newDevice);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;