import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { lists } from "./assets/mock-data";
import { Database } from "./data/database";
import { CardHandler, ListHandler } from "./handlers/handlers";
import { ReorderService } from "./services/reorder.service";

const PORT = 3005;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const db = Database.Instance;
const reorderService = new ReorderService();

if (process.env.NODE_ENV !== "production") {
  db.setData(lists);
}

const onConnection = (socket: Socket): void => {
  new ListHandler(io, db, reorderService).handleConnection(socket);
  new CardHandler(io, db, reorderService).handleConnection(socket);
};

io.on("connection", onConnection);

httpServer.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

export { httpServer };
