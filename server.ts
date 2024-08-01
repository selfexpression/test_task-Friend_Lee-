import express, { Request, Response } from "express";
import next from "next";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = Number(process.env.PORT) || 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const setupSocketIO = (server: http.Server) => {
  const io = new SocketIOServer(server);

  io.on("connection", (socket: Socket) => {
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

  server.all("*", (req: Request, res: Response) => {
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
