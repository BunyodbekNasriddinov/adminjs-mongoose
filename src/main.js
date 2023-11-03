import { createServer } from "http";
import express from "express";
import mongoose from "mongoose";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import config from "./config/config.js";
import { Server } from "socket.io";
import { User } from "./modules/user/user.model.js";
import router from "./modules/index.js";
import socket from "./socket/index.js";
import { Message } from "./modules/message/message.model.js";
import cors from "cors";
import swaggerRouter from "./utils/swagger.js";

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const PORT = config.PORT;

const start = async () => {
  const app = express();
  const httpServer = new createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });
  socket(io);

  const admin = new AdminJS({
    rootPath: "/admin",
    resources: [
      {
        resource: User,
        options: {
          navigation: {
            name: "Users",
            icon: "User",
          },
        },
      },
      {
        resource: Message,
        options: {
          navigation: {
            name: "Messages",
            icon: "Message",
          },
        },
      },
    ],
  });

  app.use(cors());
  app.use(express.json());
  app.use(swaggerRouter);

  const adminRouter = AdminJSExpress.buildRouter(admin);

  try {
    await mongoose.connect(config.DB.connectionString, {
      forceServerObjectId: true,
    });
    console.log("Connection db successfully.");
  } catch (error) {
    console.error("DB error:", error);
  }

  app.use(router);
  app.use(admin.options.rootPath, adminRouter);

  httpServer.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
