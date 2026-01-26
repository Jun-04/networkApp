# Network Device Monitoring System

This project was designed to simulate a lightweight infrastructure

monitoring system similar to tools used in real-world operations environments.


A real-time **network monitoring dashboard** built with the **MERN stack**
(MongoDB, Express, React, Node.js) and **Socket.IO**.

This application monitors **device availability using ICMP ping and TCP port checks**  
and updates device statuses **in real time** on the dashboard.



## 🚀 Features

- ⚡ **Real-time Updates**  
  Device status changes are pushed instantly to the UI using WebSockets (Socket.IO).

- 📡 **Network Health Monitoring**  
  - ICMP Ping checks to determine device availability  
  - TCP Port connectivity checks for service-level monitoring

- 🗄 **Device Management**  
  Devices are stored and managed using a structured **Mongoose schema**.

- 🎨 **Visual Health Indicators**  
  Color-coded device status:
  - 🟢 Green: Online
  - 🔴 Red: Offline

- ⏱ **Scheduled Monitoring**  
  Periodic health checks executed via cron jobs on the backend.

---

## 🛠 Tech Stack

### Frontend
- React
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Socket.IO
- node-cron
- ping (ICMP)
- native `net` module (TCP port checks)

### Database
- MongoDB


## 📂 Project Structure

```text
network-app/
├── backend/
│   ├── models/           # Mongoose schemas
│   ├── routes/           # REST API endpoints
│   ├── services/         # Monitoring & Port checking logic
│   └── server.js         # Socket.io & App entry point
└── frontend/
    └── src/
        ├── Dashboard.js  # Main React dashboard
        └── api.js        # Axios configuration