import express from "express";
import History from "../models/history.js";

const router = express.Router();

router.get("/:devicedId", async (req, res) => {
    try{
        const history = await History.find({
            deviceID: req.params.deviceId
        })
        .sort({ checkedAt: 1})
        .limit(100);

        res.json(history);
    }
     catch(error){
        res.status(500).json({ error: "Failed to fetch history"});
    }
});

export default router;

//ここからつづき、routerjsを完成させる。
