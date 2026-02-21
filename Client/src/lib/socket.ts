import { io } from "socket.io-client";

const BACKEND_URI = import.meta.env.VITE_SOCKET_BACKEND_URI

export const socket = io(BACKEND_URI, {
  withCredentials: true,
});