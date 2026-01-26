Network Device Monitoring System

This project was designed to simulate a lightweight infrastructure monitoring system,
similar to tools used in real-world operations and DevOps environments.

It is a real-time network monitoring dashboard built with the MERN stack
(MongoDB, Express, React, Node.js) and Socket.IO.

The application monitors device availability using ICMP ping and TCP port checks,
and updates device statuses in real time on the dashboard.

🚀 Features

⚡ Real-time Updates
Device status changes are pushed instantly to the UI using WebSockets (Socket.IO).

📡 Network Health Monitoring

ICMP Ping checks to determine device availability

TCP Port connectivity checks for service-level monitoring

🗄 Device Management
Devices are stored and managed using a structured Mongoose schema.

🎨 Visual Health Indicators
Color-coded device status:

🟢 Green: Online

🔴 Red: Offline

⏱ Scheduled Monitoring
Periodic health checks executed via cron jobs on the backend.

🐳 Dockerized Development Environment
Frontend, backend, and database are fully containerized using Docker Compose.

 Tech Stack
Frontend:
React
Axios
Socket.IO Client

Backend:
Node.js
Express
MongoDB (Mongoose)
Socket.IO
node-cron
ping (ICMP)
native net module (TCP port checks)

Database:
MongoDB

DevOps / Tooling:
Docker
Docker Compose

📂 Project Structure
network-app/
├── docker-compose.yml
├── backend/
│   ├── models/            # Mongoose schemas
│   ├── routes/            # REST API endpoints
│   ├── services/          # Ping & port monitoring logic
│   ├── server.js          # Express & Socket.IO entry point
│   └── Dockerfile
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Dashboard.jsx   # Main React dashboard
    │   └── api.js              # Axios configuration
    └── Dockerfile


🐳 Running with Docker
Prerequisites
Docker
Docker Compose

Start the application
docker-compose up --build

This will start the following services:
| Service  | Description            | Port  |
| -------- | ---------------------- | ----- |
| mongodb  | MongoDB database       | 27017 |
| backend  | Node.js / Express API  | 5000  |
| frontend | React dashboard (Vite) | 5173  |


🎯 Project Purpose
This project was built to demonstrate:
Full-stack MERN application development
Real-time communication using WebSockets
Basic network and infrastructure monitoring concepts
Containerized development workflows with Docker

It reflects how simple monitoring systems are structured in production environments.

📜 License
MIT License