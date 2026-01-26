import  net from "net";

export function checkPort(ip, port, timeout = 2000 ) {
    return new Promise(( resolve ) => {
const socket = new net.socket();
socket.setTimeout(timeout);

socket.on("connect", () => {
     socket.destroy();
     resolve(true);
});

   socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });

        socket.on("error", () => resolve(false));

    });
}
