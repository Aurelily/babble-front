import { io } from "socket.io-client";
import * as Server from "../env";
const socket = io("http://" + Server.SERVER_IP + ":3000/");
export default socket;

export function socketConnect() {
  // client-side
  socket.on("connect", () => {
    console.log(`⚡: ${socket.id} vient de se connecter!`); // x8WIv7-mJelg7on_ALbx
  });
}

export function socketDisconnect() {
  // client-side
  socket.on("disconnect", () => {
    console.log(`🔻: ${socket.id} est déconnecté !`); // undefined
  });
}
