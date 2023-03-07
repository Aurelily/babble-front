import { io } from "socket.io-client";
const socket = io("http://192.168.1.110:3000");
export default socket;

export function socketConnect() {
  // client-side
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });
}

export function socketDisconnect() {
  // client-side
  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });
}
