import { useEffect, useState } from "react";
import api from "../services/api.js";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Dashboard() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    api.get("/devices").then(res => setDevices(res.data));

    socket.on("deviceStatusUpdate", (update) => {
      setDevices(prev => prev.map(d => d._id === update.id ? { ...d, ...update } : d));
    });

    // クリーンアップ関数を追加
    return () => {
      socket.off("deviceStatusUpdate");
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Network Monitoring Dashboard</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>IP</th>
            <th>Status</th>
            <th>Ping</th>
            <th>Ports</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(d => (
            <tr key={d._id} style={{ color: d.status === "UP" ? "green" : "red" }}>
              <td>{d.name}</td>
              <td>{d.ip}</td>
              <td>{d.status}</td>
              <td>{d.lastPing} ms</td>
              <td>
                {d.portStatus &&
                  Object.entries(d.portStatus).map(([p, ok]) => (
                    <div key={p}>
                      Port {p}: {ok ? "OPEN" : "CLOSED"}
                    </div>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
