# Network Device Monitoring System (Hybrid Infrastructure Edition)

<div align="center">
  <img src="./screenshots/dashboard.jpg" width="45%" />
  <img src="./screenshots/hardware.jpg" width="45%" />
</div>
<div align="center">
  <i>Left: Monitoring Dashboard | Right: Physical Cisco 8000 Setup</i>
</div>
<br>
A lightweight infrastructure monitoring system inspired by real-world operations and DevOps environments.

This project is a **real-time network monitoring dashboard** built with the
**MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO**.

It monitors device availability using **ICMP ping** and **TCP port checks**,
and updates device statuses **in real time** on the dashboard.


---

## 🚀 Features

### 📡 Physical Hardware Integration (New!)

-Real-world Testing: Fully integrated with Cisco 8000 Series devices.
-SNMP Data Retrieval: Automates the extraction of sysName (hostname) and ifNumber (active port count) directly from hardware via SNMP.
-Secure Management: Configured and validated SSH access for secure device administration and troubleshooting.

### ⚡ Real-time Operations

-Instant Status Updates: Device availability and performance metrics are pushed instantly to the UI using Socket.IO.
-Visual Health Indicators: Color-coded status (🟢 UP / 🔴 DOWN) for at-a-glance monitoring.

### 📡 Network Health Monitoring
- ICMP ping checks to determine device availability
- TCP port connectivity checks for service-level monitoring

### ⏱ Scheduled Monitoring
Periodic health checks executed via **cron jobs** on the backend.

### 🐳 Dockerized Development Environment
Modern DevOps Workflow

-Full Containerization: Entire stack (Frontend, Backend, MongoDB) orchestrated via Docker Compose.

-Automated Polling: Scheduled background services to scan network infrastructure every 60 seconds.
---

## 💡 Why I Built This Project

I completed the **ICT60220 – Advanced Diploma of Information Technology
(Network Engineering)** and have been self-studying **full-stack web
development using the MERN stack**.

To bridge my background in **network engineering** with **modern web
development**, I wanted to build a practical application that reflects
real-world infrastructure and operations work.

This project was created to:
- Combine **network-level knowledge** (ICMP ping, TCP port checks) with
  **web application development**
- Practice building a **real-time system** using WebSockets (Socket.IO)
- Simulate how **network and service monitoring tools** work in production
  environments
- Demonstrate my ability to design and implement a **full-stack MERN
  application** from scratch

---

## 🛠 Tech Stack

### Infrastructure & Networking
- Hardware: Cisco 8000 Series
- Protocols: SNMP (via net-snmp), ICMP (Ping), SSH, TCP/IP

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
- Native `net` module (TCP port checks)

### Database
- MongoDB

### DevOps / Tooling
- Docker
- Docker Compose

---

## 📂 Project Structure

```text
network-app/
├── docker-compose.yml
├── backend/
│   ├── models/          # Mongoose schemas
│   ├── services/        # SNMP, Ping & port monitoring logic
│   ├── server.js        # Express & Socket.IO entry point
│   └── Dockerfile
└── frontend/
    ├── src/
    │   └── components/
    │       └── Dashboard.jsx  # Main React dashboard
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