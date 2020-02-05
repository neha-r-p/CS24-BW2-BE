const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
//routers
const roomRouter = require('../rooms/roomsRouter')


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.use('/rooms', roomRouter)

module.exports = server;
