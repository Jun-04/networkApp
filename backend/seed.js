import "dotenv/config"; // dotenvをインポートと同時に実行
import mongoose from "mongoose";
import Device from "./models/device.js";

async function seed() {
  try {
    // 1. connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // 2.delete existing data
    await Device.deleteMany();

    //3.seed data
    await Device.insertMany([
      { name: "Google DNS", ip: "8.8.8.8", ports: [53] },
      { name: "Cloudflare", ip: "1.1.1.1", ports: [53, 443] }
    ]);

    console.log("Seed completed");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    //4. important*closing a connection to avoid memory leak*
    await mongoose.connection.close();
    process.exit();
  }
}

seed();