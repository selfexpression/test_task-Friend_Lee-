"use client";

import { useEffect } from "react";
import io from "socket.io-client";

const Home = () => {
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");

      socket.on("secret_message", (data) => {
        console.log("Secret key:", data);
      });
    });

    return () => {
      socket.off("secret_message");
      socket.disconnect();
    };
  }, []);

  return <div>Hello Friends!</div>;
};

export default Home;
