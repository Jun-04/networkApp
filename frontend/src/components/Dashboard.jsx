import React, { useEffect, useState } from 'react'; // Reactのインポート修正
import axios from 'axios';
import { io } from 'socket.io-client'; // Socketインスタンス作成用に io を使用

export default function Dashboard() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // 1. APIから初期データを取得
    axios.get('http://localhost:5000/api/devices')
      .then(res => setDevices(res.data))
      .catch(err => console.log(err));

    // 2. Socket.ioの接続を確立
    const socket = io('http://localhost:5000');

    // 3. サーバーからの更新イベントを待機
    socket.on('deviceStatusUpdate', (update) => {
      setDevices((prev) => 
        prev.map((d) => (d._id === update.id ? { ...d, status: update.status } : d))
      );
    });

    // 4. クリーンアップ（コンポーネントが消える時に接続を切る）
    return () => socket.disconnect();
  }, []); // 正しい useEffect の形

  return (
    <div style={{ padding: 30 }}>
      <h1>Network Dashboard</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>IP</th>
            <th>Port</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(d => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td>{d.ip}</td>
              <td>{d.port}</td>
              <td style={{ 
                color: d.status === "online" ? "green" : "red",
                fontWeight: 'bold' 
              }}>
                {d.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}