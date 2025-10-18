import { create } from "zustand";
import { io } from "socket.io-client";
import { toast } from "sonner";
import Markdown from "react-markdown";

interface WebSocketStore {
  isConnecting: boolean;
  isConnected: boolean;
  isAuthenticated: boolean;
  init: () => Promise<(() => void) | undefined>;
}

export const webSocketStore = create<WebSocketStore>((set, get) => ({
  isConnected: false,
  isAuthenticated: false,
  isConnecting: false,
  init: async () => {
    if (get().isConnecting) return;
    set({ isConnecting: true });

    const socket = io(import.meta.env.VITE_WEBSOCKET_URL);

    function onConnect() {
      console.log("Websocket connected, emitting authenticate");

      const accessToken = localStorage.getItem("accessToken");

      socket.emit("authenticate", { accessToken });
    }

    function onAuthenticated(body: { success: boolean; message: string }) {
      console.log("Websocket authenticated successfully", body);
    }

    function onNotificationCreated(body: { title: string; content: string }) {
      console.log("Notification received", body);

      toast.info(body.title, {
        description: <Markdown>{body.content}</Markdown>,
      });
    }

    socket.on("connect", onConnect);
    socket.on("authenticated", onAuthenticated);
    socket.on("notification:created", onNotificationCreated);

    return () => {
      socket.off("connect", onConnect);
      socket.off("authenticated", onAuthenticated);
      socket.off("notification:created", onNotificationCreated);
    };
  },
}));
