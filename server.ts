const express = require("express");
const next = require("next");
const http = require("http");
const socketIO = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const setupSocketIO = (server) => {
  const io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("key", (key: string) => {
      const intervalId = setInterval(() => {
        io.emit("secret_message", key);
      }, 5000);

      socket.on("disconnect", () => {
        clearInterval(intervalId);
        console.log("Client disconnected");
      });
    });
  });
};

const setupExpressAndNext = () => {
  const server = express();
  const httpServer = http.createServer(server);

  server.all("*", (req) => {
    return handler(req, res);
  });

  setupSocketIO(httpServer);

  return httpServer;
};

const startServer = () => {
  const httpServer = setupExpressAndNext();

  httpServer.listen(port, () => {
    console.log(`Server is running on 'http://localhost:${port}'`);
  });
};

app.prepare().then(() => {
  startServer();
});
